from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Address(db.Model):
    __tablename__ = "addresses"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    street = db.Column(db.String(100), nullable=False)
    number = db.Column(db.String(10), nullable=False)
    room = db.Column(db.String(100), nullable=True)
    postal_code = db.Column(db.String(10), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(2), nullable=False)

    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    def to_dict(self, timestamps=False):
        dct = {
            "id": self.id,
            "street": self.street,
            "number": self.number,
            "room": self.room,
            "postalCode": self.postal_code,
            "city": self.city,
            "state": self.state,
        }

        if timestamps:
            dct["createdAt"] = self.created_at
            dct["updatedAt"] = self.updated_at

        return dct
