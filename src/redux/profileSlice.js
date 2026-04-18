import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProfileApi,
  getProfileImageApi,
  updateProfileApi,
  uploadProfileImageApi
} from "../services/apiCalls";

export const fetchProfile = createAsyncThunk(
  "profile/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const [profileData, imageData] = await Promise.all([
        getProfileApi(),
        getProfileImageApi()
      ]);

      return {
        ...profileData,
        profile_image: imageData?.profile_image || profileData.profile_image
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/update",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await updateProfileApi(userData);
      return response; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

export const uploadProfileImage = createAsyncThunk(
  "profile/uploadImage",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await uploadProfileImageApi(formData);
      return response; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Image upload failed");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProfile: (state) => {
      state.user = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
      })

      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        if (state.user) {
          state.user.profile_image = action.payload.profile_image;
        }
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;