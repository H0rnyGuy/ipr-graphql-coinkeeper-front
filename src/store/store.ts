import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authentification/authSlice';

export const store = configureStore({
    reducer: {
        authentication: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;