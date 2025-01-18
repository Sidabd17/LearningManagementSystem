import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/features/api/authApi";

export const appStore = configureStore({
    reducer: rootReducer, // Use rootReducer directly here
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(authApi.middleware) // middleware should be outside `reducer`
});

export default appStore;
