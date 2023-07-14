const GET_ALL_BUSINESSES = "userBusinesses/GET_ALL_BUSINESSES";
const GET_ONE_BUSINESS = "userBusinesses/GET_ONE_BUSINESSES";
const CREATE_BUSINESS = "businesses/CREATE_BUSINESS";
const EDIT_BUSINESS = "businesses/EDIT_BUSINESS";
const DELETE_BUSINESS = "businesses/DELETE_BUSINESS";

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

export const thunkGetAllBusinesses = () => async (dispatch) => {
  const res = await fetch("/api/user_businesses/all");
  const resBody = await res.json();

  if (res.ok) {
    const businesses = {};
    for (let b of resBody.businesses) businesses[b.id] = b;
    dispatch(actionGetAllBusinesses(businesses));
  }
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
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(business),
  });
  const resBody = await res.json();

  if (res.ok) dispatch(actionCreateBusiness(resBody.business));
  return resBody;
};

export const thunkEditBusiness = (business) => async (dispatch) => {
  const res = await fetch(`/api/user_businesses/${business.id}/edit`, {
    method: "put",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(business),
  });
  const resBody = await res.json();

  // create action intentional
  if (res.ok) dispatch(actionCreateBusiness(resBody.business));
  return resBody;
};

export const thunkDeleteBusiness = (businessId) => async (dispatch) => {
  const res = await fetch(`/api/user_businesses/${businessId}/delete`, {
    method: "delete",
  });
  const resBody = await res.json();

  if (res.ok) dispatch(actionDeleteBusiness(resBody.business));
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
        ...newState.allBusinesses,
        [action.payload.id]: action.payload,
      };
      newState.allBusinesses = allBusinesses;
      newState.singleBusiness = { ...action.payload };
      return newState;
    }
    case DELETE_BUSINESS: {
      const allBusinesses = { ...newState.allBusinesses };
      delete allBusinesses[action.payload.id];
      newState.allBusinesses = allBusinesses;
      newState.singleBusiness = {};
      return newState;
    }
    default:
      return state;
  }
}
