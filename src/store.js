import { configureStore } from "@reduxjs/toolkit";
import postsReducer from './components/postList/postsSlice';
import categoriesReducer from './components/categoryFilter/categoriesSlice';
import searchReducer from './components/searchBar/searchSlice';

const store = configureStore({
    reducer: {
        posts: postsReducer,
        categories: categoriesReducer,
        search: searchReducer
    }
});

export default store;