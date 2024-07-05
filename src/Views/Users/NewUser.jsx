import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { usePostUserMutation } from "../../app/Selice/UserSelice";
import { swal } from "../../components/swal";


const NewUser = () => {
  const themeColor = useSelector((state) => state.theme.value);
  const { t } = useTranslation();
  const [PostUser, error] = usePostUserMutation();

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
                //placeholder="with a //placeholder"
                type="name"
                onChange={(e) => setState({ ...state, name: e.target.value })}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label style={{ color: themeColor.text }}>{t("Password")}</Label>
              <Input
                id="examplePassword"
                name="password"
                //placeholder="password //placeholder"
                type="password"
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
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
                //placeholder="with a //placeholder"
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
                //placeholder="password //placeholder"
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
          ></Input>
             </Col>
             <Col>
          <Label style={{ color: themeColor.text }}>{t("address")}</Label>

          <Input
            onChange={(e) => setState({ ...state, address: e.target.value })}
            className="mb-3"
            type="text"
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
          ></Input>
             </Col>
             <Col>
          <Label style={{ color: themeColor.text }}>{t("role")}</Label>

          <Input
            onChange={(e) => setState({ ...state, role: e.target.value })}
            className="mb-3"
            type="select"
          
            >
            <option value={""}></option>
            <option value={'admin'}>{t("admin")}</option>
            <option value={'doctor'}>
              {
                t('doctor')
              }
            </option>
          
          </Input>
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
    </div>
  );
};

export default NewUser;
