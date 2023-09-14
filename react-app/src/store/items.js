import { deleteReq, postReq, putReq } from "./utils";

import { addToCart } from "./carts";
import { createSlice } from "@reduxjs/toolkit";
import { getOneBusiness } from "./businesses";
import { getOneBusiness as getOneUserBusiness } from "./userBusinesses";

export const thunkGetOneItem = (itemId) => async (dispatch) => {
  const res = await fetch(`/api/items/${itemId}`);
  const resBody = await res.json();
  if (res.ok) dispatch(getOneItem(resBody.item));
  return resBody;
};

export const thunkCreateItem = (item) => async (dispatch) => {
  const res = await postReq("/api/items/new", item);
  const resBody = await res.json();
  if (res.ok) dispatch(createItem(resBody.item));
  return resBody;
};

export const thunkUpdateItem = (item) => async (dispatch) => {
  const url = `/api/items/${item.get("id")}/edit`;
  const res = await putReq(url, item);
  const resBody = await res.json();
  if (res.ok) dispatch(updateItem(resBody.item));
  return resBody;
};

export const thunkDeleteItem = (itemId) => async (dispatch) => {
  const res = await deleteReq(`/api/items/${itemId}/delete`);
  const resBody = await res.json();
  if (res.ok) dispatch(deleteItem({ id: itemId }));
  return resBody;
};

const initialState = {
  allItems: {},
  singleItem: {},
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    getOneItem: (state, action) => {
      state.singleItem = action.payload;
    },
    createItem: (state, action) => {
      state.allItems[action.payload.id] = action.payload;
      state.singleItem = action.payload;
    },
    updateItem: (state, action) => {
      state.allItems[action.payload.id] = action.payload;
      state.singleItem = action.payload;
    },
    deleteItem: (state, action) => {
      delete state.allItems[action.payload.id];
      if (state.singleItem.id === action.payload.id) {
        state.singleItem = {};
      }
    },
    getCartItems: (state, action) => {
      state.allItems = { ...state.allItems, ...action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getOneBusiness, (state, action) => {
        const { items } = action.payload;
        state.allItems = { ...state.allItems, ...items };
      })
      .addCase(getOneUserBusiness, (state, action) => {
        const { items } = action.payload;
        state.allItems = items;
      })
      .addCase(addToCart, (state, action) => {
        const { itemId, createItemId } = action.payload;
        state.allItems[itemId].createItemId = createItemId;
      });
  },
});

export const { getOneItem, createItem, updateItem, deleteItem, getCartItems } =
  itemsSlice.actions;

export default itemsSlice.reducer;
