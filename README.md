# Super Treats

Super Treats is a solo project build as the capstone project at App Academy, the
culmination of 6 months of focused study on fullstack developement. Super Treats
is an eCommerce site for food. Hungry users can browse food options and place
orders, while business focused users can register their restaurants and menus to
create a new source of income. The live site is available @ https://super-treats.onrender.com

For more details on features and application architecture see our wiki:

- [Features List](https://github.com/Somorovd/appacademy-super-treats-capstone/wiki/Feature-List)
- [User Stories](https://github.com/Somorovd/appacademy-super-treats-capstone/wiki/User-Stories)
- [Database and Endpoints](https://github.com/Somorovd/appacademy-super-treats-capstone/wiki/Database-and-Endpoints)
- [Redux Store Shape](https://github.com/Somorovd/appacademy-super-treats-capstone/wiki/Redux-Store-Shape)
- [React Components](https://github.com/Somorovd/appacademy-super-treats-capstone/wiki/React-Components)

## Tech and Languages

- React
- Redux
- Flask
- SQLAlchemy
- Javascript
- Python
- Postgres
- CSS
- HTML

## How to Build

In the root directory:

```bash
  pipenv install -r requirements.txt &&
  pipenv shell &&
  cp .env.example .env &&
  flask db upgrade &&
  flask seed all &&
  flask run
```

In a second terminal:

```bash
  cd react-app &&
  npm install &&
  npm start
```

In your browser, navigate to http://localhost:3000/

## Screenshots

## Future Features

1. Search and filter for businesses and items
2. Allow business owners to create multiple menus and split items by category
3. Connect a map API to show locations and estimate delivery times
4. Create a system that allows users to customize their orders i.e. portion size and toppings
