const GET_ALL_CARTS = "carts/GET_ALL_CARTS";
const ADD_TO_CART = "carts/ADD_TO_CART";

const actionGetAllCarts = (carts) => ({
  type: GET_ALL_CARTS,
  payload: carts,
});

const actionAddToCart = (cart) => ({
  type: ADD_TO_CART,
  payload: cart,
});

export const thunkGetAllCarts = () => async (dispatch) => {
  const res = await fetch("/api/carts/current");
  const resBody = await res.json();

  if (res.ok) dispatch(actionGetAllCarts(resBody.carts));
  return resBody;
};

export const thunkAddToCart = (item) => async (dispatch) => {
  const res = await fetch("/api/carts/add_item", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(item),
  });
  const resBody = await res.json();

  if (res.ok) dispatch(actionAddToCart(resBody.cart));
  return resBody;
};

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CARTS: {
      return { ...state, ...action.payload };
    }
    case ADD_TO_CART: {
      return { ...state, [action.payload.business.id]: { ...action.payload } };
    }
    default:
      return state;
  }
}
