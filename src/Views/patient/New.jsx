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

const ScannerApp = () => {
  const [url, setUrl] = React.useState("");
  const [state, setState] = useState(null);
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

  const [Post, error] = usePostEmployMutation();
  const { id } = useParams();
  const scanAndUploadDirectly = () => {
    window.scanner.scan(displayResponseOnPage, {
      output_settings: [
        {
          type: "save",
          format: "pdf",
          save_path: "${USERPROFILE}\\Desktop\\pdf\\${TMS}${EXT}",
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
    form.append("employ_id", id);
    form.append("title", state);

    form.append("attachment", acceptedFiles[0]);

    Post({
      form: form,
      type: type,
    })
      .unwrap()
      .then((res) => {})
      .then((res) => swal("success", "success", "success"));
  }

  const themeColor = useSelector((state) => state.theme.value);
  const { t } = useTranslation();
  return (
    <div>
      <div >
        <div
          className="flexjs"
          style={{
            width: "36vw",
          }}
        >{
          type == 'employFunction' ?  <>
            <Label style={{ color: themeColor.text, width: "7vw" }}>
            {t("الملاحظات")}
          </Label>
          <input  list="opts"   
            onChange={(e) => setState(e.target.value)}  width={100}
            style={{
              width: "30vw",
              padding: "10px",
              height: "40px",
              marginLeft: "20px",
              marginRight: "20px",
            }}
            value={state}/>
<datalist id="opts">
<option value={"الغياب"}>الغياب</option>
<option value={"تنبيهات"}>تنبيهات</option>
<option value={"انذرات"}>انذرات</option>
<option >اذونات الخروج</option>
<option
  value="راحة طبيه"
 >راحة طبيه</option>
<option
  value="لفت نظر"
  >لفت نظر</option>
<option
  value="خصمومات"
  >خصمومات</option>

</datalist>
          
      </> :  <>
            <Label style={{ color: themeColor.text, width: "7vw" }}>
            {t("title")}
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
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
      </>
      }
        </div>
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

export default ScannerApp;
