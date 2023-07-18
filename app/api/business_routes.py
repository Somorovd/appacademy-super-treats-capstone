from flask import Blueprint, jsonify
from app.models import Business

business_routes = Blueprint("businesses", __name__)


@business_routes.route("/all")
def all_businesses():
    """
    Query for all the businesses in the database, no filters
    """
    businesses = Business.query.all()
    return {"businesses": {b.id: b.to_dict() for b in businesses}}


@business_routes.route("/<int:business_id>")
def one_business(business_id):
    business = Business.query.get(business_id)

    if not business:
        return {"errors": "business not found"}, 404

    return {"business": business.to_dict(get_items=True)}
