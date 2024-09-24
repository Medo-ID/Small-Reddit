import { useDispatch, useSelector } from "react-redux"
import { setSearchTerm } from "./searchSlice";
import { clearActiveCategory } from "../categoryFilter/categoriesSlice";

function SearchBar() {
    const dispatch = useDispatch()
    const { searchTerm } = useSelector((state) => state.search)

    const onSearchChangeHandler = (e) => {
        dispatch(setSearchTerm(e.target.value));
        dispatch(clearActiveCategory())
    };

    console.log(searchTerm)

    return (
        <div className="flex justify-center items-center gap-0 md:gap-1">
            <input
                className="bg-mainBg px-2 py-1 md:px-4 md:py-1 text-mainColor h-8 rounded-md"
                id="search"
                type="text"
                value={searchTerm}
                onChange={onSearchChangeHandler}
                placeholder="Search Subreddits" 
            />
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-8 h-8 rounded-md bg-mainBg p-1"
            >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
        </div>
    )
}

export default SearchBar