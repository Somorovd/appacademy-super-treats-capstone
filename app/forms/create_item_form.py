from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange


def supported_image(form, field):
    pass


class CreateItemForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), Length(1, 50)])
    image = StringField("image", validators=[Length(0, 255), supported_image])
    about = StringField("about", validators=[Length(0, 255)])
    price = FloatField("price", validators=[NumberRange(0, 1000)])
    business_id = IntegerField("business_id", validators=[DataRequired()])
