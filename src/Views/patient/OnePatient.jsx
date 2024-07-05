// import { IconButton } from '@mui/material';
// import { AndroidPushNotificationPreview, ApplePushNotificationPreview, PushNotificationPreview } from "push-notification-preview";

import React from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { Switch, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Button, Input, Label } from "reactstrap";

import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { convertDateToTime, decryptData } from "../../helpers/helpers";

import { swal } from "../../components/swal";
import {
  useGetEmployQuery,
  useGetOneEmployQuery,
  useUpdateEmployMutation,
  useUpdateEmployDataMutation,
} from "../../app/Selice/EmployeeSelice";

function OneEmploy() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [UpdateEmploy] = useUpdateEmployMutation();
  const [pageSize, setPageSize] = React.useState(10);
  const themeColor = useSelector((state) => state.theme.value);
  const { t } = useTranslation();
  const { id } = useParams();
  const { data, error, isLoading, isFetching, isSuccess } =
    useGetOneEmployQuery({
      id: id,
    });



  const [state, setState] = React.useState(data ? data : {});



  return (
    <>
      {state != {} ? (
        <div style={{ width: "75vw", margin: "20px" }}>
          <div
            style={{
              width: "80vw",

              display: "flexjs",
              flexDirection: "column",
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
                    borderRadius: " 0 10px  ",
                  }}
                >
                  <div className="flex">
                    <div className="before"></div>
                    <h2 className="heading">{t("Employ Details")}</h2>
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
                      {t("number")}
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
                      value={state?.number ? state?.number : data?.number}
                      onChange={(e) =>
                        setState({ ...state, number: e.target.value })
                      }
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
                      onChange={(e) =>
                        setState({ ...state, name: e.target.value })
                      }
                      value={state?.name ? state?.name : data?.name}
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
                    className=" box "
                    style={{
                      width: "70vw",
                      margin: " 0 20px",

                      borderRadius: " 0 10px  ",
                    }}
                  >
                    {" "}
                    <Button
                      style={{
                        width: "100px",
                        background: themeColor.active,
                        float:
                          localStorage.getItem("lang") == "ar"
                            ? "left"
                            : "right",
                      }}
                      onClick={() => {
                        UpdateEmploy({ id: id, ...state }).then((res) => {
                          swal(t("success"), t("success"), t("success"));
                        });
                      }}
                    >
                      {t("edit")}
                    </Button>
                  </div>
         
                <br />
                <br />
                <hr></hr>
                <div className="flexjs">
                  <h1 className="R"> {t("employmentDocuments")}</h1>
                </div>
                <Box
                  sx={{
                    backgroundColor: "primary",
                  }}
                >
                  <Table name="employmentDocuments" data={data} />
                </Box>
                <br />
                <h1 className="R"> {t("employFunction")}</h1>
                <Box
                  sx={{
                    backgroundColor: "primary",
                  }}
                >
                  <Table name="employFunction" data={data} />
                </Box>
                <br />
                <h1 className="R"> {t("employmentAcademicQualifications")}</h1>
                <Box
                  sx={{
                    backgroundColor: "primary",
                  }}
                >
                  <Table name="employmentAcademicQualifications" data={data} />
                </Box>
                <br />
                <h1 className="R"> {t("employmentscientificsessions")}</h1>
                <Box
                  sx={{
                    backgroundColor: "primary",
                  }}
                >
                  <Table name="employmentscientificsessions" data={data} />
                </Box>
                <br />
                <h1 className="R"> {t("employmentTransportation")}</h1>
                <Box
                  sx={{
                    backgroundColor: "primary",
                  }}
                >
                  <Table name="employmentTransportation" data={data} />
                </Box>
                <br />
                <h1 className="R"> {t("employmentPromotions")}</h1>
                <Box
                  sx={{
                    backgroundColor: "primary",
                  }}
                >
                  <Table name="employmentPromotions" data={data} />
                </Box>
                <br />
                <h1 className="R"> {t("employmentHealthInsurance")}</h1>
                <Box
                  sx={{
                    backgroundColor: "primary",
                  }}
                >
                  <Table name="employmentHealthInsurance" data={data} />
                </Box>
                <br />
                <h1 className="R"> {t("employmentCommittees")}</h1>
                <Box
                  sx={{
                    backgroundColor: "primary",
                  }}
                >
                  <Table name="employmentCommittees" data={data} />
                </Box>
                <br />
                <h1 className="R"> {t("employmentVacations")}</h1>
                <Box
                  sx={{
                    backgroundColor: "primary",
                  }}
                >
                  <Table name="employmentVacations" data={data} />
                </Box>{" "}
                <br />
                <h1 className="R"> {t("employmentPenalties")}</h1>
                <Box
                  sx={{
                    backgroundColor: "primary",
                  }}
                >
                  <Table name="employmentPenalties" data={data} />
                </Box>{" "}
                <br />
                <h1 className="R"> {t("employRightToSign")}</h1>
                <Box
                  sx={{
                    backgroundColor: "primary",
                  }}
                >
                  <Table name="employRightToSign" data={data} />
                </Box>
                <br />
                <h1 className="R"> {t("employPerformanceEvaluation")}</h1>
                <Box
                  sx={{
                    backgroundColor: "primary",
                  }}
                >
                  <Table name="employPerformanceEvaluation" data={data} />
                </Box>
                <br />
                <h1 className="R"> {t("employPersonalCommitments")}</h1>
                <Box
                  sx={{
                    backgroundColor: "primary",
                  }}
                >
                  <Table name="employPersonalCommitments" data={data} />
                </Box>
                <br />
                <h1 className="R"> {t("employEct")}</h1>
                <Box
                  sx={{
                    backgroundColor: "primary",
                  }}
                >
                  <Table name="employEct" data={data} />
                </Box>
                <br />
                <h1 className="R"> {t("الملاحظات")}</h1>
                <Box
                  sx={{
                    backgroundColor: "primary",
                  }}
                >
                  <Table name="employNote" data={data} />
                </Box>
              </>
            )}{" "}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default OneEmploy;

function Table(props) {
  const { t } = useTranslation();
  const [update] =  useUpdateEmployDataMutation()
  const navigate = useNavigate();
  const { id } = useParams();
  const combinedVariable = props.data[props.name];
  function Onclick(
    id,
    status,
    url
  ) {
    // console.log(acceptedFiles);
    var form = new FormData();

    form.append("status", status);

    update({
      form:form,
      url:url,
id:id,
   
   
    })
      .unwrap()
      .then((res) => {
      
      })
      .then((res) => swal("success", "success", "success"));
  }
  var originalData = null;
  let mkLocalData = localStorage.getItem("role");
  if (!mkLocalData) {
  } else {
    originalData = decryptData(
      mkLocalData,
      "6d090796-ecdf-11ea-adc1-0242ac112345"
    );
    if (!originalData) {
    }
  }
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
            <th>
              <h3
                style={{
                  direction: "rtl",
                  color: "white",
                  float: "Center",
                }}
              >
                {t("Actions")}
              </h3>
            </th>
          </tr>
        </thead>
        <tbody>
          {combinedVariable.map((data, index) => {
            if (data.status == false && originalData != "admin") {
              return null;
            }
            return (
              <>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.title}</td>
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
                      }} href={"http://" + data.file} target="_blank">
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
                  <td
                    style={{
                      color: "white",
                      width: "100px",
                      justifyContent: "center",
                    }}
                  >
                  {data.status == true && data.file != null ? (   <Button
                    
                      style={{
                        background: "red",
                        color: "white",

                        width: "100px",
                        justifyContent: "center",
                      }}
                      disabled={originalData=='admin' || originalData== 'edit'?false:true}
                      onClick={() => {
                        Onclick(
                          data.id,
                          data.status == true ? false : true,
                          props.name
                        
                        )
                      }}
                      className=""
                    >
                      {t("Delete")}
                    </Button>):<Button
                    
                    style={{
                      background: "red",
                      color: "white",

                      width: "100px",
                      justifyContent: "center",
                    }}
                    disabled={originalData=='admin' || originalData== 'edit'?false:true}
                    onClick={() => {
                      Onclick(
                        data.id,
                        data.status == true ? false : true,
                        props.name
                      
                      )
                    }}
                    className=""
                  >
                    {t("استعادة")}
                  </Button>}
                  </td>
                </tr>
              </>
            );
          })}
          <tr>
            <td></td>    <td></td>
            <td></td> <td></td> <td></td>
            <td
              style={{
                color: "white",

                width: "100px",
                justifyContent: "center",
              }}
            >
              <Button
                style={{
                  background: "blue",
                  color: "white",

                  width: "100px",
                  justifyContent: "center",
                }}
                onClick={() => {
                  navigate(`${props.name}`);
                }}
                className=""
              >
                {t("Add")}
              </Button>{" "}
            </td>
          </tr>
        </tbody>
      </table>

      <table
        className="table"
        id="customers"
        style={{
          width: "75vw",
          margin: " 0 20px",
          backgroundColor: " #ffffff",
          borderRadius: " 0 10px  ",
        }}
      ></table>
    </div>
  );
}
