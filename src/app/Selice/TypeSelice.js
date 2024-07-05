import { apiSlice } from "./apiSelice"

export const typeSelice = apiSlice.injectEndpoints({
    
    endpoints: builder => ({
        
       GetType:builder.query({
        query:(a)=>'/admin/type?page='+a.page+'&paginate='+a.pageSize,
            providesTags:['type']
       }),
     
       GetOneType:builder.query({
        query:(a)=>'/admin/type/'+a.id,
            providesTags:['type']
       }),
       UpateType:builder.mutation({
        query:({...rest})=>({
       
              url:`/admin/type/${rest.id}`,
              method:'PATCH',
              body:rest,
          
            
        }),
        invalidatesTags: ['type'],

 }),
 
 PostType:builder.mutation({
    
    query:(formdata)=>({
          url:`/admin/type`,
          header:{
            'Content-Type':`multipart/form-data`,          
          },
          method:'POST',
          body:formdata,
       
    }

    ),
    
    invalidatesTags: ['type'],

})
    })
})

export const {
    useGetTypeQuery,
    useGetOneTypeQuery,
    useUpateTypeMutation,
    useGetTypePublicQuery,
    usePostTypeMutation

} = typeSelice