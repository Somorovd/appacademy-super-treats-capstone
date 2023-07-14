from app.models import db, Item, Business, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from random import choice, randint, random

fake = Faker()


def seed_items():
    demo_item1 = Item(
        name="Chocolate Cake (Slice)",
        price="5.50",
        image="https://cdn.discordapp.com/attachments/723759214123679836/1129148983051300986/photo-1517427294546-5aa121f68e8a.jpg",
        about="Rich and moist cake for the avid chocolate lover",
        business_id=1,
        # category_id,
    )
    demo_item2 = Item(
        name="Hawaiian Pizza",
        price="17.99",
        image="https://cdn.discordapp.com/attachments/723759214123679836/1129149359087440072/photo-1562835155-a7c2a225e97d.jpg",
        about='18" pizza topped with ham and pineapples',
        business_id=1,
        # category_id,
    )
    db.session.add(demo_item1)
    db.session.add(demo_item2)

    for b in Business.query.all():
        for _ in range(10):
            item = Item(
                name=fake.password(length=40, special_chars=False, upper_case=False),
                price=float("{0:.2f}".format(random() * 45)),
                # image="",
                about=fake.text(),
                business_id=b.id,
                # category_id,
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
