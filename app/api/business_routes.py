from flask import Blueprint, jsonify
from app.models import Business

business_routes = Blueprint("businesses", __name__)


@business_routes.route("/all")
def all_businesses():
    """
    Query for all the businesses in the database, no filters
    """
    businesses = Business.query.all()
    return {"businesses": [b.to_dict() for b in businesses]}
