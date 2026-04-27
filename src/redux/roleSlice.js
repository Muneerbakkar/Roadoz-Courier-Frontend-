// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchRolesApi } from "../services/apiCalls";

// export const getRoles = createAsyncThunk("roles/get", async () => {
//   return await fetchRolesApi();
// });

// const roleSlice = createSlice({
//   name: "roles",
//   initialState: { items: [], loading: false },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getRoles.pending, (state) => { state.loading = true; })
//       .addCase(getRoles.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload.items;
//       });
//   }
// });
// export default roleSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchRolesApi,
  fetchRoleByIdApi,
  createRoleApi,
  updateRoleApi,
  deleteRoleApi,
} from "../services/apiCalls";

export const getRoles = createAsyncThunk("roles/get", async () => {
  return await fetchRolesApi();
});

// GET ALL ROLES
export const fetchRoles = createAsyncThunk(
  "roles/fetch",
  async (params, { rejectWithValue }) => {
    try {
      return await fetchRolesApi(params);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch roles",
      );
    }
  },
);

// GET SINGLE ROLE
export const fetchRoleById = createAsyncThunk(
  "roles/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      return await fetchRoleByIdApi(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch role",
      );
    }
  },
);

// CREATE ROLE
export const createRole = createAsyncThunk(
  "roles/create",
  async (data, { rejectWithValue }) => {
    try {
      return await createRoleApi(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create role",
      );
    }
  },
);

// UPDATE ROLE
export const updateRole = createAsyncThunk(
  "roles/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateRoleApi(id, data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update role",
      );
    }
  },
);

// DELETE ROLE
export const deleteRole = createAsyncThunk(
  "roles/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteRoleApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete role",
      );
    }
  },
);

const roleSlice = createSlice({
  name: "roles",
  initialState: {
    items: [],
    selectedRole: null,
    loading: false,
    error: null,
    pagination: {},
  },
  reducers: {
    clearRole: (state) => {
      state.selectedRole = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
      })

      // FETCH ROLES
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.pagination = action.payload;
        state.error = null;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH ROLE BY ID
      .addCase(fetchRoleById.fulfilled, (state, action) => {
        state.selectedRole = action.payload;
      })

      // CREATE ROLE
      .addCase(createRole.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })

      // UPDATE ROLE
      .addCase(updateRole.fulfilled, (state, action) => {
        const index = state.items.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // DELETE ROLE
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.items = state.items.filter((r) => r.id !== action.payload);
      });
  },
});

export const { clearRole } = roleSlice.actions;
export default roleSlice.reducer;
