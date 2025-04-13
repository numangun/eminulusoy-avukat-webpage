import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { slugify } from "../../utils/slugify";

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

// Async thunk for fetching a single blog by id
export const fetchBlogById = createAsyncThunk(
  "blogs/fetchBlogById",
  async (id) => {
    const response = await axios.get(`http://localhost:3001/api/blogs/${id}`);
    return response.data;
  }
);

// Async thunk for creating a new blog
export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (blog, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/blogs",
        blog
      );
      return response.data;
    } catch (err) {
      if (err.response) {
        // Backend'den gelen hata mesajını göster
        return rejectWithValue(err.response.data.error || err.response.data);
      }
      return rejectWithValue("Blog eklenirken bir hata oluştu");
    }
  }
);

// Async thunk for updating a blog
export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ id, blog }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/blogs/${id}`,
        blog
      );
      return response.data;
    } catch (err) {
      if (err.response) {
        return rejectWithValue(err.response.data.error || err.response.data);
      }
      return rejectWithValue("Blog güncellenirken bir hata oluştu");
    }
  }
);

// Async thunk for deleting a blog
export const deleteBlog = createAsyncThunk("blogs/deleteBlog", async (id) => {
  await axios.delete(`http://localhost:3001/api/blogs/${id}`);
  return id;
});

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    selectedBlog: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.loading = false;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.selectedBlog = action.payload;
        state.loading = false;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
        state.loading = false;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.blogs.findIndex(
          (blog) => blog._id === action.payload._id
        );
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
        state.loading = false;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message;
          console.error("Redux error:", {
            payload: action.payload,
            error: action.error,
            type: action.type,
          });
        }
      );
  },
});

export default blogSlice.reducer;
