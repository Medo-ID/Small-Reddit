import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostComments, getPosts, getPostsBySearchTerm, toggleShowingComments } from "./postsSlice";
import PostItem from "../postItem/PostItem";
import LoadingSkeleton from "../loadingSkeleton/LoadingSkeleton";

function PostList() {
    const dispatch = useDispatch();
    const { posts, isLoading, error } = useSelector((state) => state.posts);
    const { searchTerm } = useSelector((state) => state.search)

    useEffect(() => {
        if (searchTerm){
            dispatch(getPostsBySearchTerm(searchTerm)); // Fetch posts by search term
        } else if (!posts.length){
            dispatch(getPosts('Home')); // Fetch front-page posts on initial load
        }
    }, [searchTerm, dispatch, posts.length]);

    const onToggleComments = (index, permalink) => {
        // Don't re-fetch comments if already exist
        if (posts[index].comments.length === 0) {
            dispatch(getPostComments({ index, permalink }))
        }
        // Toggle the visibilty
        dispatch(toggleShowingComments(index));
    }

    if (isLoading) {
        return (
            <main className="flex flex-col gap-4 basis-3/4 bg-neutral-700 w-full md:h-screen p-1 md:p-2 md:mx-0 md:my-4 md:rounded-md overflow-y-auto">
                {Array(6).fill().map((_, index) => (
                    <LoadingSkeleton key={index} type="post" />
                ))}
            </main>
        )
    }

    if (error) {
        return (
            <main className="mt-20 text-center flex flex-col gap-4 basis-3/4 bg-neutral-700 w-full md:h-screen p-1 md:p-2 md:mx-0 md:my-4 md:rounded-md overflow-y-auto">
                <p>Error Loading Posts: {error}</p>
                <button
                    type="button"
                    onClick={() => dispatch(getPosts('Home'))}
                >
                    Try again
                </button>
            </main> 
        )
    }

    if (posts.length === 0) {
        return (
            <main className="mt-20 text-center flex flex-col gap-4 basis-3/4 bg-neutral-700 w-full md:h-screen p-1 md:p-2 md:mx-0 md:my-4 md:rounded-md overflow-y-auto">
                <h2>No posts matching: {searchTerm}</h2>
                <button type="button" onClick={() => dispatch(getPosts('Home'))}>
                    Go home
                </button>
            </main>
        )
    }
    
    return (
        <main className="mt-20 flex flex-col gap-4 basis-3/4 bg-neutral-700 w-full md:h-screen p-1 md:p-2 md:mx-0 md:my-4 md:rounded-md overflow-y-auto">
            {posts.map((post, index) => (
                <PostItem 
                    key={post.id} 
                    post={post}
                    onToggleComments={() => onToggleComments(index, post.permalink)}
                />
            ))}
        </main>
    );
}

export default PostList;


