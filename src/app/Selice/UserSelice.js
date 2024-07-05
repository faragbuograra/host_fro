import { apiSlice } from "./apiSelice"

export const UsersSelice = apiSlice.injectEndpoints({
    
    endpoints: builder => ({
        
       GetUser:builder.query({
        query:(a)=>'/admin/users?filters=role:eq:'+a.role+'&page='+a.page+'&paginate='+a.pageSize,
            providesTags:['Users']
       }),
       GetUserPublic:builder.query({
        query:(a)=>'/users?page='+a.page+'&paginate='+a.pageSize,
            providesTags:['Users']
       }),
       GetOneUser:builder.query({
        query:(a)=>'/admin/users/'+a.id,
            providesTags:['Users']
       }),
       UpateUser:builder.mutation({
        query:({...rest})=>({
       
              url:`/admin/users/${rest.id}`,
              method:'PATCH',
              body:rest,
          
            
        }),
        invalidatesTags: ['Users'],

 }),
 
 PostUser:builder.mutation({
    
    query:(formdata)=>({
          url:`/admin/users`,
          header:{
            'Content-Type':`multipart/form-data`,          
          },
          method:'POST',
          body:formdata,
       
    }

    ),
    
    invalidatesTags: ['Users'],

})
    })
})

export const {
    useGetUserQuery,
    useGetOneUserQuery,
    useUpateUserMutation,
    useGetUserPublicQuery,
    usePostUserMutation

} = UsersSelice