import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns'; // To format the timestamp

function PostItem({ post }) {
    const { title, thumbnail, ups, downs, num_comments, permalink, author, created_utc, preview } = post;

    // Use preview image for better quality if available
    const imageUrl = preview?.images?.[0]?.source?.url?.replace(/&amp;/g, '&') || thumbnail;

    return (
        <div className="bg-neutral-800 text-white p-4 rounded-md shadow-md flex flex-col gap-4">
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
                    <span className="text-green-400">⬆ {ups}</span>
                    <span className="text-red-400">⬇ {downs}</span>
                </div>

                {/* Comment Count */}
                <div className="flex items-center gap-1">
                    <span>💬</span>
                    <span>{num_comments} Comments</span>
                </div>
            </div>
        </div>
    );
}

PostItem.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        thumbnail: PropTypes.string,
        ups: PropTypes.number.isRequired,
        downs: PropTypes.number.isRequired,
        num_comments: PropTypes.number.isRequired,
        permalink: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        created_utc: PropTypes.number.isRequired,
        preview: PropTypes.object
    }).isRequired
};

export default PostItem;