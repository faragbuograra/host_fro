import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

import { swal } from "../../components/swal";
import axios from "axios";
import { MultiSelect } from "primereact/multiselect";
import scanner from "scanner-js";

import { useDropzone } from "react-dropzone";
import { usePostEmployMutation } from "../../app/Selice/EmployeeSelice";
import { useParams } from "react-router-dom";
import { Select } from "@mui/material";
import { usePostDocsMutation } from "../../app/Selice/DocsSelice";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const NewDocs = () => {
  const [url, setUrl] = React.useState("");
  const [state, setState] = useState({});
  const { type } = useParams();

  const [files, setFiles] = React.useState([]);
  const onDrop = React.useCallback((acceptedFiles) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "application/pdf",
    maxFiles: 1,
    maxSize: 19548576,

    onDrop,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  const fileList = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  const [Post, error] = usePostDocsMutation();
  const { id } = useParams();
  const scanAndUploadDirectly = () => {
    window.scanner.scan(displayResponseOnPage, {
      output_settings: [
        {
          type: "save",
          format: "pdf",
          save_path: "${USERPROFILE}\\Desktop\\${TMS}${EXT}",
        },
      ],
    });
  };
  function displayResponseOnPage(successful, mesg, response) {
    if (!successful) {
      // On error
      document.getElementById("response").innerHTML = "Failed: " + mesg;
      return;
    }

    if (
      successful &&
      mesg != null &&
      mesg.toLowerCase().indexOf("user cancel") >= 0
    ) {
      // User cancelled.
      document.getElementById("response").innerHTML = "User cancelled";
      return;
    }

    setUrl(window.scanner.getSaveResponse(response).replace(/[\[\]"]/g, ""));
  }

  function Onclick() {
    var form = new FormData();
    console.log(state);
    form.append("subject", state.subject);
    form.append("number", state.number);
    form.append("date", state.date);
    form.append("year", state.year);
    form.append("type", state.type);
    form.append("category", state.category);


    form.append("attachment", acceptedFiles[0]);

    Post(form)
      .unwrap()
    
      .then((res) => swal("success", "success", "success"));
  }

  const themeColor = useSelector((state) => state.theme.value);
  const { t } = useTranslation();
  return (
    <div>
      <div className="form" style={{ height: "600px", margin: "25px" }}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label style={{ color: themeColor.text }}>{t("subject")}</Label>
              <Input
                id="exampleNumber"
                onChange={(e) =>
                  setState({ ...state, subject: e.target.value })
                }
                type="text"
              />
            </FormGroup>
          </Col>{" "}
          <Col md={6}>
            <FormGroup>
              <Label style={{ color: themeColor.text }}>{t("num")}</Label>
              <Input
                id="exampleNumber"
                name="number"
                required={true}
               
                onChange={(e) => setState({ ...state, number: e.target.value })}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label style={{ color: themeColor.text }}>
                {t("تاريخ الأصدار")}
              </Label>
              <Input
                id="exampleNumber"
                onChange={(e) => setState({ ...state, date: e.target.value })}
                type="date"
              />
            </FormGroup>
          </Col>{" "}
          <Col md={6}>
            <FormGroup>
              <Label style={{ color: themeColor.text }}>{t("year")}</Label>
              <Input
                id="exampleNumber"
                name="number"
                required={true}
                type="number"
                value={state.year}
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
        <br></br>
        <h1
          style={{
            color: themeColor.text,
            textAlign: localStorage.getItem("lang") != "ar" ? "left" : "right",
          }}
        >
          {t("رفع الملفات")}
        </h1>
        <>
          {fileList}
          <div className="container0">
            <div {...getRootProps({ style })}>
              <input {...getInputProps()} />
              <p>قم بسحب وإفلات بعض الملفات هنا، أو انقر لتحديد الملفات</p>
            </div>
          </div>
        </>
        <br></br>
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
        <Button
          style={{
            background: themeColor.active,
            marginLeft: "10px",
            float: localStorage.getItem("lang") == "ar" ? "left" : "right",
          }}
          onClick={() => scanAndUploadDirectly()}
        >
          {t("Scan")}
        </Button>
      </div>
    </div>
  );
};

export default NewDocs;
