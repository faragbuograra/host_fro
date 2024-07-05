import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { swal } from "../../components/swal";

import { logOut, setCredentials } from "../../features/user";

const token = localStorage.getItem('token')
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000/api/v1',

  headers:{
  //  'Content-Type': 'application/json',
    'Accept': 'application/json',
    'authorization':`Bearer ${token}`,
   
 


  },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error) {
    //logout user if refresh token fails or user is not authenticated
    if (result.error.status === 400 || result.error.message === 'jwt expired') {
      //timer to wait for the refresh token to be updated
      const timer = new Promise((resolve) => setTimeout(resolve, 2000))
      
      // api.dispatch(logOut())
      // //delete token from local storage
      // localStorage.clear()
      // //redirect user to login page
      // window.location.href = 'admin/login'
      // window.location.reload()

    }
   return    swal("error", "error", result.error?.data?.message);
 
  }

  return result
}

export const apiSlice = createApi({
    baseQuery : baseQueryWithReauth,
    tagTypes:['Roles','OrderType','FeedBack','Meals',
  'SubMeals',
  'UserGifts',
  'User',
  'Order',
  'Product',
  'ProductType',
  ],
    endpoints: (builder) => ({})});
