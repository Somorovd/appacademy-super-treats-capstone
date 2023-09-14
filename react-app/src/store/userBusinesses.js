import { deleteReq, postReq, putReq } from "./utils";

import { createSlice } from "@reduxjs/toolkit";
import { resetAll } from "./utils";

const CREATE_CATEGORY = "userBusinesses/CREATE_CATEGORY";
const EDIT_CATEGORY = "userBusinesses/EDIT_CATEGORY";
const REORDER_CATEGORIES = "userBusinesses/REORDER_CATEGORIES";
const DELETE_CATEGORY = "userBusinesses/DELETE_CATEGORY";

const actionCreateCategory = (category) => ({
  type: CREATE_CATEGORY,
  payload: category,
});

const actionEditCategory = (category) => ({
  type: EDIT_CATEGORY,
  payload: category,
});

const actionReorderCategories = (order) => ({
  type: REORDER_CATEGORIES,
  payload: order,
});

const actionDeleteCategory = (categoryId) => ({
  type: DELETE_CATEGORY,
  payload: categoryId,
});

export const thunkGetAllBusinesses = () => async (dispatch) => {
  const res = await fetch("/api/user_businesses/all");
  const resBody = await res.json();
  if (res.ok) dispatch(getAllBusinesses(resBody.businesses));
  return resBody;
};

export const thunkGetOneBusiness = (businessId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/user_businesses/${businessId}`);
    const resBody = await res.json();
    if (res.ok) dispatch(getOneBusiness(resBody.business));
    return resBody;
  } catch (e) {
    return { errors: e };
  }
};

export const thunkCreateBusiness = (business) => async (dispatch) => {
  const res = await postReq("/api/user_businesses/new", business);
  const resBody = await res.json();
  if (res.ok) dispatch(createBusiness(resBody.business));
  return resBody;
};

export const thunkEditBusiness = (business) => async (dispatch) => {
  const url = `/api/user_businesses/${business.get("id")}/edit`;
  const res = await putReq(url, business);
  const resBody = await res.json();
  if (res.ok) dispatch(editBusiness(resBody.business));
  return resBody;
};

export const thunkDeleteBusiness = (businessId) => async (dispatch) => {
  const url = `/api/user_businesses/${businessId}/delete`;
  const res = await deleteReq(url);
  const resBody = await res.json();
  if (res.ok) dispatch(deleteBusiness(businessId));
  return resBody;
};

export const thunkCreateCategory = (category) => async (dispatch) => {
  const res = await postReq(`/api/categories/new`, category);
  const resBody = await res.json();
  if (res.ok) dispatch(actionCreateCategory(resBody.category));
  return resBody;
};

export const thunkEditCategory = (category) => async (dispatch) => {
  const url = `/api/categories/${category.id}/edit`;
  const res = await putReq(url, category);
  const resBody = await res.json();
  if (res.ok) dispatch(actionEditCategory(resBody.category));
  return resBody;
};

export const thunkReorderCategories = (order) => async (dispatch) => {
  const res = await putReq(`/api/categories/reorder`, order);
  const resBody = await res.json();
  if (res.ok) dispatch(actionReorderCategories(order.categories));
  return resBody;
};

export const thunkDeleteCategory = (categoryId) => async (dispatch) => {
  const res = await deleteReq(`/api/categories/${categoryId}/delete`);
  const resBody = await res.json();
  if (res.ok) dispatch(actionDeleteCategory(categoryId));
  return resBody;
};

const initialState = { allBusinesses: {}, singleBusiness: {} };

export const userBusinessSlice = createSlice({
  name: "userBusinesses",
  initialState,
  reducers: {
    getAllBusinesses: (state, action) => {
      state.allBusinesses = action.payload;
    },
    getOneBusiness: (state, action) => {
      state.singleBusiness = action.payload;
      state.singleBusiness.items = Object.keys(action.payload);
    },
    createBusiness: (state, action) => {
      state.allBusinesses[action.payload.id] = action.payload;
      state.singleBusiness = action.payload;
      state.singleBusiness.items = [];
    },
    editBusiness: (state, action) => {
      state.allBusinesses[action.payload.id] = action.payload;
      const items = state.singleBusiness[action.payload.id].items;
      state.singleBusiness = action.payload;
      state.singleBusiness.items = items;
    },
    deleteBusiness: (state, action) => {
      delete state.allBusinesses[action.payload.id];
      if (state.singleBusiness.id === action.payload.id) {
        state.singleBusiness = {};
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(resetAll, () => initialState);
  },
});

export const {
  getAllBusinesses,
  getOneBusiness,
  createBusiness,
  editBusiness,
  deleteBusiness,
} = userBusinessSlice.actions;

export default userBusinessSlice.reducer;

// export default function reducer(state = initialState, action) {
//   const newState = { ...state };
//   switch (action.type) {
//     case CREATE_CATEGORY: {
//       const categories = {
//         ...newState.singleBusiness.categories,
//         [action.payload.id]: action.payload,
//       };
//       newState.singleBusiness = { ...newState.singleBusiness, categories };
//       return newState;
//     }
//     case EDIT_CATEGORY: {
//       const categories = {
//         ...newState.singleBusiness.categories,
//         [action.payload.id]: action.payload,
//       };
//       newState.singleBusiness = { ...newState.singleBusiness, categories };
//       return newState;
//     }
//     case REORDER_CATEGORIES: {
//       const categories = {
//         ...newState.singleBusiness.categories,
//       };
//       for (let [id, order] of Object.entries(action.payload)) {
//         categories[id] = { ...categories[id], order };
//       }
//       newState.singleBusiness = { ...newState.singleBusiness, categories };
//       return newState;
//     }
//     case DELETE_CATEGORY: {
//       const categories = { ...newState.singleBusiness.categories };
//       delete categories[action.payload];
//       newState.singleBusiness = { ...newState.singleBusiness, categories };
//       return newState;
//     }
//     default:
//       return state;
//   }
// }
