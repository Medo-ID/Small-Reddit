import { configureStore } from "@reduxjs/toolkit"
import postsReducer from './components/postList/postsSlice'
import categoriesReducer from './components/categoryFilter/categoriesSlice'
import searchReducer from './components/searchBar/searchSlice'
import rateLimitReducer from './components/rateLimitPopup/rateLimitPopupSlice'

const store = configureStore({
    reducer: {
        posts: postsReducer,
        categories: categoriesReducer,
        search: searchReducer,
        rateLimit: rateLimitReducer
    }
});

export default store;