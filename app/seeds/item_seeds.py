from app.models import db, Item, Business, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from random import choice, randint, random
from .items_list import items


def seed_items():
    for b in Business.query.all():
        for name, image in items[b.cuisine.name].items():
            item = Item(
                name=name,
                image=image,
                price=float("{0:.2f}".format(random() * 45)),
                business_id=b.id,
            )
            db.session.add(item)

        for i in range(10):
            item = Item(
                name=f"Item {randint(10, 100):04}",
                price=float("{0:.2f}".format(random() * 45)),
                business_id=b.id,
            )
            db.session.add(item)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()
