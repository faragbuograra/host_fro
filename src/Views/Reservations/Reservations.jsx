// import { IconButton } from '@mui/material';
// import { AndroidPushNotificationPreview, ApplePushNotificationPreview, PushNotificationPreview } from "push-notification-preview";

import React from 'react'

import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { Switch } from '@mui/material';
import { useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { useGetCustomerQuery, useGetUserQuery, useUpateUserMutation } from '../../app/Selice/UserSelice';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useGetReservationQuery } from '../../app/Selice/ReservationSelice';

function Reservations() {
  const [page, setPage] = React.useState(1);
  const [UpdateUser] = useUpateUserMutation()
  const [pageSize, setPageSize] = React.useState(10);
  const themeColor = useSelector((state) => state.theme.value)
  const {t} = useTranslation();
  const {
    data, error, isLoading, isFetching, isSuccess
   }=useGetReservationQuery(
    { page:page,
     
      pageSize:pageSize}
   )
   const columns = [
    { field: 'id', headerName: 'ID',   flex:1,hide:true },
    {
      headerName: t('اسم المريض'),
      field: 'Patient_id',
renderCell: (params) => {
  return params.row.patient.name
}
,
      flex:1,
  
    },
  
    {
      headerName:    t('username'),
      field:   'username',
      flex:2,
      renderCell: (params) => {
        return params.row.auth.name
      }
      
    },
    {
      headerName:    t('doctor'),
      field:   'Doctor_id',
      flex:2,
      renderCell: (params) => {
        return params.row.doctor.name
      }
      ,
  
    }, { field: 'date', headerName: 'اليوم'
      ,   flex:1 },
    { field: 'hour', headerName: 'الساعة'
      ,   flex:1 },
    {
      headerName: t('created_at'),
       field: 'created_at',
  
      flex:1,
      renderCell: (params) => {
      var  formatter = new Intl.DateTimeFormat("ar", {
          year: "numeric",
          month: "short",
          day: "2-digit"
        });
        return formatter.format(Date.parse(params.row.created_at))

      }
  
    },

    {
      headerName:  t('action'),
     field:    'action', flex:1,
      renderCell: (params) => {
          
//viewe user data 
return <Link 
to={`/reservations/${params.row.id}`}
>
        {t('view')}
</Link>
     
      },
  
    },  
  ];
  
  return (
    <>

<div style={{height:"80vh",width:"75vw",margin:'20px'}}> 
      <DataGrid
    style={{height:"80vh",width:"75vw",margin:'20px', color:  themeColor.text}}
        rows={data?data.data:[]}
        columns={columns}
       pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10,25,50,100]}
         checkboxSelection getRowClassName={(params) =>
    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
  }
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
      </div>

   
    </>

  
 
  )
}

export default Reservations;