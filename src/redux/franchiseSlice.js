import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  fetchFranchisesApi, 
  fetchFranchiseByIdApi, 
  createFranchiseApi, 
  deleteFranchiseApi,
  updateFranchiseApi 
} from "../services/apiCalls";

export const getFranchises = createAsyncThunk(
  "franchise/fetchAll", 
  async (params, { rejectWithValue }) => {
    try {
      return await fetchFranchisesApi(params);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch franchises");
    }
  }
);

export const getFranchiseById = createAsyncThunk(
  "franchise/fetchById", 
  async (id, { rejectWithValue }) => {
    try {
      return await fetchFranchiseByIdApi(id);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch franchise details");
    }
  }
);

export const createFranchise = createAsyncThunk(
  "franchise/create", 
  async (data, { rejectWithValue }) => {
    try {
      return await createFranchiseApi(data);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create franchise");
    }
  }
);

export const updateFranchise = createAsyncThunk(
  "franchise/update", 
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateFranchiseApi(id, data);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update franchise");
    }
  }
);

export const deleteFranchise = createAsyncThunk(
  "franchise/delete", 
  async (id, { rejectWithValue }) => {
    try {
      await deleteFranchiseApi(id);
      return id; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete franchise");
    }
  }
);

export const toggleFranchiseStatus = updateFranchise;

const franchiseSlice = createSlice({
  name: "franchise",
  initialState: {
    items: [],             
    selectedFranchise: null, 
    loading: false,        
    error: null,           
    pagination: {
      total: 0,
      page: 1,
      limit: 10,
      pages: 1
    }
  },
  reducers: {
    clearSelectedFranchise: (state) => {
      state.selectedFranchise = null;
    },
    resetError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(getFranchises.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFranchises.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || [];
        state.pagination = {
          total: action.payload.total || 0,
          page: action.payload.page || 1,
          limit: action.payload.limit || 10,
          pages: action.payload.pages || 1
        };
      })
      .addCase(getFranchises.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  
      .addCase(getFranchiseById.pending, (state) => {
        state.loading = true;
        state.selectedFranchise = null;
      })
      .addCase(getFranchiseById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedFranchise = action.payload;
      })
      .addCase(getFranchiseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
      .addCase(createFranchise.pending, (state) => {
        state.loading = true;
      })
      .addCase(createFranchise.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
        state.pagination.total += 1;
      })
      .addCase(createFranchise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    
      .addCase(updateFranchise.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFranchise.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedFranchise?.id === action.payload.id) {
          state.selectedFranchise = action.payload;
        }
      })
      .addCase(updateFranchise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    
      .addCase(deleteFranchise.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        state.pagination.total -= 1;
      });
  },
});

export const { clearSelectedFranchise, resetError } = franchiseSlice.actions;
export default franchiseSlice.reducer;