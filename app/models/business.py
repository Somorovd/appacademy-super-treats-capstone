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
        "Convenience store",
        "Grocery store",
        "Specialty food store",
        "Liquor store",
        "Florist",
        "Pharmacy",
        "Retail",
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
    price_range = db.Column(db.Enum(price_ranges))
    type = db.Column(db.Enum(types))
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
            "id": self.id,
            "address": self.address,
            "name": self.name,
            "image": self.image,
            "priceRange": self.price_range,
            "type": self.type,
        }

        if timestamps:
            dct["createdAt"] = self.created_at
            dct["updatedAt"] = self.updated_at

        return dct
