import { apiSlice } from "../services/apiSlice";

interface User {
    email: string;
    username: string;
}

const authApiSlice = apiSlice.injectEndpoints({
    overrideExisting: false, 
    endpoints: (builder) => ({
        retrieveUser: builder.query<User, void>({
            query: () => '/api/users/me',
        }),
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: '/api/jwt/create/',
                method: 'POST',
                body: { email, password },
            }),
        }),
        register: builder.mutation({
            query: ({email, username, password, re_password }) => ({
                url: '/api/users/',
                method: 'POST',
                body: {email, username, password, re_password },
            }),
        }),
        verify: builder.mutation({
            query: () => ({
                url: '/api/jwt/verify/',
                method: 'POST',
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/api/logout/',
                method: 'POST',
            }),
        }),
    })
});

export const { useRetrieveUserQuery, 
    useLoginMutation,
    useRegisterMutation,
    useVerifyMutation,
    useLogoutMutation,
} = authApiSlice;