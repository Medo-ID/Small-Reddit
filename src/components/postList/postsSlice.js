import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (subreddit, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            return data.data.children.map((child) => child.data);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const getPostsBySearchTerm = createAsyncThunk(
    'posts/getPostsBySearchTerm',
    async (term, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://www.reddit.com/search.json?q=${encodeURIComponent(term)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            return data.data.children.map((child) => child.data);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getPosts.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.isLoading = false;
            state.error = null;
        })
        .addCase(getPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'Failed to load posts';
        })
        .addCase(getPostsBySearchTerm.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getPostsBySearchTerm.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.isLoading = false;
            state.error = null;
        })
        .addCase(getPostsBySearchTerm.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'No posts matching the search query';
        })
    }
})

export default postsSlice.reducer;