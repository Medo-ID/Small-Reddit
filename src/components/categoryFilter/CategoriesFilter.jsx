import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSubreddits, setActiveCategory } from "./categoriesSlice"
import { getPosts } from '../postList/postsSlice';
import LoadingSkeleton from "../loadingSkeleton/LoadingSkeleton";

function CategoriesFilter() {
    const dispatch = useDispatch()
    const { subreddits, isLoading, error, activeCategory } = useSelector((state) => state.categories)

    useEffect(() => {
        dispatch(getSubreddits())
    }, [dispatch])

    const handleSubredditClick = (subreddit) => {
        dispatch(getPosts(subreddit))
        dispatch(setActiveCategory(subreddit))
    };

    if (isLoading) {
        return (
            <aside className="fixed top-9 z-20 flex md:flex-col md:static basis-1/4 md:bg-neutral-700 w-full p-1 my-1 md:p-2 md:mx-0 md:my-4 md:rounded-md overflow-hidden">
                {Array(12).fill().map((_, index) => (
                    <LoadingSkeleton key={index} type="category" />
                ))}
            </aside>
        )
    }

    if (error) {
        return (
            <aside className="fixed top-9 z-20 md:static basis-1/4 md:bg-neutral-700 w-full p-1 my-1 md:p-2 md:mx-0 md:my-4 md:rounded-md overflow-hidden">
                <p>Error loading subreddits: {error}</p>
            </aside>
        )    
    }

    return (
        <aside className="fixed top-9 z-20 md:static basis-1/4 bg-neutral-900 md:bg-neutral-700 w-full p-1 my-1 md:p-2 md:mx-0 md:my-4 md:rounded-md overflow-hidden">
            <ul className="flex md:flex-col items-start gap-1 w-full overflow-x-auto">
                {subreddits.map((subreddit) => (
                    <li key={subreddit.id} className="w-full fade-in">
                        <button
                            className={`flex justify-start gap-2 w-full p-1 md:pl-2 md:py-2 font-semibold text-sm rounded-sm text-left transition-colors delay-120
                                ${
                                    activeCategory === subreddit.display_name
                                        ? 'bg-mainColor text-mainBg'
                                        : 'bg-neutral-700 md:bg-mainBg text-mainColor md:text-gray-400 hover:bg-mainColor hover:text-mainBg'
                                }`}
                            onClick={() => handleSubredditClick(subreddit.display_name)}
                        >
                            <div className="w-6 h-6">
                                <img className="rounded-full w-full h-full" src={subreddit.icon_img} alt="icon image of subreddit" />
                            </div>
                            {subreddit.display_name}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export default CategoriesFilter