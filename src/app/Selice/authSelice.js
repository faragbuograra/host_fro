import { apiSlice } from "./apiSelice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/admin/web-login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        GetStatistics:builder.query({
            query:()=>'/admin/statistics',
                providesTags:['statistics']
           }),
           GetMe:builder.query({
            query:()=>'/me',
                providesTags:['Me']
           }),
    })
})

export const {
    useLoginMutation
,
    useLazyGetMeQuery,
useGetStatisticsQuery
} = authApiSlice