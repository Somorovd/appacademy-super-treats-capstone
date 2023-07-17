const GET_ALL_CARTS = "carts/GET_ALL_CARTS";

const actionGetAllCarts = (carts) => ({
  type: GET_ALL_CARTS,
  payload: carts,
});

export const thunkGetAllCarts = () => async (dispatch) => {
  const res = await fetch("/api/carts/current");
  const resBody = await res.json();

  if (res.ok) dispatch(actionGetAllCarts(resBody.carts));
  return resBody;
};

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CARTS: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
}
