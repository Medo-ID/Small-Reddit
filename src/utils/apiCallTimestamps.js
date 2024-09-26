let apiCallTimestamps = [];

const MAX_CALLS_PER_MINUTE = 25
const TIME_FRAME = 60000

export const isRateLimited = () => {
    const currentTime = Date.now()
    // Remove timestamps older than 1 minute
    apiCallTimestamps = apiCallTimestamps.filter(timestamp => currentTime - timestamp < TIME_FRAME)
    return apiCallTimestamps.length >= MAX_CALLS_PER_MINUTE
}

export const registerApiCall = () => {
    apiCallTimestamps.push(Date.now())
}