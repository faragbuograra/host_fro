import React from "react";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useSelector } from "react-redux";

import { t } from "i18next";
import {
  ArrowDropUpOutlined,
  ArrowOutward,
  ArrowUpwardOutlined,
  ArrowUpwardRounded,
} from "@mui/icons-material";

function Card({ data }) {
  const themeColor = useSelector((state) => state.theme.value);

  return (
    <>
      <div class="row mx-2">
        <div class="col-md-4 col-xl-3">
          <div class="card bg-c-blue order-card">
            <div class="card-block">
              <h6 class="m-b-20">{t("Users")}</h6>
              <h2 class="text-right">
                <i class="fa fa-user f-left"></i>
                <span>{data?.users}</span>
              </h2>
              <p class="m-b-0">
                {" "}
                {t("NewUsers")}
                <span class="f-center"> {data?.todayusers}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="col-md-4 col-xl-3">
          <div class="card bg-c-green order-card">
            <div class="card-block">
              <h6 class="m-b-20">{t("الاطباء")}</h6>
              <h2 class="text-right">
                <i class="fa fa-envelope f-left"></i>
                <span>{data?.doctor}</span>
              </h2>
              <p class="m-b-0">
                {" "}
                {t("new employee")}
                <span class="f-center"> {data?.todayemploy
}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="col-md-4 col-xl-3">
          <div class="card bg-c-yellow order-card">
            <div class="card-block">
              <h6 class="m-b-20">{t("المرضي")}
</h6>
              <h2 class="text-right">
                <i class="fa fa-building f-left"></i>
                <span>{data?.management}</span>
              </h2>
              <p class="m-b-0">
                {" "}
               .
                <span class="f-center"> .</span>
              </p>
            </div>
          </div>
        </div>

        <div class="col-md-4 col-xl-3">
          <div class="card bg-c-pink order-card">
            <div class="card-block">
              <h6 class="m-b-20">{
                t("الانواع")
              }</h6>
              <h2 class="text-right">
                <i class="fa fa-credit-card f-left"></i>
                <span>{data?.Departments}</span>
              </h2>
              <p class="m-b-0">
                {" "}
               .
                <span class="f-center"> .</span>
              </p>
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
}

export default Card;
