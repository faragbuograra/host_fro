import { apiSlice } from "./apiSelice"

export const ManagementSelice = apiSlice.injectEndpoints({
    
    endpoints: builder => ({
        
       GetManagement:builder.query({
        query:(a)=>'/admin/managements?page='+a.page+'&paginate='+a.pageSize,
            providesTags:['Managements']
       }),
       GetManagementStatus:builder.query({
        query:(a)=>'/managements?page='+a.page+'&paginate='+a.pageSize,
            providesTags:['Managements']
       }),
       UpateManagement:builder.mutation({
        query:({...rest})=>({
       
              url:`/admin/managements/${rest.id}`,
              method:'PATCH',
              body:rest,
          
            
        }),
        invalidatesTags: ['Managements'],

 }),
 
 PostManagement:builder.mutation({
    
    query:(formdata)=>({
          url:`/admin/managements`,
          header:{
            'Content-Type':`multipart/form-data`,          
          },
          method:'POST',
          body:formdata,
       
    }

    ),
    
    invalidatesTags: ['Managements'],

})
    })
})

export const {
    useGetManagementQuery,
    useUpateManagementMutation,
    usePostManagementMutation

} = ManagementSelice