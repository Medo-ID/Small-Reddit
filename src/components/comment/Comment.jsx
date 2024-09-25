import PropTypes from 'prop-types'
import { formatDistanceToNow } from "date-fns"

function Comment({comment}) {
    return (
        <div className="bg-neutral-800 text-white p-1 md:2 rounded-md shadow-sm flex flex-col gap-1">
            <div key={comment.id} className="p-2 md:p-4 bg-neutral-700 rounded-md">
                <div className="text-sm text-gray-400 flex justify-between items-center">
                    <span className="text-sm font-semibold text-mainColor">{comment.author}</span>
                    <span>{formatDistanceToNow(new Date(comment.created_utc * 1000))} ago</span>
                </div>
                <p className='text-base '>{comment.body}</p>
            </div>
        </div>
    )
}

Comment.propTypes = {
    comment: PropTypes.shape({
        id: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        created_utc: PropTypes.number.isRequired,
        body: PropTypes.string.isRequired,
    }).isRequired,
};

export default Comment