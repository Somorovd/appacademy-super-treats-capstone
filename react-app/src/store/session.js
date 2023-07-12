import { clearAll } from ".";

const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const SET_LOCATION = "session/SET_LOCATION";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const actionSetLocation = (address, delivery) => ({
  type: SET_LOCATION,
  payload: { address, delivery },
});

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const login = (credential, password) => async (dispatch) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      credential,
      password,
    }),
  });

  const resBody = await res.json();

  if (res.ok) dispatch(setUser(resBody));
  return resBody;
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(clearAll());
  }
};

export const signUp = (user) => async (dispatch) => {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const resBody = await res.json();

  if (res.ok) dispatch(setUser(resBody));
  return resBody;
};

export const validateEmail = (email) => async (_dispatch) => {
  const res = await fetch("/api/auth/validate_email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const resBody = await res.json();
  return resBody;
};

export const validatePhone = (phone) => async (_dispatch) => {
  const res = await fetch("/api/auth/validate_phone", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone }),
  });
  const resBody = await res.json();
  return resBody;
};

export const thunkSetLocation = (address, delivery) => async (dispatch) => {
  await dispatch(actionSetLocation(address, delivery));
};

const initialState = { user: null, address: null, delivery: "delivery" };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_LOCATION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
