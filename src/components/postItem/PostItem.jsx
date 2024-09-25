import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns'; // To format the timestamp
import { useDispatch, useSelector } from 'react-redux';
import { getPostComments } from '../postList/postsSlice';
import LoadingSkeleton from '../loadingSpinner/LoadingSpinner';

function PostItem({ post }) {
    const { id, title, thumbnail, ups, downs, num_comments, permalink, author, created_utc, preview } = post
    const dispatch = useDispatch()
    
    const comments = useSelector((state) => state.posts.commentsByPostId[id]) || [];
    const isLoading = useSelector((state) => state.posts.isLoading);

    const getComments = (e, id) => {
        e.preventDefault();
        dispatch(getPostComments({ postId: id, subreddit: post.subreddit }))
    };

    // Use preview image for better quality if available
    const imageUrl = preview?.images?.[0]?.source?.url?.replace(/&amp;/g, '&') || thumbnail;

    return (
        <div className="bg-neutral-800 text-white p-4 rounded-md shadow-sm flex flex-col gap-4">
            {/* Post Thumbnail */}
            {imageUrl && thumbnail !== 'self' && thumbnail !== 'default' && (
                <img src={imageUrl} alt={title} className="w-full h-auto rounded-md object-cover" />
            )}

            {/* Post Title */}
            <h3 className="text-xl font-semibold">
                <a href={`https://www.reddit.com${permalink}`} target="_blank" rel="noopener noreferrer">
                    {title}
                </a>
            </h3>

            {/* Author and Time */}
            <div className="text-sm text-gray-400 flex justify-between items-center">
                <span>Posted by u/{author}</span>
                <span>{formatDistanceToNow(new Date(created_utc * 1000))} ago</span>
            </div>

            {/* Vote Count and Comment Count */}
            <div className="flex justify-between items-center text-sm mt-2">
                {/* Upvotes / Downvotes */}
                <div className="flex items-center gap-2">
                    <span className="text-green-500">⬆ {ups}</span>
                    <span className="text-red-500">⬇ {downs}</span>
                </div>

                {/* Comment Count */}
            
                <div className="flex items-center gap-1 hover:bg-gray-400/10 p-1 px-2 rounded-md cursor-pointer transition-colors delay-120" onClick={(e) => getComments(e, id)}>
                    <span>💬</span>
                    <span>{num_comments} Comments</span>
                </div>
            </div>
            {/* Comments */}
            <div>
                {isLoading ? (
                    <>
                        <LoadingSkeleton type="comment" />
                        <LoadingSkeleton type="comment" />
                        <LoadingSkeleton type="comment" />
                    </>
                ) : (
                    comments.length > 0 && (
                        <ul className="bg-neutral-800 text-white p-1 md:2 rounded-md shadow-sm flex flex-col gap-1">
                            {comments.map((comment) => (
                                <li key={comment.id} className="p-2 md:p-4 bg-neutral-700 rounded-md">
                                    <div className="text-sm text-gray-400 flex justify-between items-center">
                                        <span className="text-sm font-semibold text-mainColor">{comment.author}</span>
                                        <span>{formatDistanceToNow(new Date(comment.created_utc * 1000))} ago</span>
                                    </div>
                                    <p className='text-base '>{comment.body}</p>
                                </li>
                            ))}
                        </ul>
                    )
                )}
            </div>
        </div>
    );
}

PostItem.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        thumbnail: PropTypes.string,
        ups: PropTypes.number.isRequired,
        downs: PropTypes.number.isRequired,
        num_comments: PropTypes.number.isRequired,
        permalink: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        created_utc: PropTypes.number.isRequired,
        preview: PropTypes.object,
        subreddit: PropTypes.string.isRequired
    }).isRequired,
};

export default PostItem;