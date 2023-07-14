from flask import Blueprint, request
from flask_login import login_required, current_user
from ..utils.helpers import validation_errors_to_dict

from app.models import db, Item
from app.forms.create_item_form import CreateItemForm

item_routes = Blueprint("items", __name__)


@item_routes.route("/<int:item_id>")
def get_one_item(item_id):
    item = Item.query.get(item_id)

    if item == None:
        return {"errors": "No item found"}, 404

    return {"item": item.to_dict(timestamps=True)}


@item_routes.route("/new", methods=["POST"])
@login_required
def new_item():
    form = CreateItemForm()
    form["csrf_token"].data = request.cookies.get("csrf_token")

    if form.validate_on_submit():
        item = Item(
            name=form.data["name"],
            about=form.data["about"],
            image=form.data["image"],
            price=form.data["price"],
            business_id=form.data["business_id"],
        )

        db.session.add(item)
        db.session.commit()
        return {"item": item.to_dict(timestamps=True)}
    return {"errors": validation_errors_to_dict(form.errors)}, 400


@item_routes.route("/<int:item_id>/delete", methods=["DELETE"])
@login_required
def delete_item(item_id):
    item = Item.query.get(item_id)

    if item == None:
        return {"errors": "No item found"}, 404
    if not item.business.user_id == current_user.id:
        return {"errors": {"user": "Not Authorized"}}, 401

    db.session.delete(item)
    db.session.commit()

    return {"message": "successfully deleted"}