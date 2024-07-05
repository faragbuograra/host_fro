import { apiSlice } from "./apiSelice"

export const ReservationsSelice = apiSlice.injectEndpoints({
    
    endpoints: builder => ({
        
       GetReservation:builder.query({
        query:(a)=>'/admin/reservations?page='+a.page+'&paginate='+a.pageSize,
            providesTags:['Reservations']
       }),
       GetReservationPublic:builder.query({
        query:(a)=>'/reservations?page='+a.page+'&paginate='+a.pageSize,
            providesTags:['Reservations']
       }),
       GetOneReservation:builder.query({
        query:(a)=>'/admin/reservations/'+a.id,
            providesTags:['Reservations']
       }),
       UpateReservation:builder.mutation({
        query:({...rest})=>({
       
              url:`/admin/reservations/${rest.id}`,
              method:'PATCH',
              body:rest,
          
            
        }),
        invalidatesTags: ['Reservations'],

 }),
 
 PostReservation:builder.mutation({
    
    query:(formdata)=>({
          url:`/admin/reservations`,
          header:{
            'Content-Type':`multipart/form-data`,          
          },
          method:'POST',
          body:formdata,
       
    }

    ),
    
    invalidatesTags: ['Reservations'],

})
    })
})

export const {
    useGetReservationQuery,
    useGetOneReservationQuery,
    useUpateReservationMutation,
    useGetReservationPublicQuery,
    usePostReservationMutation

} = ReservationsSelice