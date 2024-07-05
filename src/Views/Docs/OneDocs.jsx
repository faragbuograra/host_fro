import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";


import { useDropzone } from "react-dropzone";
import { usePostEmployMutation } from "../../app/Selice/EmployeeSelice";
import { useParams } from "react-router-dom";
import { Select } from "@mui/material";
import { useGetOneDocsQuery, usePostDocsMutation, useUpateDocsMutation } from "../../app/Selice/DocsSelice";
import { swal } from "../../components/swal";



const OneDocs = () => {


  const [Update] = useUpateDocsMutation ();

  const { id } = useParams();
 
  const {
    data, error, isLoading, isFetching, isSuccess
   }=useGetOneDocsQuery({id:id})
   const [state, setState] = useState({});
   useEffect(() => {
    setState(data);
  }
  , [data]);
  function Onclick() {
;
    





    Update({
      id:id,
      number:state?.number,
      subject:state?.subject,
      date:state?.date,
      year:state?.year,
      type:state?.type,
      category:state?.category
    })
    
      .unwrap()
    
      .then((res) => swal("success", "success", "success"));
  }
console.log(data)
  const themeColor = useSelector((state) => state.theme.value);
  const { t } = useTranslation();
  return (
    <div>
      <div className="form" style={{ height: "600px", margin: "25px" }}>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label style={{ color: themeColor.text }}>{t("subject")}</Label>
              <Input
                id="exampleNumber"
                value={state?.subject}
                onChange={(e) =>
                  setState({ ...state, subject: e.target.value })
                }
                type="text"
              />
            </FormGroup>
          </Col>{" "}
        
        </Row>
        <Row>
        <Col md={4}>
            <FormGroup>
              <Label style={{ color: themeColor.text }}>{t("num")}</Label>
              <Input
                id="exampleNumber"
                name="number"
                required={true}
                value={state?.number}
               
                onChange={(e) => setState({ ...state, number: e.target.value })}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label style={{ color: themeColor.text }}>
                {t("تاريخ الأصدار")}
              </Label>
              <Input
              value={state?.date}
                id="exampleNumber"
                onChange={(e) => setState({ ...state, date: e.target.value })}
                type="date"
              />
            </FormGroup>
          </Col>{" "}
          <Col md={4}>
            <FormGroup>
              <Label style={{ color: themeColor.text }}>{t("year")}</Label>
              <Input
                id="exampleNumber"
                name="number"
                required={true}
               

                value={state?.year}
                onChange={(e) => setState({ ...state, year: e.target.value <0 ? 0 : e.target.value})}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
        <Col md={6}>
          <FormGroup>
            <Label style={{ color: themeColor.text }}>
              {t("قرار صادر من")}
            </Label>

            <Input
              onChange={(e) => setState({ ...state, type: e.target.value })}
              type="select"
              value={state?.type}
              >
              <option value={""}></option>
              <option value={"قرارات المحافظ"}>قرارات المحافظ</option>
              <option value={"قرارات نائب المحافظ"}>قرارات نائب المحافظ</option>
              <option value={"منشورات أدارة الرقابة علي المصارف "}>
                منشورات أدارة الرقابة علي المصارف
              </option>
            </Input>
          </FormGroup>
        </Col>
    

        <Col md={6}>
          <FormGroup>
            <Label style={{ color: themeColor.text }}>
              {t("category")}
            </Label>

            <Input
              onChange={(e) => setState({ ...state, category: e.target.value })}
              type="select"
              value={state?.category}
            >
              <option value={""}></option>
              <option value={"قوانين"}>قوانين</option>
              <option value={"قرارات"}>قرارات</option>
    
              <option value={"لوائح"}>لوائح</option>
  
              <option value={"منشورات"}>منشورات</option>
            </Input>
          </FormGroup>
        </Col>
      </Row>
   
        <Button
          style={{
            background: themeColor.active,
            marginLeft: "10px",
            float: localStorage.getItem("lang") == "ar" ? "left" : "right",
          }}
          onClick={() => Onclick()}
        >
          {t("save")}
        </Button>
      
      </div>
    </div>
  );
};

export default OneDocs;
