from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError
from ..models.business import types, cuisines


def cuisine_required(form, field):
    cuisine = field.data
    type = form.data["type"]
    if type == "Restaurant" and cuisine == None:
        raise ValidationError("Cuisine is required for type Restaurant")


def valid_cuisine(form, field):
    cuisine = field.data
    if cuisine not in [e.name for e in cuisines]:
        raise ValidationError("Invalid cuisine")


def valid_type(form, field):
    type = field.data
    if not type in [e.name for e in types]:
        raise ValidationError("Invalid type")


def supported_image(form, field):
    pass


def valid_price_range(form, field):
    pass


class EditBusinessForm(FlaskForm):
    address = StringField("address", validators=[DataRequired(), Length(1, 255)])
    name = StringField("address", validators=[DataRequired(), Length(1, 100)])
    type = StringField("type", validators=[DataRequired(), valid_type])
    cuisine = StringField("cuisine", validators=[cuisine_required, valid_cuisine])
    image = StringField("image", validators=[Length(0, 255), supported_image])
    price_range = StringField(
        "price_range", validators=[DataRequired(), valid_price_range]
    )
    delivery_fee = FloatField(
        "delivery_fee", validators=[DataRequired(), NumberRange(min=0, max=10)]
    )
