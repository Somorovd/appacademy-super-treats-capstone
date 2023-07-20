const GET_ALL_BUSINESSES = "businesses/GET_ALL_BUSINESSES";
const GET_ONE_BUSINESS = "businesses/GET_ONE_BUSINESS";
const CREATE_BUSINESS = "businesses/CREATE_BUSINESS";
const DELETE_BUSINESS = "businesses/DELETE_BUSINESS";

const actionGetAllBusinesses = (businesses) => ({
  type: GET_ALL_BUSINESSES,
  payload: businesses,
});

const actionGetOneBusiness = (business) => ({
  type: GET_ONE_BUSINESS,
  payload: business,
});

export const thunkGetAllBusinesses = () => async (dispatch) => {
  const res = await fetch("/api/businesses/all");
  const resBody = await res.json();

  if (res.ok) dispatch(actionGetAllBusinesses(resBody.businesses));
  return resBody;
};

export const thunkGetOneBusiness = (businessId) => async (dispatch) => {
  const res = await fetch(`/api/businesses/${businessId}`);
  const resBody = await res.json();

  if (res.ok) dispatch(actionGetOneBusiness(resBody.business));
  return resBody;
};

const initialState = {
  allBusinesses: {},
  singleBusiness: {},
};

export default function reducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case GET_ALL_BUSINESSES: {
      const allBusinesses = action.payload;
      newState.allBusinesses = allBusinesses;
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
      return newState;
    }
    default:
      return state;
  }
}
