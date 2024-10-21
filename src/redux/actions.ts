import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";

export const getDataBlog = createAsyncThunk<any>(
  "api/get-blogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<any[]>(
        `http://localhost:4000/blogs`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createBlogs = createAsyncThunk<
  any,
  { title: string; content: string; userId: string; image: any }
>(
  "api/create-blogs",
  async ({ title, content, userId, image }, { rejectWithValue }) => {
    // Tạo FormData để gửi file
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("userId", userId);
    if (image) {
      formData.append("image", image); // Thêm ảnh vào FormData
    }

    try {
      const response = await axiosInstance.post(
        "http://localhost:4000/blogs/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const commentBlogs = createAsyncThunk<
  any,
  { content: string; userId: string; blogId: any }
>(
  "api/comment-blogs",
  async ({ blogId, content, userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "http://localhost:4000/comments/create",
        {
          content,
          blogId,
          userId,
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const userLogin = createAsyncThunk<
  any,
  { username: string; password: string }
>("api/login/user", async ({ username, password }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`http://localhost:4000/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data);
  }
});

export const userRegister = createAsyncThunk<
  any,
  { email: string; username: string; password: string }
>(
  "api/create/user",
  async ({ email, username, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `http://localhost:4000/users/create`,
        {
          email,
          username,
          password,
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getProfile = createAsyncThunk<any, { userId: string }>(
  "api/get-profile/user",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `http://localhost:4000/users/${userId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateProfile = createAsyncThunk<
  any,
  { userId: string; username: string; email: string }
>(
  "api/update-profile/user",
  async ({ userId, username, email }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `http://localhost:4000/users/update`,
        {
          email,
          username,
          userId,
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const uploadAvatar = createAsyncThunk<
  any,
  { userId: string; avatar: any }
>(
  "api/upload-avatar-profile/user",
  async ({ userId, avatar }, { rejectWithValue }) => {
    // Tạo FormData để gửi file
    const formData = new FormData();
    formData.append("userId", userId); // Thêm ID người dùng
    formData.append("avatar", avatar); // Thêm file avatar

    try {
      const response = await axiosInstance.put(
        "http://localhost:4000/users/upload-avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const handleReaction = createAsyncThunk<
  any,
  { userId: number; blogId: number; type: string }
>("api/reaction/add", async ({ userId, blogId, type }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(
      `http://localhost:4000/reaction/add`,
      {
        userId,
        blogId,
        type,
      }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data);
  }
});
