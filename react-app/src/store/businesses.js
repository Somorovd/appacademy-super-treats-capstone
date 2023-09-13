import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllBusinesses = createAsyncThunk(
  "businesses/fetchAllBusinesses",
  async () => {
    const res = await fetch("/api/businesses/all");
    const resBody = await res.json();
    return resBody;
  }
);

export const thunkGetOneBusiness = (businessId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/businesses/${businessId}`);
    const resBody = await res.json();
    if (res.ok) dispatch(getOneBusiness(resBody.business));
    return resBody;
  } catch (e) {
    return { errors: e };
  }
};

const initialState = {
  allBusinesses: {},
  singleBusiness: {},
  filters: {},
  order: {
    default: [],
    active: "default",
  },
  status: "idle",
  error: null,
};

export const businessSlice = createSlice({
  name: "businesses",
  initialState,
  reducers: {
    getOneBusiness: (state, action) => {
      state.singleBusiness = action.payload;
      state.singleBusiness.items = Object.keys(action.payload);
    },
    changeOrder: (state, action) => {
      const { name, property, desc } = action.payload;
      if (!state.order[name]) {
        state.order[name] = Object.values(state.allBusinesses)
          .sort((a, b) => {
            return (property(a) < property(b) ? -1 : 1) * (desc ? -1 : 1);
          })
          .map((b) => `${b.id}`);
      }
      state.order.active = name;
    },
    changeFilter: (state, action) => {
      console.log(action);
      const { name, value, validate } = action.payload;
      state.filters[name] = { value, validate };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllBusinesses.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllBusinesses.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { businesses } = action.payload;
        state.allBusinesses = businesses;
        state.order.default = Object.keys(businesses);
      })
      .addCase(fetchAllBusinesses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const { getAllBusinesses, getOneBusiness, changeOrder, changeFilter } =
  businessSlice.actions;

export const selectAllBusinesses = (state) => state.businesses.allBusinesses;
export const selectBusinessStatus = (state) => state.businesses.status;
export const selectBusinessFilters = (state) => state.businesses.filters;
export const selectActiveOrder = (state) =>
  state.businesses.order[state.businesses.order.active];

export default businessSlice.reducer;
