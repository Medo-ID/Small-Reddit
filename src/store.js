import { configureStore } from "@reduxjs/toolkit";
import postsReducer from './components/postList/postsSlice'
import searchReducer from './components/searchBar/searchSlice'
import categoriesReducer from './components/categoryFilter/categoriesSlice'

const store = configureStore({
    reducer: {
        posts: postsReducer,
        search: searchReducer,
        categories: categoriesReducer
    }
})

export default store