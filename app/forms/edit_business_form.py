from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError
from ..models.business import types, cuisines, price_ranges


def cuisine_required(form, field):
    cuisine = field.data
    type = form.data["type"]
    if type == "Restaurant" and cuisine == None:
        raise ValidationError("Cuisine is required for type Restaurant")


def valid_cuisine(form, field):
    cuisine = field.data
    type = form.data["type"]
    if type == "Restaurant" and cuisine not in [e.name for e in cuisines]:
        raise ValidationError("Invalid cuisine")


def valid_type(form, field):
    type = field.data
    if not type in [e.name for e in types]:
        raise ValidationError("Invalid type")


def valid_range(form, field):
    price_range = field.data
    if not price_range in [e.name for e in price_ranges]:
        raise ValidationError("Invalid price range")


def supported_image(form, field):
    image = field.data
    if not image:
        return

    image_name = image.split("/")[-1]
    split = image_name.split(".")
    valid_extensions = ["jpg", "jpeg", "png"]
    if (not len(split) == 2) or (split[1] not in valid_extensions):
        raise ValidationError(
            "Image url must be of type " + ", ".join(valid_extensions)
        )


class EditBusinessForm(FlaskForm):
    address = StringField("address", validators=[DataRequired(), Length(1, 255)])
    name = StringField("address", validators=[DataRequired(), Length(1, 100)])
    type = StringField("type", validators=[DataRequired(), valid_type])
    cuisine = StringField("cuisine", validators=[cuisine_required, valid_cuisine])
    image = StringField("image", validators=[supported_image, Length(0, 255)])
    price_range = StringField("price_range", validators=[DataRequired(), valid_range])
    delivery_fee = FloatField("delivery_fee", validators=[NumberRange(min=0, max=10)])
