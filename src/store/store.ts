
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice';
import exhibitReducer from './slices/exhibitSlices';
import commentsReducer from './slices/commentSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        exhibits: exhibitReducer,
        comments: commentsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch