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
  const newState = { ...state };
  switch (action.type) {
    case GET_ONE_ITEM: {
      newState.singleItem = { ...action.payload };
      return newState;
    }
    case CREATE_ITEM: {
      const allItems = {
        ...newState.allItems,
        [action.payload.id]: { ...action.payload },
      };
      newState.allItems = allItems;
      newState.singleItem = { ...action.payload };
      return newState;
    }
    case DELETE_ITEM: {
      const allItems = { ...newState.allItems };
      delete allItems[action.payload.id];
      newState.allItems = allItems;
      newState.singleItem = {};
      return newState;
    }
    case GET_ONE_BUSINESS: {
      newState.allItems = { ...action.payload.items };
      return newState;
    }
    default:
      return state;
  }
}
