const GET_ALL_BUSINESSES = "userBusinesses/GET_ALL_BUSINESSES";
const GET_ONE_BUSINESS = "userBusinesses/GET_ONE_BUSINESSES";
const CREATE_BUSINESS = "businesses/CREATE_BUSINESS";
const EDIT_BUSINESS = "businesses/EDIT_BUSINESS";
const DELETE_BUSINESS = "businesses/DELETE_BUSINESS";
const CREATE_CATEGORY = "userBusinesses/CREATE_CATEGORY";
const EDIT_CATEGORY = "userBusinesses/EDIT_CATEGORY";
const REORDER_CATEGORIES = "userBusinesses/REORDER_CATEGORIES";
const DELETE_CATEGORY = "userBusinesses/DELETE_CATEGORY";

const actionGetAllBusinesses = (businesses) => ({
  type: GET_ALL_BUSINESSES,
  payload: businesses,
});

const actionGetOneBusiness = (business) => ({
  type: GET_ONE_BUSINESS,
  payload: business,
});

const actionCreateBusiness = (business) => ({
  type: CREATE_BUSINESS,
  payload: business,
});
const actionEditBusiness = (business) => ({
  type: EDIT_BUSINESS,
  payload: business,
});

const actionDeleteBusiness = (businessId) => ({
  type: DELETE_BUSINESS,
  payload: businessId,
});

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

  if (res.ok) dispatch(actionGetAllBusinesses(resBody.businesses));

  return resBody;
};

export const thunkGetOneBusiness = (businessId) => async (dispatch) => {
  const res = await fetch(`/api/user_businesses/${businessId}`);
  const resBody = await res.json();

  if (res.ok) {
    dispatch(actionGetOneBusiness(resBody.business));
  }
  return resBody;
};

export const thunkCreateBusiness = (business) => async (dispatch) => {
  const res = await fetch("/api/user_businesses/new", {
    method: "post",
    body: business,
  });
  const resBody = await res.json();

  if (res.ok) dispatch(actionCreateBusiness(resBody.business));
  return resBody;
};

export const thunkEditBusiness = (business) => async (dispatch) => {
  const res = await fetch(`/api/user_businesses/${business.get("id")}/edit`, {
    method: "put",
    body: business,
  });
  const resBody = await res.json();

  if (res.ok) dispatch(actionEditBusiness(resBody.business));
  return resBody;
};

export const thunkDeleteBusiness = (businessId) => async (dispatch) => {
  const res = await fetch(`/api/user_businesses/${businessId}/delete`, {
    method: "delete",
  });
  const resBody = await res.json();

  if (res.ok) dispatch(actionDeleteBusiness(businessId));
  return resBody;
};

export const thunkCreateCategory = (category) => async (dispatch) => {
  const res = await fetch(`/api/categories/new`, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(category),
  });
  const resBody = await res.json();

  if (res.ok) dispatch(actionCreateCategory(resBody.category));
  return resBody;
};

export const thunkEditCategory = (category) => async (dispatch) => {
  const res = await fetch(`/api/categories/${category.id}/edit`, {
    method: "put",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(category),
  });
  const resBody = await res.json();

  if (res.ok) dispatch(actionEditCategory(resBody.category));
  return resBody;
};

export const thunkReorderCategories = (order) => async (dispatch) => {
  const res = await fetch(`/api/categories/reorder`, {
    method: "put",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(order),
  });
  const resBody = await res.json();

  if (res.ok) dispatch(actionReorderCategories(order.categories));
  return resBody;
};

export const thunkDeleteCategory = (categoryId) => async (dispatch) => {
  const res = await fetch(`/api/categories/${categoryId}/delete`, {
    method: "delete",
  });
  const resBody = await res.json();

  if (res.ok) dispatch(actionDeleteCategory(categoryId));
  return resBody;
};

const initialState = { allBusinesses: {}, singleBusiness: {} };

export default function reducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case GET_ALL_BUSINESSES: {
      newState.allBusinesses = action.payload;
      return newState;
    }
    case GET_ONE_BUSINESS: {
      newState.singleBusiness = { ...action.payload };
      newState.singleBusiness.items = Object.keys(action.payload.items);
      return newState;
    }
    case CREATE_BUSINESS: {
      const allBusinesses = {
        ...state.allBusinesses,
        [action.payload.id]: { ...action.payload },
      };
      state.allBusinesses = allBusinesses;
      state.singleBusiness = { ...action.payload, items: [] };
      return state;
    }
    case EDIT_BUSINESS: {
      const allBusinesses = {
        ...state.allBusinesses,
        [action.payload.id]: { ...action.payload },
      };
      state.allBusinesses = allBusinesses;
      state.singleBusiness = {
        ...action.payload,
        items: state.singleBusiness.items,
      };
      return state;
    }
    case DELETE_BUSINESS: {
      const allBusinesses = { ...newState.allBusinesses };
      delete allBusinesses[action.payload.id];
      newState.allBusinesses = allBusinesses;
      newState.singleBusiness = {};
      return newState;
    }
    case CREATE_CATEGORY: {
      const categories = {
        ...newState.singleBusiness.categories,
        [action.payload.id]: action.payload,
      };
      newState.singleBusiness = { ...newState.singleBusiness, categories };
      return newState;
    }
    case EDIT_CATEGORY: {
      const categories = {
        ...newState.singleBusiness.categories,
        [action.payload.id]: action.payload,
      };
      newState.singleBusiness = { ...newState.singleBusiness, categories };
      return newState;
    }
    case REORDER_CATEGORIES: {
      const categories = {
        ...newState.singleBusiness.categories,
      };
      for (let [id, order] of Object.entries(action.payload)) {
        categories[id] = { ...categories[id], order };
      }
      newState.singleBusiness = { ...newState.singleBusiness, categories };
      return newState;
    }
    case DELETE_CATEGORY: {
      const categories = { ...newState.singleBusiness.categories };
      delete categories[action.payload];
      newState.singleBusiness = { ...newState.singleBusiness, categories };
      return newState;
    }
    default:
      return state;
  }
}
