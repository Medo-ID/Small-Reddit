import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSubreddits = createAsyncThunk(
    'categories/getSubreddits',
    async () => {
        const response = await fetch('https://www.reddit.com/subreddits/popular.json')
        const data = await response.json();
    
        // Extract the subreddit data
        return data.data.children.map((child) => child.data);
    }
)

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        subreddits: [],
        isLoading: false,
        error: null,
        activeCategory: null
    },
    reducers: {
        setActiveCategory: (state, action) => {
            state.activeCategory = action.payload;
        },
        clearActiveCategory: (state) => {
            state.activeCategory = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getSubreddits.pending, state => {
            state.isLoading = true
            state.error = null
        })
        .addCase(getSubreddits.fulfilled, (state, action) => {
            state.isLoading = false
            state.subreddits = action.payload
        })
        .addCase(getSubreddits.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    }
})

export const { setActiveCategory, clearActiveCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer