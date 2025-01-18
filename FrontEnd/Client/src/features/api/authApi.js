import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../authSlice";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery : fetchBaseQuery({
        baseUrl : "http://localhost:8080/api/v1/user",
        credentials:"include"
    }),
    endpoints: (builder) =>({
       registerUser : builder.mutation({
         query : (inputData) =>({
            url: "register",
            method: "POST",
            body: inputData
         })
       }),
       loginUser : builder.mutation({
         query : (inputData) =>({
            url: "login",
            method: "POST",
            body: inputData
         }),
         async onQueryStarted(arg , {queryfulfilled , dispatch}) {
            try {
                 const result =  await queryfulfilled;
                 dispatch(userLoggedIn({user : result.data?.user}))
            } catch (error) { 
               console.log(error); 
            }
        }
       }),
       logoutUser: builder.mutation({
        query: () => ({
            url: "logout", // API endpoint for logout
            method: "POST",
        }),
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
            try {
                await queryFulfilled;
                dispatch(userLoggedOut()); // Clear user data from state
            } catch (error) {
                console.log(error);
            }
        },
    }),
    })
})

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation
} = authApi;