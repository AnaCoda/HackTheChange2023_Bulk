from flask import current_app,jsonify,request
from app import create_app,db
from models import ItemForSale, Post, Reservations, User, users_schema,user_schema, itemForSale_schema, itemsForSale_schema, reservation_schema, reservations_schema
from eyewearSimilarity import *
from datetime import datetime
import random
import base64
from constants import mindee_receipt_api_key
from mindee import Client, PredictResponse, product
import difflib

# Create an application instance
app = create_app()

with app.app_context():
	db.create_all()


@app.route("/users", methods=["GET"], strict_slashes=False)
def users():

	users = User.query.all()
	
	results = users_schema.dump(users)

	return jsonify(results)

@app.route('/user/<int:user_id>', methods=['GET'])
def getUserName(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify({'firstName': user.firstName, 'lastName': user.lastName})
    else:
        return jsonify({'error': 'User not found'}), 404

@app.route("/user", methods=["GET"], strict_slashes=False)
def user():
	user = User.query.first()
	#🃏
	results = user_schema.dump(user.__dict__)
	return jsonify(results)

@app.route('/posts', methods=['POST'])
def createPost():
	form_data = request.form
	print(form_data)
	title = form_data.get('title')
	content = form_data.get('content')
	imageURL = form_data.get('imageURL')
	imageURL = form_data.get('imageURL')
	catagory = form_data.get('category')
	user_id = 0
	print(title, content, imageURL)

	post = Post(title=title, content=content, imageURL=imageURL, user_id=user_id,catagory=catagory)
	db.session.add(post)
	db.session.commit()

	return jsonify({'message': 'Post created successfully'}), 201

@app.route('/posts', methods=['GET'])
def getPosts():
	posts = Post.query.all()
	post_list = []
	for post in posts:
		post_data = {
			'id': post.id,
			'title': post.title,
			'content': post.content,
			'imageURL': post.imageURL,
			'user_id': post.user_id,
			'catagory': post.catagory,
			'created_at': post.created_at.strftime('%Y-%m-%d %H:%M:%S')
		}
		post_list.append(post_data)
	post_list.sort(key = lambda x : x["created_at"], reverse=True)
	return jsonify(post_list)

@app.route('/users/<int:user_id>/reserved_items', methods=['GET'])
def get_reserved_items(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
	

    reserved_items = Reservations.query.filter_by(user_id=user_id).all()
    print("BRUH", reserved_items)
    reserved_items_data = []
    for reservation in reserved_items:
        item = itemForSale_schema.dump(reservation.itemForSale)
        reserved_items_data.append({
            'id': item["id"],
            'name': item["name"],
            'image': item["image"],
            'price': item["price"],
            'amount': item["amount"],
            'receipt': item["receipt"],
            'description': item["description"],
            'date_posted': item["date_posted"],
            'expiry_date': item["expiry_date"],
            'receipt_info': item["receipt_info"],
            'user_id': item["user_id"],
            'reserved_amount': reservation.reservedAmount
        })
    
    return jsonify(reserved_items_data), 200

@app.route('/catalogPosts/<int:user_id>', methods=['GET'])
def get_posted_items(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
	
    posted_items = ItemForSale.query.filter_by(user_id=user_id).all()
    posted_items_data = []
    for itemForSale in posted_items:
        item = itemForSale_schema.dump(itemForSale)
        posted_items_data.append({
            'id': item["id"],
            'name': item["name"],
            'image': item["image"],
            'price': item["price"],
            'amount': item["amount"],
            'receipt': item["receipt"],
            'description': item["description"],
            'date_posted': item["date_posted"],
            'expiry_date': item["expiry_date"],
            'receipt_info': item["receipt_info"],
            'user_id': item["user_id"],
        })
    
    return jsonify(posted_items_data), 200
@app.route('/post/<int:post_id>', methods=['GET'])
def get_post_and_comments(post_id):
    post = Post.query.get_or_404(post_id)
    comments = [comment.content for comment in post.comments]

    return jsonify({
        'post': {
            'id': post.id,
            'title': post.title,
            'content': post.content,
            'imageURL': post.imageURL,
            'user_id': post.user_id,
            'created_at': post.created_at,
        },
        'comments': comments
    })

@app.route("/catalogPosts", methods=["GET"], strict_slashes=False)
def get_catalog_posts():
	catalog_posts = ItemForSale.query.all()
	return jsonify([{
		"id": post.id,
		"name": post.name,
		"image": base64.b64encode(post.image).decode('utf-8'),
		"price": post.price,
		"amount": post.amount,
		"receipt": base64.b64encode(post.receipt).decode('utf-8') if post.receipt else None,
		"receipt_info": post.receipt_info,
		"description": post.description,
		"date_posted": post.date_posted,
		"expiry_date": post.expiry_date,
		"user_id": post.user_id
	} for post in catalog_posts])

@app.route("/reservations", methods=["GET"], strict_slashes=False)
def get_reservations():
	reservations = Reservations.query.all()
	return jsonify([{
		"id": reservation.id,
		"user_id": reservation.user_id,
		"itemForSale": itemForSale_schema.dump(reservation.itemForSale),
		"itemForSale_id": reservation.itemForSale_id,
		"reservedAmount": reservation.reservedAmount
	} for reservation in reservations])

@app.route("/uploadCatalogPost", methods=["POST"])
def uploadItem():
	form_data = request.form
	name = form_data.get('name')
	image = request.files['foodPicture'].read()
	price = float(form_data.get('price'))
	amount = int(form_data.get('amount'))
	receipt = request.files['receipt']
	description = ""
	expiry_date = datetime.now()


	receipt.save("image_cache/receipt.jpg")

	receiptInfo = extractReceiptInformation()

	receipt.stream.seek(0)
	
	suggested_item, suggested_price = extract_item_and_price(receiptInfo, name)

	# USER ID IS CURRENTLY HARDCODED
	item = ItemForSale(
		name=name,
		image=image,
		price=price,
		amount=amount,
		receipt=request.files['receipt'].read(),
		receipt_info = receiptInfo,
		description=description,
		expiry_date=expiry_date,
		user_id=0
	)
	db.session.add(item)
	db.session.commit()
	resp = jsonify(success=True, suggested_item=suggested_item, suggested_price=suggested_price)
	return resp

def extractReceiptInformation():
	mindee_client = Client(api_key=mindee_receipt_api_key)
	input_doc = mindee_client.source_from_path("image_cache/receipt.jpg")
	print(input_doc)
	result: PredictResponse = mindee_client.parse(product.ReceiptV5, input_doc)
	print(result.document)
	receiptInfo = ""
	for line_items_elem in result.document.inference.prediction.line_items:
		
			print(line_items_elem.description + ',' + str(line_items_elem.total_amount)  + '\n')
			receiptInfo += line_items_elem.description + ',' + str(line_items_elem.total_amount)  + '\n'
	return receiptInfo


# takes a receipt info string and a title of item as parameters to match
def extract_item_and_price(receipt_info, user_input):
  receipt_list = receipt_info.split("\n")
  receipt_dict = {}
  for item in receipt_list:
    item_list = item.split(",")
    if len(item_list) == 2:
      receipt_dict[item_list[0]] = item_list[1]
  user_input = user_input.upper().strip()
  matches = []
  for key in receipt_dict.keys():
    ratio = difflib.SequenceMatcher(None, user_input, key.upper()).ratio()
    print(user_input, key, ratio)
    if ratio >= 0.5:
      matches.append((key, ratio))
  matches.sort(key=lambda x: x[1], reverse=True)
  if matches:
    best_match = matches[0]
    return (best_match[0], receipt_dict[best_match[0]])
  else:
    return None


	
if __name__ == "__main__":
	app.run(debug=True)