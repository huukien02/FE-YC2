import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getDataBlog,
  userLogin,
  userRegister,
  getProfile,
  updateProfile,
  uploadAvatar,
  createBlogs,
  commentBlogs,
  handleReaction,
} from "./actions";

interface ApiState {
  dataBlogs: null | any;
  loading: boolean;
  error: null | string;
  dataLogin: null | any;
  dataRegister: null | any;
  dataProfile: null | any;
  dataEditProfile: null | any;
  dataUploadAvatar: null | any;
  dataCreateBlogs: null | any;
  dataCommentBlogs: null | any;
  dataReactionBlogs: null | any;
}

const initialState: ApiState = {
  dataBlogs: null,
  loading: false,
  error: null,
  dataLogin: null,
  dataRegister: null,
  dataProfile: null,
  dataEditProfile: null,
  dataUploadAvatar: null,
  dataCreateBlogs: null,
  dataCommentBlogs: null,
  dataReactionBlogs: null,
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    resetDataLogin: (state) => {
      state.dataLogin = null;
    },
    resetDataRegister: (state) => {
      state.dataRegister = null;
    },
    resetDataUploadAvatar: (state) => {
      state.dataUploadAvatar = null;
    },
    resetDataCreateBlogs: (state) => {
      state.dataCreateBlogs = null;
    },
    resetDataCommentBlogs: (state) => {
      state.dataCommentBlogs = null;
    },
    resetDataReactionBlogs: (state) => {
      state.dataReactionBlogs = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* Get Post */
      .addCase(getDataBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDataBlog.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.dataBlogs = action.payload;
      })
      .addCase(getDataBlog.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* Create Blogs */
      .addCase(createBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlogs.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.dataCreateBlogs = action.payload;
      })
      .addCase(createBlogs.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Comment Blogs */
      .addCase(commentBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(commentBlogs.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.dataCommentBlogs = action.payload;
      })
      .addCase(commentBlogs.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Login */
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.dataLogin = action.payload;
      })
      .addCase(userLogin.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Register */
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.dataRegister = action.payload;
      })
      .addCase(userRegister.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Get Profile */
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.dataProfile = action.payload;
      })
      .addCase(getProfile.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Update Profile */
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.dataEditProfile = action.payload;
      })
      .addCase(updateProfile.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Update Avatar User */
      .addCase(uploadAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.dataUploadAvatar = action.payload;
      })
      .addCase(uploadAvatar.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Reaction */
      .addCase(handleReaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        handleReaction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.dataReactionBlogs = action.payload;
        }
      )
      .addCase(handleReaction.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  resetError,
  resetDataLogin,
  resetDataRegister,
  resetDataUploadAvatar,
  resetDataCreateBlogs,
  resetDataCommentBlogs,
  resetDataReactionBlogs,
} = apiSlice.actions;
export default apiSlice.reducer;
