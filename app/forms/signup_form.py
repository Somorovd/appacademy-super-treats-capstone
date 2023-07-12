from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from ..utils.helpers import get_phone_from_input


def email_exists(form, field):
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Email address is already in use.")


def valid_phone(form, field):
    phone = get_phone_from_input(field.data)
    if not len(phone) == 10:
        raise ValidationError("Phone number is invalid")


def phone_exists(form, field):
    phone = get_phone_from_input(field.data)
    user = User.query.filter(User.phone == phone).first()
    if user:
        raise ValidationError("Phone address is already in use.")


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError("Username is already in use.")


class SignupEmailForm(FlaskForm):
    email = StringField("email", validators=[DataRequired(), Email(), email_exists])


class SignupPhoneForm(FlaskForm):
    phone = StringField("phone", validators=[DataRequired(), valid_phone, phone_exists])


class SignUpForm(FlaskForm):
    email = StringField("email", validators=[DataRequired(), Email(), email_exists])
    phone = StringField("phone", validators=[DataRequired(), valid_phone, phone_exists])
    password = StringField("password", validators=[DataRequired()])
    first_name = StringField("password", validators=[DataRequired()])
    last_name = StringField("password", validators=[DataRequired()])
