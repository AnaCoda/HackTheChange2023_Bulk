from flask import current_app,jsonify,request
from app import create_app,db
from models import ItemForSale, Post, Reservations, User, users_schema,user_schema, itemForSale_schema, itemsForSale_schema, reservation_schema, reservations_schema
from eyewearSimilarity import *
from datetime import datetime
import random
import base64

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


@app.route('/posts', methods=['POST'])
def createPost():
	form_data = request.form
	print(form_data)
	title = form_data.get('title')
	content = form_data.get('content')
	imageURL = form_data.get('imageURL')
	user_id = 0
	print(title, content, imageURL)

	post = Post(title=title, content=content, imageURL=imageURL, user_id=user_id)
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
			'created_at': post.created_at.strftime('%Y-%m-%d %H:%M:%S')
		}
		post_list.append(post_data)
	post_list.sort(key = lambda x : x["created_at"], reverse=True)
	return jsonify(post_list)

from flask import jsonify

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

@app.route("/uploadCatalogPost", methods=["POST"])
def uploadItem():
    form_data = request.form
    name = form_data.get('name')
    image = request.files['foodPicture'].read()
    price = float(form_data.get('price'))
    amount = int(form_data.get('amount'))
    receipt = request.files['receipt'].read()
    description = ""
    expiry_date = datetime.now()

    # USER ID IS CURRENTLY HARDCODED
    item = ItemForSale(
        name=name,
        image=image,
        price=price,
        amount=amount,
        receipt=receipt,
        description=description,
        expiry_date=expiry_date,
        user_id=random.randint(0,10000)
    )
    db.session.add(item)
    db.session.commit()
    resp = jsonify(success=True)
    return resp
	
if __name__ == "__main__":
	app.run(debug=True)