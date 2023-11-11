from flask import current_app,jsonify,request
from app import create_app,db
from models import ItemForSale, Reservations, User, users_schema,user_schema, itemForSale_schema, itemsForSale_schema, reservation_schema, reservations_schema
from eyewearSimilarity import *
from datetime import datetime
import random
import base64
from constants import mindee_receipt_api_key
from mindee import Client, PredictResponse, product

# Create an application instance
app = create_app()

with app.app_context():
	db.create_all()


@app.route("/users", methods=["GET"], strict_slashes=False)
def users():

	users = User.query.all()
	
	results = users_schema.dump(users)

	return jsonify(results)

@app.route("/user", methods=["GET"], strict_slashes=False)
def user():
	user = User.query.first()
	#🃏
	results = user_schema.dump(user.__dict__)
	return jsonify(results)


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

@app.route("/uploadCatalogPost", methods=["POST"])
def uploadItem():
	form_data = request.form
	name = form_data.get('name')
	image = request.files['foodPicture'].read()
	price = float(form_data.get('price'))
	amount = int(form_data.get('amount'))
	receipt = request.files['receipt']
	receiptRead = request.files['receipt'].read()
	description = ""
	expiry_date = datetime.now()

	receipt.save("image_cache/receipt.jpg")

	receiptInfo = extractReceiptInformation()

	# USER ID IS CURRENTLY HARDCODED
	item = ItemForSale(
		name=name,
		image=image,
		price=price,
		amount=amount,
		receipt=receiptRead,
		receipt_info = receiptInfo,
		description=description,
		expiry_date=expiry_date,
		user_id=0
	)
	db.session.add(item)
	db.session.commit()
	resp = jsonify(success=True)
	return resp

def extractReceiptInformation():
	mindee_client = Client(api_key=mindee_receipt_api_key)
	input_doc = mindee_client.source_from_path("image_cache/receipt.jpg")
	result: PredictResponse = mindee_client.parse(product.ReceiptV5, input_doc)
	print(result.document)
	receiptInfo = ""
	for line_items_elem in result.document.inference.prediction.line_items:
		
			print(line_items_elem.description + ',' + str(line_items_elem.total_amount)  + '\n')
			receiptInfo += line_items_elem.description + ',' + str(line_items_elem.total_amount)  + '\n'
	return receiptInfo

	
if __name__ == "__main__":
	app.run(debug=True)