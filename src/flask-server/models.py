from app import db,ma
from datetime import datetime
from sqlalchemy import event
import base64

class ItemForSale(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    image = db.Column(db.LargeBinary, nullable=False)
    price = db.Column(db.Float, nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    receipt = db.Column(db.LargeBinary)
    description = db.Column(db.Text, nullable=True)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.now)
    expiry_date = db.Column(db.DateTime, nullable=False)
    receipt_info = db.Column(db.String(1000), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

class Reservations(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    itemForSale = db.relationship('ItemForSale', backref="post", lazy=True)
    itemForSale_id = db.Column(db.ForeignKey(ItemForSale.id))
    reservedAmount = db.Column(db.Integer, nullable=False)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(20), nullable=False)
    lastName = db.Column(db.String(20), nullable=False)
    description = db.Column(db.Text)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60))    
    credits = db.Column(db.Integer, nullable=False)
    itemsForSale = db.relationship("ItemForSale", backref="user", lazy=True)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    catagory = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    imageURL = db.Column(db.String(255))
    user_id = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    comments = db.relationship("Comment", backref="post", lazy=True)

    
class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)

class ItemForSaleShema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("id","name", "image", "price", "amount"
        ,"receipt", "description", "date_posted", "expiry_date","user_id","receipt_info")
class UsersShema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("id","firstName","lastName", "description", "email", "password", "credits", "itemsForSale")
    itemsforSale = ma.Nested(ItemForSaleShema, many=True)

class ReservationsShema(ma.Schema):
    class Meta:
        fields = ("id", "user_id", "itemForSale", "itemForSale_id", "reservedAmount")

@event.listens_for(ItemForSale.__table__, 'after_create')
def create_itemsForSale(*args, **kwargs):
    with open("sample_images/costcobeefstew.jpg", "rb") as image_file:
        image = base64.b64encode(image_file.read())
    with open("sample_images/receipt.jpg", "rb") as image_file:
        receipt = base64.b64encode(image_file.read())
    db.session.add(ItemForSale(id=1, name="Costco Beef Chili Stew",
                               image=image, receipt=receipt,receipt_info="CAKN BROTA,5.99\nBLACK BEANS,6.79\nSWT SWEET POTATOES ONIONS,10.99\nGOLD POTATO,7.79\nMIXED PEPPER,6.59\nORGANIC CORN,5.79\nBEEF STEW,23.78\nFORX CHOPS APPLES,17.13\nORG. CARROTS,4.99\nAID CHKN SSG,13.99\nBABY FORMULA,17.99\nBNLS/SL BRST,29.09\nTHIGH MEAT,17.46\nFRZ. GAL ZIPR,12.59\nKS STEWEDTOM,5.99\n",
                               price=20, amount=10, description="Yum", user_id=0, expiry_date=datetime(2023, 12, 25, 0, 0)))
    db.session.commit()

@event.listens_for(User.__table__, 'after_create')
def create_users(*args, **kwargs):
    
    db.session.add(User(id=1, firstName = "asd", lastName = "asdasds", email= "sadsa", password="asd", credits=5))
    db.session.commit()

user_schema = UsersShema()
users_schema = UsersShema(many=True)

itemForSale_schema = ItemForSaleShema()
itemsForSale_schema = ItemForSaleShema(many=True)

reservation_schema = ReservationsShema()
reservations_schema = ReservationsShema(many=True)