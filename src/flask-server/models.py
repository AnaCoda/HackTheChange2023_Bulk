from app import db,ma
from datetime import datetime
from sqlalchemy import event

class ItemForSale(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), primary_key=True)
    image = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    receipt = db.Column(db.String(100))
    description = db.Column(db.Text, nullable=True)

class Reservations(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    itemForSale = db.relationship('ItemForSale', backref="post", lazy=True)
    itemForSale_id = db.Column(db.ForeignKey(ItemForSale.id))
    reservedAmount = db.Column(db.Integer, nullable=False)

class CatalogPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.now)
    expiry_date = db.Column(db.DateTime, nullable=False)
    itemForSale = db.relationship('ItemForSale', backref="catalogpost", lazy=True)
    itemForSale_id = db.Column(db.ForeignKey(ItemForSale.id))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(20), nullable=False)
    lastName = db.Column(db.String(20), nullable=False)
    description = db.Column(db.Text)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60))    
    credits = db.Column(db.Integer, nullable=False)
    posts = db.relationship("CatalogPost", backref="user", lazy=True)
    

class Articles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100),nullable=False)
    body = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime(), default=datetime.utcnow)


    def __repr__(self):
        return "<Articles %r>" % self.title
# Generate marshmallow Schemas from your models
class ArticlesShema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("id","title", "body", "date")
class UsersShema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("id","firstName","lastName", "description", "email", "password", "credits", "posts")
class ItemForSaleShema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("id","name", "image", "price", "amount"
        ,"receipt", "description")

class ReservationsShema(ma.Schema):
    class Meta:
        fields = ("id", "user_id", "itemForSale", "itemForSale_id", "reservedAmount")

class CatalogPostShema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("id", "date_posted", "expiry_date",
                  "itemForSale","itemForSale_id", "user_id",)

# IMPORTANT: These events are for instantiating DEFAULT values in a database. Especially helpful in a hackathon to sync SQLite
@event.listens_for(Articles.__table__, 'after_create')
def create_articles(*args, **kwargs):
    db.session.add(Articles(id=1, title='abc@domain.com', body="hello"))
    db.session.add(Articles(id=2, title='abcd@domain.com', body="helloo"))
    db.session.commit()

@event.listens_for(CatalogPost.__table__, 'after_create')
def create_posts(*args, **kwargs):
    db.session.add(CatalogPost(id=1, expiry_date = datetime(2023, 12, 25, 0, 0), user_id=1))
    db.session.commit()

@event.listens_for(ItemForSale.__table__, 'after_create')
def create_eyewear(*args, **kwargs):
    db.session.add(ItemForSale(id=1, name="Campbell's Cream Of Mushroom",
                               image="https://images.costcobusinessdelivery.com/ImageDelivery/imageService?profileId=12027981&itemId=1503&recipeName=680",
                               price=20, amount=10, description="Yum"))
    db.session.commit()
@event.listens_for(User.__table__, 'after_create')
def create_users(*args, **kwargs):
    
    db.session.add(User(id=1, firstName = "asd", lastName = "asdasds", email= "sadsa", password="asd", credits=5))
    db.session.commit()

user_schema = UsersShema()
users_schema = UsersShema(many=True)

itemForSale_schema = ItemForSaleShema()
itemsForSale_schema = ItemForSaleShema(many=True)

catalogPost_schema = CatalogPostShema()
catalogPosts_schema = CatalogPostShema(many=True)

reservation_schema = ReservationsShema()
reservations_schema = ReservationsShema(many=True)