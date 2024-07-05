import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { usePostUserMutation } from "../../app/Selice/UserSelice";
import { swal } from "../../components/swal";
import { usePostTypeMutation } from "../../app/Selice/TypeSelice";


const NewType = () => {
  const themeColor = useSelector((state) => state.theme.value);
  const { t } = useTranslation();
  const [PostType, error] = usePostTypeMutation();

  const [isloading, setisloading] = useState(false);

  function Onclick(params) {
    setisloading(true);
  
    PostType(state)
      .unwrap()
      .then((res) => swal("success", "success", t(res.status)));
  }
  const [state, setState] = React.useState({});

  return (
    <div style={{ height: "90vh", width: "70vw", margin: "20px" }}>
      <Form>
        <Row>
          
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

export default NewType;
