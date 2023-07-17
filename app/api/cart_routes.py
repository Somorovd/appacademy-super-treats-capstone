from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms.create_cart_item_form import CreateCartItemForm
from ..utils.helpers import validation_errors_to_dict

from app.models import db, Cart, CartItem, Item, Business

cart_routes = Blueprint("carts", __name__)


@cart_routes.route("/current")
@login_required
def user_carts():
    carts = Cart.query.filter(Cart.user_id == current_user.id).all()
    return {"carts": {cart.id: cart.to_dict() for cart in carts}}


@cart_routes.route("/<int:cart_id>")
@login_required
def get_cart(cart_id):
    cart = Cart.query.get(cart_id)
    if not cart:
        return {"errors": "cart not found"}
    return {"cart": cart.to_dict()}


@cart_routes.route("/add_item", methods=["POST"])
@login_required
def add_item():
    form = CreateCartItemForm()
    form["csrf_token"].data = request.cookies.get("csrf_token")

    if not form.validate_on_submit():
        return {"errors": validation_errors_to_dict(form.errors)}, 400

    item = Item.query.get(form.data["item_id"])

    if not item:
        return {"errors": "item not found"}, 404

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


@cart_routes.route("/<int:cart_id>/delete", methods=["DELETE"])
@login_required
def delete_cart(cart_id):
    cart = Cart.query.get(cart_id)

    if not cart:
        return {"errors": "cart not found"}, 404

    if not cart.user_id == current_user.id:
        return {"errors": "not authorized"}, 401

    db.session.delete(cart)
    db.session.commit()

    return {"message": "successfully deleted"}


@cart_routes.route("/<int:cart_id>/items/<int:item_id>/delete", methods=["DELETE"])
@login_required
def delete_cart_item(cart_id, item_id):
    cart = Cart.query.get(cart_id)
    cart_item = CartItem.query.get(item_id)

    if not cart:
        return {"errors": "cart not found"}, 404

    if not cart.user_id == current_user.id:
        return {"errors": "not authorized"}, 401

    if not cart_item:
        return {"errors": "item not found"}, 404

    db.session.delete(cart_item)
    db.session.commit()

    if not cart.cart_items:
        db.session.delete(cart)
        db.session.commit()

    return {"message": "successfully deleted"}
