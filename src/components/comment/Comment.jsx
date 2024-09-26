import PropTypes from 'prop-types'
import { formatDistanceToNow } from "date-fns"
import Avatar from '../avatar/Avatar';

function Comment({comment}) {
    return (
        <div className="bg-neutral-800 text-white p-1 md:2 rounded-md shadow-sm flex flex-col gap-1 fade-in">
            <div key={comment.id} className="p-2 md:p-4 bg-neutral-700 rounded-md">
                <div className="text-sm text-gray-400 flex justify-between items-start">
                    <div>
                        <Avatar profile_img={comment.author_icon_img} />
                        <span className="text-sm font-semibold text-mainColor">{comment.author}</span>
                    </div>
                    <span className='text-xs md:text-sm'>{formatDistanceToNow(new Date(comment.created_utc * 1000))} ago</span>
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
        author_icon_img: PropTypes.string,
        created_utc: PropTypes.number.isRequired,
        body: PropTypes.string.isRequired,
    }).isRequired,
};

export default Comment