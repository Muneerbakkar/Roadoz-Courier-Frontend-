import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPickupAddressApi,
  fetchPickupAddressesApi,
} from "../services/apiCalls";

// CREATE PICKUP ADDRESS
export const createPickupAddress = createAsyncThunk(
  "orders/createPickupAddress",
  async (data, { rejectWithValue }) => {
    try {
      return await createPickupAddressApi(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to create pickup address",
      );
    }
  },
);

// FETCH PICKUP ADDRESSES
export const fetchPickupAddresses = createAsyncThunk(
  "orders/fetchPickupAddresses",
  async (params, { rejectWithValue }) => {
    try {
      return await fetchPickupAddressesApi(params);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to fetch pickup addresses",
      );
    }
  },
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    pickupAddresses: [],
    selectedAddress: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
    clearSelectedAddress: (state) => {
      state.selectedAddress = null;
    },
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE PICKUP ADDRESS
      .addCase(createPickupAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPickupAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.pickupAddresses.unshift(action.payload);
        state.selectedAddress = action.payload;
        state.error = null;
      })
      .addCase(createPickupAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH PICKUP ADDRESSES
      .addCase(fetchPickupAddresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPickupAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.pickupAddresses = action.payload.items;
        state.total = action.payload.total;
        state.error = null;

        // auto select first address (optional)
        if (!state.selectedAddress && action.payload.items.length > 0) {
          state.selectedAddress = action.payload.items[0];
        }
      })
      .addCase(fetchPickupAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderError, clearSelectedAddress, setSelectedAddress } =
  orderSlice.actions;
export default orderSlice.reducer;
