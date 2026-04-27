import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchPermissionsApi,
  fetchPermissionByIdApi,
  createPermissionApi,
  updatePermissionApi,
  deletePermissionApi,
} from "../services/apiCalls";

// 🔹 FETCH ALL PERMISSIONS
export const fetchPermissions = createAsyncThunk(
  "permissions/fetch",
  async (params, { rejectWithValue }) => {
    try {
      return await fetchPermissionsApi(params);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch permissions",
      );
    }
  },
);

// 🔹 FETCH SINGLE PERMISSION
export const fetchPermissionById = createAsyncThunk(
  "permissions/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      return await fetchPermissionByIdApi(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch permission",
      );
    }
  },
);

// 🔹 CREATE PERMISSION
export const createPermission = createAsyncThunk(
  "permissions/create",
  async (data, { rejectWithValue }) => {
    try {
      return await createPermissionApi(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create permission",
      );
    }
  },
);

// 🔹 UPDATE PERMISSION
export const updatePermission = createAsyncThunk(
  "permissions/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updatePermissionApi(id, data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update permission",
      );
    }
  },
);

// 🔹 DELETE PERMISSION
export const deletePermission = createAsyncThunk(
  "permissions/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deletePermissionApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete permission",
      );
    }
  },
);

const permissionSlice = createSlice({
  name: "permissions",
  initialState: {
    items: [],
    selectedPermission: null,
    loading: false,
    error: null,
    pagination: {},
  },
  reducers: {
    clearPermission: (state) => {
      state.selectedPermission = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 FETCH ALL
      .addCase(fetchPermissions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || action.payload;
        state.pagination = action.payload;
        state.error = null;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 FETCH BY ID
      .addCase(fetchPermissionById.fulfilled, (state, action) => {
        state.selectedPermission = action.payload;
      })

      // 🔹 CREATE
      .addCase(createPermission.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })

      // 🔹 UPDATE
      .addCase(updatePermission.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // 🔹 DELETE
      .addCase(deletePermission.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export const { clearPermission } = permissionSlice.actions;
export default permissionSlice.reducer;
