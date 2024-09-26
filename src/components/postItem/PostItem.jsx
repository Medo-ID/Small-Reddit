import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns'; // To format the timestamp
import LoadingSkeleton from '../loadingSkeleton/LoadingSkeleton';
import Comment from '../comment/Comment';

function PostItem({ post, onToggleComments }) {

    const renderComments = () => {
        if (post.errorComments) {
            return (
                <div>
                    <h3>Error loading comments</h3>
                </div>
            );
        }

        if (post.loadingComments) {
            return (
                <div>
                    <LoadingSkeleton type='comment' />
                    <LoadingSkeleton type='comment' />
                    <LoadingSkeleton type='comment' />
                    <LoadingSkeleton type='comment' />
                </div>
            );
        }

        if (post.showingComments) {
            return (
                <div>
                    {post.comments?.length > 0 ? (
                        post.comments.map((comment) => (
                            <Comment comment={comment} key={comment.id} />
                        ))
                    ) : (
                        <p>No comments available.</p>
                    )}
                </div>
            );
        }

        return null;
    };

    return (
        <div className="bg-neutral-800 text-white p-4 rounded-md shadow-sm flex flex-col gap-4 fade-in">
            {/* Post Thumbnail */}
            <img src={post.url} alt={post.title} className="w-full h-auto rounded-md object-cover" />
 
            {/* Post Title */}
            <h3 className="text-xl font-semibold">
                <a href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
                    {post.title}
                </a>
            </h3>

            {/* Author and Time */}
            <div className="text-sm text-gray-400 flex justify-between items-center">
                <span>Posted by u/{post.author}</span>
                <span>{formatDistanceToNow(new Date(post.created_utc * 1000))} ago</span>
            </div>

            {/* Vote Count and Comment Count */}
            <div className="flex justify-between items-center text-sm mt-2">
                {/* Upvotes / Downvotes */}
                <div className="flex items-center gap-2">
                    <span className="text-green-500 flex justify-start items-center gap-1">
                        <svg
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            height="18"
                            width="18"
                            >
                            <path d="M12 0H4a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V2a2 2 0 00-2-2zM7.5 6.707L6.354 7.854a.5.5 0 11-.708-.708l2-2a.5.5 0 01.708 0l2 2a.5.5 0 01-.708.708L8.5 6.707V10.5a.5.5 0 01-1 0V6.707z" />
                        </svg>
                        {post.ups}
                    </span>
                    <span className="text-red-500 flex justify-start items-center gap-1">
                        <svg
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            height="18"
                            width="18"
                            >
                            <path d="M12 0H4a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V2a2 2 0 00-2-2zM8 5a.5.5 0 01.5.5v3.793l1.146-1.147a.5.5 0 01.708.708l-2 2a.5.5 0 01-.708 0l-2-2a.5.5 0 11.708-.708L7.5 9.293V5.5A.5.5 0 018 5z" />
                        </svg>
                         {post.downs}
                    </span>
                </div>

                {/* Comment Count */}
            
                <div 
                    className="flex items-center gap-1 hover:bg-gray-400/10 p-1 px-2 rounded-md cursor-pointer transition-colors delay-120"
                    onClick={onToggleComments}
                >
                    <span>💬</span>
                    <span>{post.num_comments} Comments</span>
                </div>
            </div>
            {renderComments()}
        </div>
    );
}

PostItem.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        ups: PropTypes.number.isRequired,
        downs: PropTypes.number.isRequired,
        num_comments: PropTypes.number.isRequired,
        permalink: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        created_utc: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        comments: PropTypes.array,
        showingComments: PropTypes.bool.isRequired,
        loadingComments: PropTypes.bool.isRequired,
        errorComments: PropTypes.bool.isRequired
    }).isRequired,
    onToggleComments: PropTypes.func.isRequired
};

export default PostItem;