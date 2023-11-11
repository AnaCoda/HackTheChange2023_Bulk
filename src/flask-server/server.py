from flask import current_app,jsonify,request
from app import create_app,db
from models import ItemForSale, Reservations, User, users_schema,user_schema, itemForSale_schema, itemsForSale_schema, reservation_schema, reservations_schema
from eyewearSimilarity import *

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


@app.route("/catalogPosts", methods=["GET", "POST"], strict_slashes=False)
def eyewear():
	items = ItemForSale.query.all()
	for glass in items:
		glassDict = glass.__dict__
		print(glassDict)
	if request.method == "GET":
		items = ItemForSale.query.all()
		
		results = itemsForSale_schema.dump(items)
		print(results)
		print(jsonify(results))
		return jsonify(results)
	
if __name__ == "__main__":
	app.run(debug=True)