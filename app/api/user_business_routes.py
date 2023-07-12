from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..utils.helpers import validation_errors_to_dict

from app.models import db, Business
from app.forms.create_business_form import CreateBusinessForm

user_business_routes = Blueprint("user_businesses", __name__)


@user_business_routes.route("/all")
@login_required
def all_businesses():
    businesses = Business.query.filter(Business.user_id == current_user.id).all()
    return {"businesses": [b.to_dict() for b in businesses]}


@user_business_routes.route("/new", methods=["POST"])
@login_required
def new_business():
    form = CreateBusinessForm()
    form["csrf_token"].data = request.cookies.get("csrf_token")

    print(form.data)

    if form.validate_on_submit():
        business = Business(
            address=form.data["address"],
            name=form.data["name"],
            type="Grocery Store",
            cuisine=form.data["cuisine"],
            user_id=current_user.id,
        )

        db.session.add(business)
        db.session.commit()
        return {"business": business.to_dict()}
    return {"errors": validation_errors_to_dict(form.errors)}, 400
