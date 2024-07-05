import React from 'react';



import Card from '../../components/Card/Card'

import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { useGetStatisticsQuery } from '../../app/Selice/authSelice';
import { decryptData } from '../../helpers/helpers';




function Dashboard() {
  const {
    data , error, isLoading, isFetching, isSuccess
   }=useGetStatisticsQuery()
const {t} = useTranslation();
  const themeColor = useSelector((state) => state.theme.value)

 

  
        
  return (
    <div style={{width:'80vw' }}>
       <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
   <div className="mt-3">
 
</div>
		
    <Card data={data} />





</div>
 
  )
}

export default Dashboard