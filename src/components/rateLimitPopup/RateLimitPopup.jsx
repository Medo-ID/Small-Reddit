import { useSelector, useDispatch } from 'react-redux'
import { hideRateLimitNotification } from './rateLimitPopupSlice';

const RateLimitPopup = () => {
    const dispatch = useDispatch();
    const rateLimitExceeded = useSelector((state) => state.rateLimit.rateLimitExceeded);

    return (
        rateLimitExceeded && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
                    <p className="text-gray-800 text-lg font-medium mb-4">
                        You’ve hit the rate limit. Please wait a minute before making more requests.
                    </p>
                    <button
                        className="bg-mainColor hover:bg-gray-400 text-mainBg font-semibold py-2 px-4 rounded transition-colors duration-200"
                        onClick={() => dispatch(hideRateLimitNotification())}
                    >
                        OK
                    </button>
                </div>
            </div>
        )
    );
};

export default RateLimitPopup;