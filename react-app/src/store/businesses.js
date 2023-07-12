const GET_ALL_BUSINESSES = "businesses/GET_ALL_BUSINESSES";

const CREATE_BUSINESS = "businesses/CREATE_BUSINESS";

const actionGetAllBusinesses = (businesses) => ({
  type: GET_ALL_BUSINESSES,
  payload: businesses,
});
const actionCreateBusiness = (business) => ({
  type: CREATE_BUSINESS,
  payload: business,
});

export const thunkGetAllBusinesses = () => async (dispatch) => {
  const res = await fetch("/api/businesses/all");
  const resBody = await res.json();

  if (res.ok) {
    const businesses = {};
    for (let b of resBody.businesses) businesses[b.id] = b;
    dispatch(actionGetAllBusinesses(businesses));
  }
  return resBody;
};

export const thunkCreateBusiness = (business) => async (dispatch) => {
  console.log("CREATE THUNK", business);
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

const initialState = {
  allBusinesses: {},
  singleBusiness: {},
  userBusinesses: {
    allBusinesses: {},
    singleBusiness: {},
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_BUSINESSES: {
      const allBusinesses = action.payload;
      state.allBusinesses = allBusinesses;
      return state;
    }
    case CREATE_BUSINESS: {
      const allUserBusinesses = {
        ...state.userBusinesses.allBusinesses,
        [action.payload.id]: action.payload,
      };
      const allBusinesses = {
        ...state.allBusinesses,
        [action.payload.id]: action.payload,
      };
      const singleUserBusiness = {
        [action.payload.id]: action.payload,
      };
      const userBusinesses = { allUserBusinesses, singleUserBusiness };
      state.userBusinesses = userBusinesses;
      state.allBusinesses = allBusinesses;
      return state;
    }
    default:
      return state;
  }
}
