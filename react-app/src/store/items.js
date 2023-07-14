const CREATE_ITEM = "items/CREATE_ITEM";

const actionCreateItem = (item) => ({
  type: CREATE_ITEM,
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
    default:
      return state;
  }
}
