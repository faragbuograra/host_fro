// import { IconButton } from '@mui/material';
// import { AndroidPushNotificationPreview, ApplePushNotificationPreview, PushNotificationPreview } from "push-notification-preview";

import React, { useEffect } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

import { useSelector } from "react-redux";

import {
  useGetCustomerQuery,
  useGetOneUserQuery,
  useGetUserQuery,
  useUpateUserMutation,
} from "../../app/Selice/UserSelice";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { swal } from "../../components/swal";
import { use } from "i18next";
import { convertDateToTime } from "../../helpers/helpers";
import ScannerApp from "./New";

function OnePatient() {
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


  
  const [state, setState] = React.useState(data );
  function Onclick(params) {
  
    UpdateUser(state)
      .unwrap()
      .then((res) => swal("success", "success", t(res.status)));
  }
useEffect
(() => {
  setState(data)
}
, [data])
  return (
    <div style={{ width: "70vw", margin: "20px" }}>
       <Form>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label style={{ color: themeColor.text }}>{t("name")}</Label>
              <Input
                id="examplename"
                name="name"
               value={state?.name ? state?.name : ''}
                type="name"
                onChange={(e) => setState({ ...state, name: e.target.value })}
              />
            </FormGroup>
          </Col>
         
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label style={{ color: themeColor.text }}>{t("username")}</Label>
              <Input
                id="examplename"
                name="username"
                value={state?.username ? state?.username : ''}
                type="name"
                onChange={(e) => setState({ ...state, username: e.target.value })}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label style={{ color: themeColor.text }}>{t("Phone")}</Label>
              <Input
                id="examplePassword"
                name="phone"
             value={state?.phone ? state?.phone : ''}
                type="text"
                onChange={(e) =>
                  setState({ ...state, phone: e.target.value })
                }
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
        <Col>
          <Label style={{ color: themeColor.text }}>{t("email")}</Label>

          <Input
            onChange={(e) => setState({ ...state, email: e.target.value })}
            className="mb-3"
            type="text"
            value={state?.email ? state?.email : ''}
          ></Input>
             </Col>
             <Col>
          <Label style={{ color: themeColor.text }}>{t("address")}</Label>

          <Input
            onChange={(e) => setState({ ...state, address: e.target.value })}
            className="mb-3"
            type="text"
            value={state?.address ? state?.address : ''}
          ></Input>
             </Col>
        </Row>
        <Row>
        <Col>
          <Label style={{ color: themeColor.text }}>{t("dob")}</Label>

          <Input
            onChange={(e) => setState({ ...state, dob: e.target.value })}
            className="mb-3"
            type="date"
            value={state?.dob ? state?.dob : ''}
          ></Input>
             </Col>
             
        </Row>
        <FormGroup>
          <Label style={{ color: themeColor.text }}>{t("sex")}</Label>
          <Input
            onChange={(e) => setState({ ...state, sex: e.target.value })}
            value={state?.sex}
            
            type="select"
          >
            <option value={""}></option>
            <option value={'male'}>{t("male")}</option>
            <option value={'female'}>
              {
                t('female')
              }
            </option>
          
          </Input>
        </FormGroup>
   
        <Row></Row>
       
        
        <Button
          style={{
            background: themeColor.active,
            float: localStorage.getItem("lang") == "ar" ? "left" : "right",
          }}
          onClick={() => Onclick()}
        >
          {t("save")}
        </Button>
      </Form>
      <div style={{ height: "50vh", width: "70vw", margin: "20px" }}>

< ScannerApp />
     
    </div>
      <br></br>     <br></br>     <br></br>     <br></br>
      <h1 className="R"> {t("المستندات")}</h1>
               
               <Table name="PatientDocument" data={data?.PatientDocument} />
           <br></br>     <br></br>     <br></br>     <br></br>
    </div>
  );
}

export default OnePatient;

function Table(props) {
  const { t } = useTranslation();


  const { id } = useParams();
  


  return (
    <div>
      <table
        className="table"
        id="customers"
        style={{
          width: "75vw",
          margin: " 0 20px",
          backgroundColor: " #ffffff",
          borderRadius: " 0 10px  ",
        }}
      >
        <thead>
          <tr>
            <th>
              <h3
                style={{
                  width: "30vw",
                  direction: "rtl",
                  color: "white",
                  float: "Center",
                }}
              >
                الرقم
              </h3>
            </th>
            <th>
              <h3
                style={{
                  width: "10vw",
                  direction: "rtl",
                  color: "white",
                  float: "Center",
                }}
              >
             {t("title")}
              </h3>
            </th>
            <th>
              <h3
                style={{
                  direction: "rtl",
                  color: "white",
                  float: "Center",
                }}
              >
                {t("status")}
              </h3>
            </th>
            <th
              style={{
                width: "25vw",
              }}
            >
              <h3
                style={{
                  direction: "rtl",
                  color: "white",
                  float: "Center",
                }}
              >
                {t("date")}
              </h3>
            </th>
            <th
              style={{
                width: "6vw",
                direction: "rtl",
                color: "white",
                float: "Center",
              }}
            >
              <h3
                style={{
                  direction: "rtl",
                  color: "white",
                  float: "Center",
                }}
              >
                {t("عرض")}
              </h3>
            </th>
            
          </tr>
        </thead>
        <tbody>
          {
            props?.data?.map((data, index) => {
        
            return (
                <tr key={index + 100}>
                  <td>{index + 1}</td>
                  <td>{data?.name}</td>
                  <td>{data.status == true ? "مفعل" : "غير مفعل"} </td>

                  <td>{convertDateToTime(data.created_at)}</td>
                  <td
                    style={{
                    

                      width: "100px",
                      justifyContent: "center",
                    }}
                  >
                    { data.status == true && data.file != null ? (
                      <a    style={{

                        justifyContent: "center",
                        float: "center",
                      }} href={data.file} target="_blank">
                      <Button
                        style={{
                          background: "green",
                          color: "white",
                          width: "100px",
                          justifyContent: "center",
                    
                        }}
                      >
                        {t("show")}
                      </Button>     </a>
                    ) : (
              
                      "لا يوجد ملف"
                    )}
                  </td>
                 
                </tr>
          
            );
          })}
         
        </tbody>
      </table>

      
    </div>
  );
}