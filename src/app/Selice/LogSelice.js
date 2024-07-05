import { apiSlice } from "./apiSelice"

export const LogSelice = apiSlice.injectEndpoints({
    
    endpoints: builder => ({
        
       GetLog:builder.query({
        query:(a)=>'/admin/log?page='+a.page+'&paginate=1000&sorts=-number',
            providesTags:['Log']
       }),
       GetOneLog:builder.query({
        query:(a)=>'/admin/log/'+a.id,
            providesTags:['Log']
       }),
       UpateLog:builder.mutation({
        query:({...rest})=>({
       
              url:`/admin/log/${rest.id}`,
              method:'PATCH',
              body:rest,
          
            
        }),
        invalidatesTags: ['Log'],

 }),
 
 PostLog:builder.mutation({
    
    query:(formdata)=>({
          url:`/admin/log`,
          header:{
            'Content-Type':`multipart/form-data`,          
          },
          method:'POST',
          body:formdata,
       
    }

    ),
    
    invalidatesTags: ['Logs'],

})
    })
})

export const {
    useGetLogQuery,
    useGetOneLogQuery,

    useUpateLogMutation,
    usePostLogMutation

} = LogSelice