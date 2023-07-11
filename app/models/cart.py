from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Cart(db.Model):
    __tablename__ = "carts"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    business_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id"))
    )
    total_price = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    user = db.relationship("User", back_populates="carts")
    business = db.relationship("Business", back_populates="carts")
    items = db.relationship("CartItem", back_populates="cart")

    def to_dict(self, timestamps=False):
        dct = {
            "id": self.id,
            "userId": self.user_id,
            "user": self.user.to_dict(),
            "businessId": self.business_id,
            "business": self.business.to_dict(),
            "items": [i.to_dict() for i in self.items],
            "totalPrice": self.total_price,
        }

        if timestamps:
            dct["createdAt"] = self.created_at
            dct["updatedAt"] = self.updated_at

        return dct
