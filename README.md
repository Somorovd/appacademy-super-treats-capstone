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

![image](https://github.com/Somorovd/appacademy-super-treats-capstone/assets/18534469/c9de766c-4b0d-40fe-affd-8a5d9a8f7241)
![image](https://github.com/Somorovd/appacademy-super-treats-capstone/assets/18534469/fe0369f6-befb-46bb-83f3-47b6fcbc1ed7)
![image](https://github.com/Somorovd/appacademy-super-treats-capstone/assets/18534469/7c790b16-c260-4d19-a37d-c286cf40de22)
![image](https://github.com/Somorovd/appacademy-super-treats-capstone/assets/18534469/8ee9fc22-a358-492e-8bfd-831731ca50f8)
![image](https://github.com/Somorovd/appacademy-super-treats-capstone/assets/18534469/0e8d2952-6c84-4723-9f36-d08a0450e059)
![image](https://github.com/Somorovd/appacademy-super-treats-capstone/assets/18534469/7710382c-1b38-4b46-bda0-6f24ca79cf6d)
![image](https://github.com/Somorovd/appacademy-super-treats-capstone/assets/18534469/9e0477c2-6360-402f-9eef-972b79688751)

## Future Features

1. Search and filter for businesses and items
2. Allow business owners to create multiple menus and split items by category
3. Connect a map API to show locations and estimate delivery times
4. Create a system that allows users to customize their orders i.e. portion size and toppings
