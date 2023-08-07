from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms.create_category_form import CreateCategoryForm
from ..utils.helpers import validation_errors_to_dict

from app.models import db, Category, Business, Item

category_routes = Blueprint("categories", __name__)


@category_routes.route("/new", methods=["POST"])
@login_required
def create_category():
    form = CreateCategoryForm()
    form["csrf_token"].data = request.cookies.get("csrf_token")

    if not form.validate_on_submit():
        print("ERRORS", form.form_errors)
        return {"errors": validation_errors_to_dict(form.errors)}, 400

    business = Business.query.get(form.data["business_id"])

    if not business:
        return {"errors": "cart not found"}, 404

    if not business.user_id == current_user.id:
        return {"errors": "not authorized"}, 401

    category = (
        Category.query.filter(Category.name == form.data["name"])
        .filter(Category.business_id == form.data["business_id"])
        .one_or_none()
    )

    if category:
        return {"errors": {"name": "Name must be unique"}}, 400

    category = Category(name=form.data["name"], business_id=form.data["business_id"])
    db.session.add(category)
    db.session.commit()
    return {"category": category.to_dict()}
