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

export const getPostComments = createAsyncThunk(
    'posts/getPostComments',
    async ({ postId, subreddit }, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://www.reddit.com/r/${subreddit}/comments/${postId}.json`) // const response = await fetch(`https://www.reddit.com/comments/${postId}.json`);
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
            const data = await response.json()
            const comments = data[1].data.children.map(comment => comment.data);
            return { postId, comments }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const getPostsBySearchTerm = createAsyncThunk(
    'posts/getPostsBySearchTerm',
    async (term, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://www.reddit.com/search.json?q=${encodeURIComponent(term)}`)
            if (!response.ok) {
                throw new Error('Failed to fetch posts')
            }
            const data = await response.json()
            return data.data.children.map((child) => child.data)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        commentsByPostId: {},
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getPosts.pending, (state) => { // Handle posts
            state.isLoading = true
            state.error = null
        })
        .addCase(getPosts.fulfilled, (state, action) => {
            state.posts = action.payload
            state.isLoading = false
            state.error = null
        })
        .addCase(getPosts.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload || 'Failed to load posts'
        })
        .addCase(getPostComments.pending, (state) => { // Handle comments
            state.isLoading = true
            state.error = null
        })
        .addCase(getPostComments.fulfilled, (state, action) => {
            const { postId, comments } = action.payload;
            state.commentsByPostId[postId] = comments;  // Associate comments with specific post ID
            state.isLoading = false
            state.error = null
        })
        .addCase(getPostComments.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload || 'Failed to load comments'
        })
        .addCase(getPostsBySearchTerm.pending, (state) => { // Handle search query
            state.isLoading = true
            state.error = null
        })
        .addCase(getPostsBySearchTerm.fulfilled, (state, action) => {
            state.posts = action.payload
            state.isLoading = false
            state.error = null
        })
        .addCase(getPostsBySearchTerm.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload || 'No posts matching the search query'
        })
    }
})

export default postsSlice.reducer