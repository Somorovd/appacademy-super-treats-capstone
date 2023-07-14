const GET_ONE_ITEM = "items/GET_ONE_ITEM";
const CREATE_ITEM = "items/CREATE_ITEM";
const DELETE_ITEM = "items/DELETE_ITEM";
const GET_ONE_BUSINESS = "userBusinesses/GET_ONE_BUSINESSES";

const actionGetOneItem = (item) => ({
  type: GET_ONE_ITEM,
  payload: item,
});

const actionCreateItem = (item) => ({
  type: CREATE_ITEM,
  payload: item,
});

const actionDeleteItem = (itemId) => ({
  type: DELETE_ITEM,
  payload: itemId,
});

export const thunkGetOneItem = (itemId) => async (dispatch) => {
  const res = await fetch(`/api/items/${itemId}`);
  const resBody = await res.json();

  if (res.ok) dispatch(actionGetOneItem(resBody.item));

  return resBody;
};

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

export const thunkDeleteItem = (itemId) => async (dispatch) => {
  const res = await fetch(`/api/items/${itemId}/delete`, {
    method: "delete",
  });
  const resBody = await res.json();

  if (res.ok) dispatch(actionCreateItem(itemId));

  return resBody;
};

const initialState = {
  allItems: {},
  singleItem: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ONE_ITEM: {
      state.singleItem = { ...action.payload };
      return state;
    }
    case CREATE_ITEM: {
      const allItems = {
        ...state.allItems,
        [action.payload.id]: { ...action.payload },
      };
      state.allItems = allItems;
      state.singleItem = { ...action.payload };
      return state;
    }
    case DELETE_ITEM: {
      const allItems = { ...state.allItems };
      delete allItems[action.payload.id];
      state.allItems = allItems;
      state.singleItem = {};
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
