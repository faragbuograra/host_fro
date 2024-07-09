import { apiSlice } from "./apiSelice"

export const EmployeeSelice = apiSlice.injectEndpoints({
    
    endpoints: builder => ({
        
       GetEmploy:builder.query({
        query:(a)=>'/admin/employ?from='+a.to+'&to='+a.from+'&paginate='+a.pageSize+'&page='+a.page,
            providesTags:['employ']
       }),
       GetTEmploy:builder.query({
        query:(a)=>'/admin/indexemploy',
            providesTags:['employ']
       }),
       GetOneEmploy:builder.query({
        query:(a)=>'/admin/employ/'+a.id,
            providesTags:['employ']
       }),
       UpdateEmploy:builder.mutation({
        query:({...rest})=>({
       
              url:`/admin/employ/${rest.id}`,
              method:'PATCH',
              body:rest,
          
            
        }),
        invalidatesTags: ['employ'],
        

 }),
 UpdateEmployData:builder.mutation({
    query:(formdata)=>({
   
          url:`/admin/${formdata.url}/${formdata.id}`,
          method:'PATCH',
          body:formdata.form,
      
        
    }),
    invalidatesTags: ['employ'],
}),
 PostEmploy:builder.mutation({
    
    query:(formdata)=>({
          url:`/admin/PatientDocument`,
          header:{
            'Content-Type':`multipart/form-data`,          
          },
          method:'POST',
          body:formdata.form,
       
    }

    ),
    
    invalidatesTags: ['employ'],

})
    })
})

export const {
    useGetEmployQuery,
    useGetTEmployQuery,
    useUpdateEmployDataMutation,
    useGetOneEmployQuery,
    useUpdateEmployMutation,
    usePostEmployMutation

} = EmployeeSelice