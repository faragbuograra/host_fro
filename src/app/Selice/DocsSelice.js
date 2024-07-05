import { apiSlice } from "./apiSelice"

export const DocsSelice = apiSlice.injectEndpoints({
    
    endpoints: builder => ({
        
       GetDocs:builder.query({
        query:(a)=>'/admin/reservations?page='+a.page+'&paginate=1000&sorts=-number',
            providesTags:['Docs']
       }),
       GetOneDocs:builder.query({
        query:(a)=>'/admin/reservations/'+a.id,
            providesTags:['Docs']
       }),
       UpateDocs:builder.mutation({
        query:({...rest})=>({
       
              url:`/admin/reservations/${rest.id}`,
              method:'PATCH',
              body:rest,
          
            
        }),
        invalidatesTags: ['Docs'],

 }),
 
 PostDocs:builder.mutation({
    
    query:(formdata)=>({
          url:`/admin/reservations`,
          header:{
            'Content-Type':`multipart/form-data`,          
          },
          method:'POST',
          body:formdata,
       
    }

    ),
    
    invalidatesTags: ['Docss'],

})
    })
})

export const {
    useGetDocsQuery,
    useGetOneDocsQuery,

    useUpateDocsMutation,
    usePostDocsMutation

} = DocsSelice