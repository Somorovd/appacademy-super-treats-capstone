const GET_ALL_CARTS = "carts/GET_ALL_CARTS";
const ADD_TO_CART = "carts/ADD_TO_CART";
const DELETE_CART = "carts/DELETE_CART";
const EDIT_CART_ITEM = "carts/EDIT_CART_ITEM";

const actionGetAllCarts = (carts) => ({
  type: GET_ALL_CARTS,
  payload: carts,
});

const actionAddToCart = (cart) => ({
  type: ADD_TO_CART,
  payload: cart,
});

const actionDeleteCart = (cart) => ({
  type: DELETE_CART,
  payload: cart,
});

const actionEditCartItem = (cartItem) => ({
  type: EDIT_CART_ITEM,
  payload: cartItem,
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

export const thunkDeleteCart = (cart) => async (dispatch) => {
  const res = await fetch(`/api/carts/${cart.id}/delete`, {
    method: "delete",
  });
  const resBody = await res.json();

  if (res.ok) dispatch(actionDeleteCart(cart));
  return resBody;
};

export const thunkEditCartItem = (cartItem) => async (dispatch) => {
  const res = await fetch(
    `/api/carts/${cartItem.cartId}/items/${cartItem.id}/edit`,
    {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(cartItem),
    }
  );
  const resBody = await res.json();

  if (res.ok) dispatch(actionEditCartItem(resBody.cartItem));
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
    case DELETE_CART: {
      const newState = { ...state };
      delete newState[action.payload.business.id];
      return newState;
    }
    case EDIT_CART_ITEM: {
      const newState = { ...state };
      const cart = { ...newState[action.payload.item.businessId] };
      cart.cartItems = {
        ...cart.cartItems,
        [action.payload.id]: { ...action.payload },
      };
      newState[action.payload.item.businessId] = cart;
      return newState;
    }
    default:
      return state;
  }
}
