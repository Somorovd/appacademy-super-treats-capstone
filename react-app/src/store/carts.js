import { deleteReq, postReq, putReq } from "./utils";

import { createSlice } from "@reduxjs/toolkit";
import { getCartItems } from "./items";

export const thunkGetAllCarts = () => async (dispatch) => {
  const res = await fetch("/api/carts/current");
  const resBody = await res.json();
  if (res.ok) {
    dispatch(getAllCarts(resBody.carts));
    dispatch(getCartItems(resBody.items));
  }
  return resBody;
};

export const thunkAddToCart = (item) => async (dispatch) => {
  const res = await postReq("/api/carts/add_item", item);
  const resBody = await res.json();
  if (res.ok) dispatch(addToCart(resBody.cart, resBody.cartItemId, item.id));
  return resBody;
};

export const thunkDeleteCart = (cart) => async (dispatch) => {
  const res = await deleteReq(`/api/carts/${cart.id}/delete`);
  const resBody = await res.json();
  if (res.ok) dispatch(deleteCart(cart.businessId));
  return resBody;
};

export const thunkEditCartItem = (cartItem) => async (dispatch) => {
  const url = `/api/carts/${cartItem.cartId}/items/${cartItem.id}/edit`;
  const res = await putReq(url, cartItem);
  const resBody = await res.json();
  if (res.ok) dispatch(editCartItem(resBody));
  return resBody;
};

export const thunkDeleteCartItem = (cartItem) => async (dispatch) => {
  const url = `/api/carts/${cartItem.cartId}/items/${cartItem.id}/delete`;
  const res = await deleteReq(url);
  const resBody = await res.json();
  if (res.ok) {
    if (resBody.message) dispatch(deleteCart(cartItem.businessId));
    else dispatch(deleteCartItem(cartItem.id, resBody.cart));
  }
  return resBody;
};

const initialState = {};

export const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    getAllCarts: (state, action) => {
      state = action.payload;
    },
    addToCart: (state, action) => {
      const { cart } = action.payload;
      state[cart.businessId] = cart;
    },
    deleteCart: (state, action) => {
      delete state[action.payload];
    },
    editCartItem: (state, action) => {
      const { cartItem, cart } = action.payload;
      state[cart.businessId] = { ...state[cart.businessId], ...cart };
      state[cart.businessId].cartItems[cartItem.id] = cartItem;
    },
    deleteCartItem: (state, action) => {
      const { cartItem, cart } = action.payload;
      state[cart.businessId] = { ...state[cart.businessId], ...cart };
      delete state[cart.businessId].cartItems[cartItem.id];
    },
  },
});

export const {
  getAllCarts,
  addToCart,
  deleteCart,
  editCartItem,
  deleteCartItem,
} = cartSlice.actions;

export default cartSlice.reducer;
