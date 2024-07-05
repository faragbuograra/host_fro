// import { IconButton } from '@mui/material';
// import { AndroidPushNotificationPreview, ApplePushNotificationPreview, PushNotificationPreview } from "push-notification-preview";

import React from "react";
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
import { convertDateToTime } from "../../helpers/helpers";

import { useGetManagementQuery } from "../../app/Selice/ManagementSelice";
import { useGetDepartmentQuery } from "../../app/Selice/DocsSelice";
import { swal } from "../../components/swal";
import { useGetOneReservationQuery } from "../../app/Selice/ReservationSelice";
import ScannerApp from "../patient/New";

function OneReservation() {
  const [page, setPage] = React.useState(1);
  const [UpdateUser] = useUpateUserMutation();
  const [pageSize, setPageSize] = React.useState(10);
  const themeColor = useSelector((state) => state.theme.value);
  const { t } = useTranslation();
;
  const { id } = useParams();
  const { data, error, isLoading, isFetching, isSuccess } = useGetOneReservationQuery({
    id: id,
  });

  function Onclick(params) {
  }
  
  const [state, setState] = React.useState(data ? data : {});
  return (
    <>
    <div style={{ height: "50vh", width: "70vw", margin: "20px" }}>
      <Form>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label style={{ color: themeColor.text }}>{t("name")}</Label>
              <Input
                id="examplename"
                name="name"
                disabled
              value={data?.patient?.name}
               
                onChange={(e) => setState({ ...state, Patient_id: e.target.value })}
              >
                
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
          <FormGroup>
              <Label style={{ color: themeColor.text }}>{t("name")}</Label>
              <Input
                id="examplename"
                name="name"
                value={data?.doctor?.name}
              
            
                disabled
                onChange={(e) => setState({ ...state, doctor_id: e.target.value })}
              >
              
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label style={{ color: themeColor.text }}>{t("title")}</Label>
              <Input
                id="examplename"
                name="title"
              value={data?.title}
                type="name"
                onChange={(e) => setState({ ...state, title: e.target.value })}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label style={{ color: themeColor.text }}>{t("price")}</Label>
              <Input
               
                name="price"
            value={data?.price}
                type="text"
                onChange={(e) =>
                  setState({ ...state, price: e.target.value })
                }
              />
            </FormGroup>
          </Col>
        </Row>
      
        <Row>
        <Col>
          <Label style={{ color: themeColor.text }}>{t("date")}</Label>

          <Input
            onChange={(e) => setState({ ...state, date: e.target.value })}
            className="mb-3"
            type="date"
            value={data?.date}
          ></Input>
             </Col>
             <Col>
             <Label style={{ color: themeColor.text }}>{t("hour")}</Label>

<Input
  onChange={(e) => setState({ ...state, hour: e.target.value })}
  className="mb-3"
  type="time"
  value={data?.hour} 
></Input>
   </Col>
   
        </Row>
   

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
     
    </div>
    <hr></hr>
    <div style={{ height: "50vh", width: "70vw", margin: "20px" }}>

< ScannerApp />
     
    </div>
    </>
  );
}

export default OneReservation;
