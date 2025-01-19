import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching blogs (sadece aktif olanlar)
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const response = await axios.get("http://localhost:3001/api/blogs");
  return response.data;
});

// Async thunk for fetching all blogs (admin için)
export const fetchAllBlogs = createAsyncThunk(
  "blogs/fetchAllBlogs",
  async () => {
    const response = await axios.get("http://localhost:3001/api/admin/blogs");
    return response.data;
  }
);

// Async thunk for adding a blog
export const addBlog = createAsyncThunk("blogs/addBlog", async (blog) => {
  const response = await axios.post("http://localhost:3001/api/blogs", blog);
  return response.data;
});

// Async thunk for updating a blog
export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ id, blog }) => {
    const response = await axios.put(
      `http://localhost:3001/api/blogs/${id}`,
      blog
    );
    return response.data;
  }
);

// Async thunk for deleting a blog
export const deleteBlog = createAsyncThunk("blogs/deleteBlog", async (id) => {
  await axios.delete(`http://localhost:3001/api/blogs/${id}`);
  return id;
});

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.findIndex(
          (blog) => blog._id === action.payload._id
        );
        state[index] = action.payload;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        return state.filter((blog) => blog._id !== action.payload);
      });
  },
});

export default blogSlice.reducer;
