from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError


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


class CreateItemForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), Length(1, 50)])
    image = StringField("image", validators=[Length(0, 255), supported_image])
    about = StringField("about", validators=[Length(0, 255)])
    price = FloatField("price", validators=[NumberRange(0, 1000)])
    business_id = IntegerField("business_id", validators=[DataRequired()])
    category_id = IntegerField("category_id")
