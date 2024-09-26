import { createSlice } from '@reduxjs/toolkit';

const rateLimitPopupSlice = createSlice({
    name: 'rateLimit',
    initialState: {
        rateLimitExceeded: false,
    },
    reducers: {
        showRateLimitNotification(state) {
            state.rateLimitExceeded = true;
        },
        hideRateLimitNotification(state) {
            state.rateLimitExceeded = false;
        }
    }
});

export const { showRateLimitNotification, hideRateLimitNotification } = rateLimitPopupSlice.actions;

export default rateLimitPopupSlice.reducer;