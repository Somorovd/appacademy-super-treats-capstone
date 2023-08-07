const GET_ALL_CARTS = "carts/GET_ALL_CARTS";
const ADD_TO_CART = "carts/ADD_TO_CART";
const DELETE_CART = "carts/DELETE_CART";
const DELETE_CART_ITEM = "carts/DELETE_CART_ITEM";
const EDIT_CART_ITEM = "carts/EDIT_CART_ITEM";
const GET_CART_ITEMS = "carts/GET_CART_ITEMS";

const actionGetAllCarts = (carts) => ({
  type: GET_ALL_CARTS,
  payload: carts,
});

const actionAddToCart = (cart, cartItemId, itemId) => ({
  type: ADD_TO_CART,
  payload: { cart, cartItemId, itemId },
});

const actionDeleteCart = (businessId) => ({
  type: DELETE_CART,
  payload: businessId,
});

const actionEditCartItem = ({ cartItem, cart }) => ({
  type: EDIT_CART_ITEM,
  payload: { cartItem, cart },
});

const actionDeleteCartItem = (cartItemId, cart) => ({
  type: DELETE_CART_ITEM,
  payload: { cartItemId, cart },
});

const actionGetCartItems = (items) => ({
  type: GET_CART_ITEMS,
  payload: items,
});

export const thunkGetAllCarts = () => async (dispatch) => {
  const res = await fetch("/api/carts/current");
  const resBody = await res.json();

  if (res.ok) {
    dispatch(actionGetAllCarts(resBody.carts));
    dispatch(actionGetCartItems(resBody.items));
  }
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

  if (res.ok)
    dispatch(actionAddToCart(resBody.cart, resBody.cartItemId, item.id));
  return resBody;
};

export const thunkDeleteCart = (cart) => async (dispatch) => {
  const res = await fetch(`/api/carts/${cart.id}/delete`, {
    method: "delete",
  });
  const resBody = await res.json();

  if (res.ok) dispatch(actionDeleteCart(cart.businessId));
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
    else dispatch(actionDeleteCartItem(cartItem.id, resBody.cart));
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
      const { cart } = action.payload;
      return { ...state, [cart.businessId]: { ...cart } };
    }
    case DELETE_CART: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    case EDIT_CART_ITEM: {
      const { cartItem, cart } = action.payload;
      const newState = { ...state };
      const newCart = { ...newState[cart.businessId], ...cart };
      newCart.cartItems = {
        ...newCart.cartItems,
        [cartItem.id]: { ...cartItem },
      };
      newState[cart.businessId] = newCart;
      return newState;
    }
    case DELETE_CART_ITEM: {
      const { cartItemId, cart } = action.payload;
      const newState = { ...state };
      newState[cart.businessId] = {
        ...newState[cart.businessId],
        ...cart,
      };
      delete newState[cart.businessId].cartItems[cartItemId];
      return newState;
    }
    default:
      return state;
  }
}
