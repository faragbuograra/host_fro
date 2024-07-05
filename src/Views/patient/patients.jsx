// import { IconButton } from '@mui/material';
// import { AndroidPushNotificationPreview, ApplePushNotificationPreview, PushNotificationPreview } from "push-notification-preview";

import React from 'react'

import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { Switch } from '@mui/material';
import { useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { useGetEmployQuery, useUpdateEmployMutation,  } from '../../app/Selice/EmployeeSelice';

function Employes() {
  const [page, setPage] = React.useState(1);
  const [UpdateEmploy] = useUpdateEmployMutation()
  const [pageSize, setPageSize] = React.useState(100);
  const themeColor = useSelector((state) => state.theme.value)
  const {t} = useTranslation();
  const {id}=useParams()


  const {
    data, error, isLoading, isFetching, isSuccess
   }=useGetEmployQuery(
    { from:'100000000',
      to:'1'}
   )
   const columns = [
    { field: 'id', headerName: 'ID',   flex:1,hide:true },
    {
      headerName: t('number'),
      field: 'number',
      flex:1,
  
    },
    {
      headerName: t('name'),
      field: 'name',
      flex:1,
  
    },
  
    {
      headerName:    t('type'),
      field:   'type',
      flex:2,
  
    },
    {
      headerName:    t('typeemploy'),
      field:   'typeemploy',
      flex:2,
  
    },
    // {
    //   headerName:    t('department'),  
    //   field: 'department',
    //   flex:2,
    //   renderCell: (params) => {
    //     return params.row.department?.name
    //   }

    // },
    // {
    //   headerName:    t('management'),
    //   field: 'management',
    //   flex:1,
    //   renderCell: (params) => {
    //     return params.row.management?.name
    //   }
  
    // },
 
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
    // {
    //   headerName:  t('status'),
    //  field:    'status',
    //   renderCell: (params) => {
          
      
  
  
    //   if(params.row.status === true){
    //     return <Switch
    //     checked={true}
    //     onChange={(e)=>UpdateEmploy({id:params.row.id,status:'false '})}
    //     inputProps={{ 'aria-label': 'controlled' }}
    //   />
    //   }else{
    //     return <Switch
    //     // checked={false}
    //      onChange={(e)=>UpdateEmploy({id:params.row.id,status:'true'})}
    //     inputProps={{ 'aria-label': 'controlled' }}
    //     />
    //   }
      
  
    //   },
    //   flex:1,
  
    // },
    {
      headerName:  t('action'),
     field:    'action', flex:1,
      renderCell: (params) => {
          
//viewe Employ data 
return <Link 
to={`/employees/list/${params.row.id}/one`}
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

export default Employes;