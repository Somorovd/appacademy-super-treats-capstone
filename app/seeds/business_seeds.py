from app.models import db, User, Business, environment, SCHEMA
from app.models.business import types, price_ranges, cuisines
from sqlalchemy.sql import text
from .business_list import businesses, cuisine_images
from random import choice, randint, random


def seed_businesses():
    demo_business = Business(
        address="180 Geary St Fl 6\nSan Francisco, CA 94108",
        cuisine=cuisines["Burgers"],
        delivery_fee="0.99",
        image="https://cdn.discordapp.com/attachments/723759214123679836/1128358776186093588/qHddZMInp.png",
        name="App Academy",
        price_range=price_ranges["$$$$"],
        rating=4.8,
        type=types["Restaurant"],
        user_id=1,
    )
    db.session.add(demo_business)

    for i, b in enumerate(businesses):
        business = Business(
            address=b["address"],
            cuisine=b["cuisine"],
            delivery_fee=b["delivery_fee"],
            image=cuisine_images[b["cuisine"]][i % len(cuisine_images[b["cuisine"]])],
            name=b["name"],
            price_range=b["price_range"],
            rating=b["rating"],
            type=types["Restaurant"],
            user_id=randint(0, 15),
        )
        db.session.add(business)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_businesses():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM businesses"))

    db.session.commit()
