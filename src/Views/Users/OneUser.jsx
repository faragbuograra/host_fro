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

function OneUser() {
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
          style={{
            width: "80vw",
            height: "80vh",
            display: "flexjs",
            flexDirection: "column",
            backgroundColor: "#f2f2f2",
          }}
        >
          {data && (
            <>
              <br></br>
              <div
                className="flexjs box "
                style={{
                  width: "80vw",
                  margin: " 0 20px",
                  backgroundColor: " #ffffff",
                  borderRadius:  " 0 10px  ",
                }}
              >
                <div className="flex">
                  <div className="before"></div>
                  <h2 className="heading">{t("User Details")}</h2>
                  <div className="after"></div>
                </div>
              </div>

              <div
                className="flexjs "
                style={{
                  padding: "20px",
                  margin: " 0 20px",
                  backgroundColor: " #ffffff",
       
                }}
              >
                <br></br>
                <div
                  className="flexjs"
                  style={{
                    width: "36vw",
                  }}
                >
                  <Label style={{ color: themeColor.text, width: "7vw" }}>
                    {t("username")}
                  </Label>
                  <Input
                    width={100}
                    style={{
                      width: "30vw",
                      padding: "10px",
                      height: "40px",
                      marginLeft: "20px",
                      marginRight: "20px",
                    }}
                    value={state?.username ? state?.username : data?.username}
                    onChange={(e) => setState({ ...state, username: e.target.value })} 
                  />
                </div>
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
              </div>
          
              <div
                className="flexjs "
                style={{
                  padding: "20px",
                  margin: " 0 20px",
                  backgroundColor: " #ffffff",
       
                }}
              >
                <br></br>
                <div
                  className="flexjs"
                  style={{
                    width: "36vw",
                  }}
                >
                  <Label style={{ color: themeColor.text, width: "7vw" }}>
                    {t("permission")}
                  </Label>
                  <Input
          ر
                    style={{
                      width: "30vw",
                      padding: "10px",
                      height: "40px",
                      marginLeft: "20px",
                      marginRight: "20px",
                    }}
                    onChange={(e) => setState({ ...state, type: e.target.value })}
            value={state?.type ? state?.type : data?.type}
            type="select"
                  >
                          <option value={""}></option>
            <option value={"admin"}>ادمن</option>
            <option value={"employ"}>مسؤول الموارد البشرية</option>
            <option value={"decidins"}>مسؤول القرارات</option>

                  </Input>
                </div>
                <div
                  className="flexjs"
                  style={{
                    width: "37vw",
                  }}
                >
                
                    <>
                      <Label style={{ color: themeColor.text, width: "7vw" }}>
                    {t("Roles")}
                  </Label>

                  <Input
                          width={100}

                    onChange={(e) => setState({ ...state, role: e.target.value })}
                    value={state?.role ? state?.role : data?.role}
                    type="select"
                  >
                    <option value={""}></option>
      
                    <option value={"add"}>مسجل</option>
                    <option value={"edit"}>محرر</option>
                  </Input>
                    
                    </>       
                
                </div>
              </div>
              <div
                className="flexjs box "
                style={{
                  width: "80vw",
                  margin: " 0 20px",
                  backgroundColor: " #ffffff",
                  borderRadius: " 0 10px  ",
                  height: "80px",
                }}
              >
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
                </div>

        <br></br>  <div
                className="flexjs box "
                style={{
                  width: "80vw",
                  margin: " 0 20px",
                  backgroundColor: " #ffffff",
                  borderRadius: " 0 10px  ",
                }}
              >
        <div className="flex">
                  <div className="before"></div>
                  <h2 className="heading">{t("Password")}</h2>
                  <div className="after"></div>
                </div></div>
                <div
                className="flexjs "
                style={{
                  padding: "20px",
                  margin: " 0 20px",
                  backgroundColor: " #ffffff",
                }}
              >
                
                  <div
                    className="flexjs"
                    style={{
                      width: "36vw",
                    }}
                  >
                    <Label style={{ color: themeColor.text , width: "7vw",   marginRight: "10px",}}>
                      {t("Password")}
                    </Label>

                    <Input
                     onChange={(e) =>
                      setState({ ...state, password: e.target.value })
                    }
                      style={{
                        width: "30vw",
                  
                        height: "40px",
                        marginLeft: "5px",
                        marginRight: "20px",
                      }}
                      value={data?.password}
                      type="text"
                      >
                        <option value={""}></option>
                    
                      </Input>
                  </div>
                  <div
                    className="flexjs"
                    style={{
                      width: "37vw",
                    }}
                  >
                  <Button
                    style={{
                      width: "30vw",
                  
                      height: "40px",
                      marginLeft: "20px",
                      marginRight: "20px",
                    }}
                    onClick={()=>{
                      UpdateUser({id:id,...state})
                      .unwrap()
                      .then((res) => {
                        setState(res.data)
                        swal("success", "success", t(res.status))
                      })
                      .catch((error) => {
                       
                      });
                    }}
                  >{t("Update")}</Button>


                  
                  </div>
                 
              </div> 
              </>  )} </div> 
              </div> 
    </>
  );
}

export default OneUser;
