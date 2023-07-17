from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms.create_cart_item_form import CreateCartItemForm
from ..utils.helpers import validation_errors_to_dict

from app.models import db, Cart, CartItem, Item, Business

cart_routes = Blueprint("carts", __name__)


@cart_routes.route("")
@login_required
def user_carts():
    carts = Cart.query.filter(Cart.user_id == current_user.id).all()
    return {"carts": {cart.id: cart.to_dict() for cart in carts}}


@cart_routes.route("/add_item", methods=["POST"])
@login_required
def add_item():
    form = CreateCartItemForm()
    form["csrf_token"].data = request.cookies.get("csrf_token")

    if not form.validate_on_submit():
        return {"errors": validation_errors_to_dict(form.errors)}, 400

    item = Item.query.get(form.data["item_id"])

    if not item:
        return {"error": "item not found"}, 404

    cart = (
        Cart.query.filter(Cart.user_id == current_user.id)
        .filter(Cart.business_id == item.business.id)
        .one_or_none()
    )

    if not cart:
        cart = Cart(
            user_id=current_user.id,
            business_id=item.business.id,
        )
        db.session.add(cart)
        db.session.commit()

    cart_item = CartItem(
        cart_id=cart.id, item_id=form.data["item_id"], quantity=form.data["quantity"]
    )

    db.session.add(cart_item)
    db.session.commit()

    return {"message": "item added successfully"}
