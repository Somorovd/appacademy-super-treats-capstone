from flask import Blueprint, request
from flask_login import login_required, current_user
from ..utils.helpers import validation_errors_to_dict

from app.models import db, Item
from app.forms.create_item_form import CreateItemForm

item_routes = Blueprint("items", __name__)


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
