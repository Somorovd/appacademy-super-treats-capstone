from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, NumberRange


class CreateCartItemForm(FlaskForm):
    item_id = IntegerField("item_id", validators=[DataRequired()])
    quantity = IntegerField("quantity", validators=[DataRequired(), NumberRange(1, 99)])
