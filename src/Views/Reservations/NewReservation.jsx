import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useGetUserQuery, usePostUserMutation } from "../../app/Selice/UserSelice";
import { swal } from "../../components/swal";
import { useGetEmployQuery } from "../../app/Selice/EmployeeSelice";
import { usePostReservationMutation } from "../../app/Selice/ReservationSelice";


const NewReservation = () => {
  const themeColor = useSelector((state) => state.theme.value);
  const { t } = useTranslation();
  const [PostUser, error] = usePostReservationMutation();
  const {
    data,isLoading, isFetching, isSuccess
   }=useGetUserQuery(
    { page:1,
      role:'patient',
      pageSize:'100000'}
   )
   const {
    data:doctor
   }=useGetUserQuery(
    { page:1,
      role:'doctor',
      pageSize:'100000'}
   )
  const [isloading, setisloading] = useState(false);

  function Onclick(params) {
    setisloading(true);
  
    PostUser(state)
      .unwrap()
      .then((res) => swal("success", "success", t(res.status)));
  }
  const [state, setState] = React.useState({});

  return (
    <div style={{ height: "90vh", width: "70vw", margin: "20px" }}>
      <Form>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label style={{ color: themeColor.text }}>{t("name")}</Label>
              <Input
                id="examplename"
                name="name"
              
                type="select"
                onChange={(e) => setState({ ...state, Patient_id: e.target.value })}
              >
                <option value={""}></option>
                {
                  data?.data?.map((item)=>
                  <option value={item.id}>{item.name}</option>
                  )
                }
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
          <FormGroup>
              <Label style={{ color: themeColor.text }}>{t("name")}</Label>
              <Input
                id="examplename"
                name="name"
              
                type="select"
                onChange={(e) => setState({ ...state, doctor_id: e.target.value })}
              >
                <option value={""}></option>
                {
                  doctor?.data?.map((item)=>
                  <option value={item.id}>{item.name}</option>
                  )
                }
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
                //placeholder="with a //placeholder"
                type="name"
                onChange={(e) => setState({ ...state, title: e.target.value })}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label style={{ color: themeColor.text }}>{t("price")}</Label>
              <Input
                id="examplePassword"
                name="price"
                //placeholder="password //placeholder"
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
          ></Input>
             </Col>
             <Col>
             <Label style={{ color: themeColor.text }}>{t("hour")}</Label>

<Input
  onChange={(e) => setState({ ...state, hour: e.target.value })}
  className="mb-3"
  type="time"
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
  );
};

export default NewReservation
