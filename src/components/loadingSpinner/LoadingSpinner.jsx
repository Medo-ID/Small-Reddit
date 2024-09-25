import PropTypes from 'prop-types';

function LoadingSkeleton({ type }) {
  const skeletonClasses = "animate-pulse bg-neutral-600 rounded-md";

  if (type === "post") {
    return (
      <div className="flex flex-col gap-4 p-4 bg-neutral-700 rounded-md shadow-md">
        {/* Thumbnail Skeleton */}
        <div className={`${skeletonClasses} w-full h-40`}></div>

        {/* Title Skeleton */}
        <div className={`${skeletonClasses} w-3/4 h-6`}></div>

        {/* Vote and Comment Skeleton */}
        <div className="animate-pulse flex justify-between items-center mt-2">
          <div className={`${skeletonClasses} w-16 h-4`}></div>
          <div className={`${skeletonClasses} w-20 h-4`}></div>
        </div>
      </div>
    );
  }

  if (type === "category") {
    return (
      <div className="flex items-center gap-2 p-2">
        {/* Icon Skeleton */}
        <div className={`${skeletonClasses} w-6 h-6 rounded-full`}></div>

        {/* Category Name Skeleton */}
        <div className={`${skeletonClasses} w-3/4 h-4`}></div>
      </div>
    );
  }

  if (type === "comment") {
    return (
      <div className={`${skeletonClasses} flex space-x-4 my-2`}>
        <div className="rounded-full bg-neutral-700 h-10 w-10"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-neutral-700 rounded w-3/4"></div>
          <div className="h-4 bg-neutral-700 rounded w-5/6"></div>
        </div>
      </div>
    )
  }

  return null;
}

LoadingSkeleton.propTypes = { type: PropTypes.string.isRequired}

export default LoadingSkeleton;