from flask import Blueprint, request
from flask_login import login_required, current_user
from ..utils.helpers import validation_errors_to_dict

from app.models import db, Business
from app.forms.create_business_form import CreateBusinessForm
from app.forms.edit_business_form import EditBusinessForm

user_business_routes = Blueprint("user_businesses", __name__)


@user_business_routes.route("/all")
@login_required
def all_businesses():
    businesses = Business.query.filter(Business.user_id == current_user.id).all()
    return {"businesses": [b.to_dict() for b in businesses]}


@user_business_routes.route("/<int:business_id>")
@login_required
def one_business(business_id):
    business = Business.query.get(business_id)

    if business == None:
        return {"error": "No business found"}, 404
    if not business.user_id == current_user.id:
        return {"errors": {"user": "Not Authorized"}}, 401

    return {"business": business.to_dict(get_items=True)}


@user_business_routes.route("/new", methods=["POST"])
@login_required
def new_business():
    form = CreateBusinessForm()
    form["csrf_token"].data = request.cookies.get("csrf_token")

    if form.validate_on_submit():
        business = Business(
            address=form.data["address"],
            name=form.data["name"],
            type=form.data["type"],
            cuisine=form.data["cuisine"],
            user_id=current_user.id,
        )

        db.session.add(business)
        db.session.commit()
        return {"business": business.to_dict()}
    return {"errors": validation_errors_to_dict(form.errors)}, 400


@user_business_routes.route("/<int:business_id>/edit", methods=["PUT"])
@login_required
def edit_business(business_id):
    form = EditBusinessForm()
    form["csrf_token"].data = request.cookies.get("csrf_token")

    if form.validate_on_submit():
        business = Business.query.get(business_id)

        if business == None:
            return {"error": "No business found"}, 404
        if not business.user_id == current_user.id:
            return {"errors": {"user": "Not Authorized"}}, 401

        business.address = form.data["address"]
        business.cuisine = form.data["cuisine"]
        business.name = form.data["name"]
        business.type = form.data["type"]
        business.image = form.data["image"]
        business.price_range = form.data["price_range"]
        business.delivery_fee = form.data["delivery_fee"]

        db.session.commit()
        return {"business": business.to_dict()}
    return {"errors": validation_errors_to_dict(form.errors)}, 400


@user_business_routes.route("/<int:business_id>/delete", methods=["DELETE"])
@login_required
def delete_business(business_id):
    business = Business.query.get(business_id)

    if business == None:
        return {"error": "No business found"}, 404
    if not business.user_id == current_user.id:
        return {"errors": {"user": "Not Authorized"}}, 401

    db.session.delete(business)
    db.session.commit()

    return {"message": "successfully deleted"}
