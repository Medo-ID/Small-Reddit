import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getPostsBySearchTerm } from "./postsSlice";
import PostItem from "../postItem/PostItem";
import LoadingSkeleton from "../loadingSpinner/LoadingSpinner";

function PostList() {
    const dispatch = useDispatch();
    const { posts, isLoading, error } = useSelector((state) => state.posts);
    const { searchTerm } = useSelector((state) => state.search)

    // Fetch posts on initial load
    useEffect(() => {
        if (searchTerm){
            dispatch(getPostsBySearchTerm(searchTerm)); // Fetch posts by passing a searchTerm
        } else {
            dispatch(getPosts('Home')); // Fetch front-page posts by passing an empty string
        }
    }, [searchTerm, dispatch]);

    if (isLoading) {
        return (
            <main className="flex flex-col gap-4 basis-3/4 bg-neutral-700 w-full md:h-screen p-1 md:p-2 md:mx-0 md:my-4 md:rounded-md overflow-y-auto">
                <LoadingSkeleton type="post" />
                <LoadingSkeleton type="post" />
                <LoadingSkeleton type="post" />
            </main>
        )
    }

    if (error) {
        return <p>Error Loading Posts: {error}</p>;
    }
    
    return (
        <main className="flex flex-col gap-4 basis-3/4 bg-neutral-700 w-full md:h-screen p-1 md:p-2 md:mx-0 md:my-4 md:rounded-md overflow-y-auto">
            {posts.map(post => (
                <PostItem key={post.id} post={post} />
            ))}
        </main>
    );
}

export default PostList;
