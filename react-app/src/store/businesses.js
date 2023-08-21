const GET_ALL_BUSINESSES = "businesses/GET_ALL_BUSINESSES";
const GET_ONE_BUSINESS = "businesses/GET_ONE_BUSINESS";
const CREATE_BUSINESS = "businesses/CREATE_BUSINESS";
const DELETE_BUSINESS = "businesses/DELETE_BUSINESS";
const CHANGE_ORDER = "business/CHANGE_ORDER";

const actionGetAllBusinesses = (businesses) => ({
  type: GET_ALL_BUSINESSES,
  payload: businesses,
});

const actionGetOneBusiness = (business) => ({
  type: GET_ONE_BUSINESS,
  payload: business,
});

export const actionChangeOrder = (name, property, desc) => ({
  type: CHANGE_ORDER,
  payload: { name, property, desc },
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
  filters: {
    default: new Set(),
    active: new Set(),
  },
  order: {
    default: [],
    active: "default",
  },
};

export default function reducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case GET_ALL_BUSINESSES: {
      const allBusinesses = action.payload;
      newState.allBusinesses = allBusinesses;
      newState.filters.default = new Set(Object.keys(newState.allBusinesses));
      newState.filters.active = new Set(["default"]);
      newState.order.default = Object.keys(newState.allBusinesses);
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
    case CHANGE_ORDER: {
      const { name, property, desc } = action.payload;
      if (!newState.order[name]) {
        const businesses = Object.values(newState.allBusinesses);
        businesses.sort((a, b) => {
          return (property(a) < property(b) ? -1 : 1) * (desc ? -1 : 1);
        });
        newState.order[name] = businesses.map((b) => `${b.id}`);
      }
      newState.order.active = name;
      return newState;
    }
    default:
      return state;
  }
}
