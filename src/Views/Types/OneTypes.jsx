// import { IconButton } from '@mui/material';
// import { AndroidPushNotificationPreview, ApplePushNotificationPreview, PushNotificationPreview } from "push-notification-preview";

import React from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { FormGroup, Switch } from "@mui/material";
import { useSelector } from "react-redux";
import { Button, Input, Label } from "reactstrap";
import {
  useGetCustomerQuery,
  useGetOneUserQuery,
  useGetUserQuery,
  useUpateUserMutation,
} from "../../app/Selice/UserSelice";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { convertDateToTime } from "../../helpers/helpers";

import { useGetManagementQuery } from "../../app/Selice/ManagementSelice";
import { useGetDepartmentQuery } from "../../app/Selice/DocsSelice";
import { swal } from "../../components/swal";

function OneTypes() {
  const [page, setPage] = React.useState(1);
  const [UpdateUser] = useUpateUserMutation();
  const [pageSize, setPageSize] = React.useState(10);
  const themeColor = useSelector((state) => state.theme.value);
  const { t } = useTranslation();
;
  const { id } = useParams();
  const { data, error, isLoading, isFetching, isSuccess } = useGetOneUserQuery({
    id: id,
  });


  
  const [state, setState] = React.useState(data ? data : {});
  return (
    <>
      <div style={{ height: "80vh", width: "75vw", margin: "20px" }}>
        <div
         
        >
          {data && (
            <>
              <br></br>
             

            
                <div
                  className="flexjs"
                  style={{
                    width: "37vw",
                  }}
                >
                  <Label style={{ color: themeColor.text, width: "7vw" }}>
                    {t("name")}
                  </Label>

                  <Input
                   onChange={(e) => setState({ ...state, name: e.target.value })} 
                    value={state?.name ?  state?.name : data?.name}
                    style={{
                      width: "30vw",
                      padding: "10px",
                      height: "40px",
                      marginLeft: "20px",
                      marginRight: "20px",
               
                    }}
                  />
                </div>
              
          
         <br></br>
          
                <Button
                  style={{
                    width: "30vw",
                    height: "40px",
          
                  }}
                  onClick={() => {
                    UpdateUser({ id: id, ...state })
                      .unwrap()
                      .then((res) => {
                        setState(res.data);
                        swal("success", "success", t(res.status));
                      })
                      .catch((error) => {});
                  }}
                >
                  {t("Update")}
                </Button>
              

      


                  
                  
              </>  )} </div> 
              </div> 
    </>
  );
}

export default OneTypes;
