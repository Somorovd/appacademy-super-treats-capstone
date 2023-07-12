from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, AnyOf
from ..models.business import types, cuisines, price_ranges


class CreateBusinessForm(FlaskForm):
    address = StringField("address", validators=[DataRequired(), Length(1, 255)])
    name = StringField("address", validators=[DataRequired(), Length(1, 100)])
    price_range = StringField(
        "price_range",
        validators=[DataRequired(), AnyOf([e.name for e in price_ranges])],
    )
    delivery_fee = StringField("delivery", validators=[DataRequired()])
    type = (
        StringField(
            "type", validators=[DataRequired(), AnyOf([e.name for e in types])]
        ),
    )
    cuisine = StringField(
        "cuisine", validators=[DataRequired(), AnyOf([e.name for e in cuisines])]
    )
