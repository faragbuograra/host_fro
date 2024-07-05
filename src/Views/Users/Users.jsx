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

function Users() {
  const [page, setPage] = React.useState(1);
  const [UpdateUser] = useUpateUserMutation()
  const [pageSize, setPageSize] = React.useState(10);
  const themeColor = useSelector((state) => state.theme.value)
  const {t} = useTranslation();
  const {
    data, error, isLoading, isFetching, isSuccess
   }=useGetUserQuery(
    { page:page,
      role:'doctor',
      pageSize:pageSize}
   )
   const columns = [
    { field: 'id', headerName: 'ID',   flex:1,hide:true },
    {
      headerName: t('name'),
      field: 'name',
      flex:1,
  
    },
  
    {
      headerName:    t('username'),
      field:   'username',
      flex:2,
  
    },
    {
      headerName:    t('phone'),
      field:   'phone',
      flex:2,
  
    },
    {
      headerName: t('role'),
      field:'role',
      flex:1,
      renderCell: (params) => {
        var role = ''
        if(params.row.role === 'admin'){
          role = 'مدير'
        }else if(params.row.role === 'doctor'){
          role = 'مسجل'
        }
        return role
      }
  
    },
  
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
      headerName:  t('status'),
     field:    'status',
      renderCell: (params) => {
          
      
  
  
      if(params.row.status === true){
        return <Switch
        checked={true}
        onChange={(e)=>UpdateUser({id:params.row.id,status:'false '})}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      }else{
        return <Switch
        // checked={false}
         onChange={(e)=>UpdateUser({id:params.row.id,status:'true'})}
        inputProps={{ 'aria-label': 'controlled' }}
        />
      }
      
  
      },
      flex:1,
  
    },
    {
      headerName:  t('action'),
     field:    'action', flex:1,
      renderCell: (params) => {
          
//viewe user data 
return <Link 
to={`/Users/${params.row.id}`}
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

export default Users;