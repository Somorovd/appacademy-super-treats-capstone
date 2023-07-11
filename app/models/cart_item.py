from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class CartItem(db.Model):
    __tablename__ = "cart_items"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    item_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("items.id")), nullable=False
    )
    cart_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("carts.id")), nullable=False
    )

    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    item = db.relationship("Item")

    def to_dict(self, timestamps=False):
        dct = {"id": self.id, "quantity": self.quantity, "item": self.item.to_dict()}

        if timestamps:
            dct["createdAt"] = self.created_at
            dct["updatedAt"] = self.updated_at

        return dct
