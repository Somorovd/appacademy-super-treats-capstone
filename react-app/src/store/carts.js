const GET_ALL_CARTS = "carts/GET_ALL_CARTS";
const ADD_TO_CART = "carts/ADD_TO_CART";
const DELETE_CART = "carts/DELETE_CART";
const DELETE_CART_ITEM = "carts/DELETE_CART_ITEM";
const EDIT_CART_ITEM = "carts/EDIT_CART_ITEM";

const actionGetAllCarts = (carts) => ({
  type: GET_ALL_CARTS,
  payload: carts,
});

const actionAddToCart = (cart) => ({
  type: ADD_TO_CART,
  payload: cart,
});

const actionDeleteCart = (businessId) => ({
  type: DELETE_CART,
  payload: businessId,
});

const actionEditCartItem = ({ cartItem, cart }) => ({
  type: EDIT_CART_ITEM,
  payload: { cartItem, cart },
});

const actionDeleteCartItem = (itemId, cart) => ({
  type: DELETE_CART_ITEM,
  payload: { itemId, cart },
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

  if (res.ok) dispatch(actionDeleteCart(cart.business.id));
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

  if (res.ok) dispatch(actionEditCartItem(resBody));
  return resBody;
};

export const thunkDeleteCartItem = (cartItem) => async (dispatch) => {
  const res = await fetch(
    `/api/carts/${cartItem.cartId}/items/${cartItem.id}/delete`,
    {
      method: "delete",
    }
  );
  const resBody = await res.json();

  if (res.ok) {
    if (resBody.message) dispatch(actionDeleteCart(cartItem.businessId));
    else dispatch(actionDeleteCartItem(cartItem.item.id, resBody.cart));
  }
  return resBody;
};

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CARTS: {
      return { ...action.payload };
    }
    case ADD_TO_CART: {
      return { ...state, [action.payload.business.id]: { ...action.payload } };
    }
    case DELETE_CART: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    case EDIT_CART_ITEM: {
      const { cartItem, cart } = action.payload;
      const newState = { ...state };
      const newCart = { ...newState[cartItem.item.businessId], ...cart };
      newCart.cartItems = {
        ...newCart.cartItems,
        [cartItem.item.id]: { ...cartItem },
      };
      newState[cartItem.item.businessId] = newCart;
      return newState;
    }
    case DELETE_CART_ITEM: {
      const { itemId, cart } = action.payload;
      const newState = { ...state };
      newState[cart.businessId] = {
        ...newState[cart.businessId],
        ...cart,
      };
      delete newState[cart.businessId].cartItems[itemId];
      return newState;
    }
    default:
      return state;
  }
}
