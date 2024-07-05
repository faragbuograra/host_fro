// import { IconButton } from '@mui/material';
// import { AndroidPushNotificationPreview, ApplePushNotificationPreview, PushNotificationPreview } from "push-notification-preview";

import React from 'react'

import { DataGrid } from '@mui/x-data-grid';

import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { useGetDocsQuery, useUpateDocsMutation } from '../../app/Selice/DocsSelice';
import { usePostLogMutation } from '../../app/Selice/LogSelice';
import Swal from 'sweetalert2';


function Docs() {
  const [page, setPage] = React.useState(1);

  const [pageSize, setPageSize] = React.useState(100);
  const themeColor = useSelector((state) => state.theme.value)
  const {t} = useTranslation();
  const {id}=useParams()


  const {
    data, error, isLoading, isFetching, isSuccess
   }=useGetDocsQuery({page:page,pageSize:pageSize})
   const [Post]=usePostLogMutation()
   const [Update]=useUpateDocsMutation()
   const columns = [
    { field: 'id', headerName: 'ID',   flex:1,hide:true },
    {
      headerName: t('رقم '),
      field: 'number',
      flex:1,
  
    },
    {
      headerName: t('subject'),
      field: 'subject',
      flex:4
  
    },
  
    {
      headerName:    t('صادر من'),
      field:   'type',
      flex:2,
  
    },
    {
      headerName:    t('year'),
      field:   'year',
      flex:1,
  
    },
    {
      headerName:    t('date'),  
      field: 'date',
      flex:1,
  

    },
    {
      headerName:    t('category'),  
      field: 'category',
      flex:1,
  

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
      headerName:    t('file'),
      field: 'file',
      flex:1,
      renderCell: (params) => {
      
     return  (  <a    style={{

      justifyContent: "center",
      float: "center",
    }} href={"http://" + params.row.file} target="_blank" onClick={()=>{
      Post({
        name:params.row.id
      })
    }}> {t('show')}</a>)
      }
  
    },
    {
      headerName:    t('edit'),
      field: 'edit',
      flex:1,
      renderCell: (params) => {

     return  ( <Link to={`/docs/${params.row.id}`} >تعديل</Link>)
      }
  
    },
    {
      headerName:    t('delete'),
      field: 'delete',
      flex:1,
      renderCell: (params) => {

     return  ( <Link onClick={()=>{
      //swal are you sure
      Swal  .fire({
        title: t('are you sure you want to delete this item?'),
        text: t('*You will not be able to recover this item!'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: t('yes'),
        cancelButtonText: t('no'),
      }).then((result) => {
        if (result.isConfirmed) {
          Update({
            id:params.row.id,
            status:"false"
          }).then((res)=>{
            if(res.data){
              Swal.fire(
                t('deleted'),
                t('deleted'),
                'success'
              )
            }
          }
          )
        }
      }
      )
      

     }} >{t('delete')}</Link>)
      }
  
    }
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

export default Docs;