const GET_ALL_BUSINESSES = "userBusinesses/GET_ALL_BUSINESSES";
const CREATE_BUSINESS = "businesses/CREATE_BUSINESS";

const actionGetAllBusinesses = (businesses) => ({
  type: GET_ALL_BUSINESSES,
  payload: businesses,
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

const initialState = { allBusinesses: {}, singleBusiness: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_BUSINESSES: {
      const allBusinesses = action.payload;
      state.allBusinesses = allBusinesses;
      return state;
    }
    case CREATE_BUSINESS:
      console.log("In user businesses");
      return state;
    default:
      return state;
  }
}
