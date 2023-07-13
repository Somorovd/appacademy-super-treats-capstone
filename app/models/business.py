from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from enum import Enum

price_ranges = Enum(
    "PriceRanges",
    ["$", "$$", "$$$", "$$$$"],
)

types = Enum(
    "Types",
    [
        "Restaurant",
        # "Convenience store",
        "Grocery Store",
        # "Specialty food store",
        "Liquor Store",
        # "Florist",
        # "Pharmacy",
        # "Retail",
    ],
)

cuisines = Enum(
    "Cuisines",
    [
        "Alcohol",
        "Bakery",
        "BBQ",
        "Burgers",
        "Coffee & Tea",
        "Chinese",
        "French",
        "Ice Cream & Frozen Yogurt",
        "Pizza",
        "Sushi",
    ],
)


class Business(db.Model):
    __tablename__ = "businesses"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(255), nullable=True)
    price_range = db.Column(db.Enum(price_ranges), default=price_ranges["$"])
    delivery_fee = db.Column(db.Numeric(3, 2), nullable=False, default=0)
    type = db.Column(db.Enum(types), nullable=False)
    cuisine = db.Column(db.Enum(cuisines), nullable=True)
    rating = db.Column(db.Numeric(3, 2), nullable=False, default=5)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    user = db.relationship("User", back_populates="businesses")
    carts = db.relationship("Cart", back_populates="business")
    items = db.relationship("Item", back_populates="business")
    categories = db.relationship("Category", back_populates="business")

    def to_dict(self, timestamps=False):
        dct = {
            "address": self.address,
            "cuisine": self.cuisine.name if self.cuisine else None,
            "deliveryFee": self.delivery_fee,
            "id": self.id,
            "image": self.image,
            "name": self.name,
            "rating": self.rating,
            "priceRange": self.price_range.name,
            "type": self.type.name,
            "userId": self.user_id,
        }

        if timestamps:
            dct["createdAt"] = self.created_at
            dct["updatedAt"] = self.updated_at

        return dct
