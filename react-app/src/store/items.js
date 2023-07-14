const CREATE_ITEM = "items/CREATE_ITEM";
const GET_ONE_ITEM = "items/GET_ONE_ITEM";
const GET_ONE_BUSINESS = "userBusinesses/GET_ONE_BUSINESSES";

const actionCreateItem = (item) => ({
  type: CREATE_ITEM,
  payload: item,
});

const actionGetOneItem = (item) => ({
  type: GET_ONE_ITEM,
  payload: item,
});

export const thunkCreateItem = (item) => async (dispatch) => {
  const res = await fetch("/api/items/new", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(item),
  });
  const resBody = await res.json();

  if (res.ok) dispatch(actionCreateItem(resBody.item));

  return resBody;
};

export const thunkGetOneItem = (itemId) => async (dispatch) => {
  const res = await fetch(`/api/items/${itemId}`);
  const resBody = await res.json();

  if (res.ok) dispatch(actionGetOneItem(resBody.item));

  return resBody;
};

const initialState = {
  allItems: {},
  singleItem: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ITEM: {
      const allItems = {
        ...state.allItems,
        [action.payload.id]: action.payload,
      };
      state.allItems = allItems;
      state.singleItem = action.payload;
      return state;
    }
    case GET_ONE_ITEM: {
      state.singleItem = action.payload;
      return state;
    }
    case GET_ONE_BUSINESS: {
      state.allItems = { ...action.payload.items };
      return state;
    }
    default:
      return state;
  }
}
