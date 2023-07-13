from flask.cli import AppGroup
from .user_seeds import seed_users, undo_users
from .business_seeds import seed_businesses, undo_businesses
from .item_seeds import seed_items, undo_items

from app.models.db import db, environment, SCHEMA

seed_commands = AppGroup("seed")


@seed_commands.command("all")
def seed():
    if environment == "production":
        undo_items()
        undo_businesses()
        undo_users()
    seed_users()
    seed_businesses()
    seed_items()


@seed_commands.command("undo")
def undo():
    undo_items()
    undo_businesses()
    undo_users()
