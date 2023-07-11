from app.models import db, User, Business, environment, SCHEMA
from app.models.business import types, price_ranges
from sqlalchemy.sql import text
from faker import Faker
from random import choice, randint

fake = Faker()


# Adds a demo user, you can add other users here if you want
def seed_businesses():
    demo_business = Business(
        address="180 Geary St Fl 6\nSan Francisco, CA 94108",
        name="App Academy",
        image="https://cdn.discordapp.com/attachments/723759214123679836/1128358776186093588/qHddZMInp.png",
        price_range=price_ranges["$$$$"],
        type=types["Restaurant"],
        user_id=1,
    )
    db.session.add(demo_business)

    for _ in range(40):
        business = Business(
            address=fake.address(),
            name=fake.company(),
            image="",
            price_range=choice(list(price_ranges)),
            type=choice(list(types)),
            user_id=randint(1, 21),
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
