import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isRateLimited, registerApiCall } from "../../utils/apiCallTimestamps";
import { showRateLimitNotification } from "../rateLimitPopup/rateLimitPopupSlice";

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (subreddit, { dispatch, rejectWithValue }) => {
        if (isRateLimited()){
            // Dispatch an action to show a pop up
            dispatch(showRateLimitNotification())
            return rejectWithValue('Rate limit exceeded!')
        }

        try {
            const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();

            // Register the API call after successful request
            registerApiCall()
            return data.data.children.map((child) => child.data);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const getPostComments = createAsyncThunk(
    'posts/getPostComments',
    async ({index, permalink}, { dispatch, rejectWithValue }) => {
        if (isRateLimited()){
            // Dispatch an action to show a pop up
            dispatch(showRateLimitNotification())
            return rejectWithValue('Rate limit exceeded!')
        }

        try {
            const response = await fetch(`https://www.reddit.com/${permalink}.json`)
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
            const data = await response.json()
            const comments = data[1].data.children.map((child) => child.data)
            
            // Register the API call after successful request
            registerApiCall()
            return {index, comments}
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const getPostsBySearchTerm = createAsyncThunk(
    'posts/getPostsBySearchTerm',
    async (term, { dispatch, rejectWithValue }) => {
        if (isRateLimited()){
            // Dispatch an action to show a pop up
            dispatch(showRateLimitNotification())
            return rejectWithValue('Rate limit exceeded!')
        }

        try {
            const response = await fetch(`https://www.reddit.com/search.json?q=${encodeURIComponent(term)}`)
            if (!response.ok) {
                throw new Error('Failed to fetch posts')
            }
            const data = await response.json()

            // Register the API call after successful request
            registerApiCall()
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
        isLoading: false,
        error: null,
    },
    reducers: {
        toggleShowingComments(state, action) {
            state.posts[action.payload].showingComments = !state.posts[action.payload].showingComments
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getPosts.pending, (state) => { // Handle posts
            state.isLoading = true
            state.error = null
        })
        .addCase(getPosts.fulfilled, (state, action) => {
            state.posts = action.payload.map((post) => ({
                ...post,
                showingComments: false,
                comments: [],
                loadingComments: false,
                errorComments: false
            }));
            state.isLoading = false
        })
        .addCase(getPosts.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || 'Failed to load posts'
        })
        .addCase(getPostComments.pending, (state, action) => { // Handle comments
            const post = state.posts[action.meta.arg.index]
            post.loadingComments = true
            post.errorComments = false
        })
        .addCase(getPostComments.fulfilled, (state, action) => {
            const post = state.posts[action.payload.index];
            post.loadingComments = false;
            post.showingComments = true;
            post.comments = action.payload.comments;        
        })
        .addCase(getPostComments.rejected, (state, action) => {
            const post = state.posts[action.meta.arg.index];
            post.loadingComments = false;
            post.errorComments = true;
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
            state.error = action.error.message || 'No posts matching the search query'
        })
    }
})

export const {toggleShowingComments} = postsSlice.actions
export default postsSlice.reducer