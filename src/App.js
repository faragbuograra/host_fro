import React from "react";

import Dashboard from "./Views/DashBoard/Dashboard";
import Index from "./components/navbar/Index";
import { Route, Routes } from "react-router-dom";
import AppBar from "./components/AppBar/AppBar";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import Login from "./Views/Login/Login";
import { useTranslation } from "react-i18next";

import RequireAuth from "./context/RequireAuth";
import NewUser from "./Views/Users/NewUser";
import Users from "./Views/Users/Users";

import RequireRole from "./context/RequireRole";

import "primereact/resources/themes/lara-light-indigo/theme.css";

import OneUser from "./Views/Users/OneUser";
import "bootstrap/dist/css/bootstrap.min.css";


import EmployeesList from "./Views/patient/Patientslist";

import NewPatient from "./Views/patient/NewPatient";
import Types from "./Views/Types/Types";
import NewType from "./Views/Types/NewType";
import OneTypes from "./Views/Types/OneTypes";
import Reservations from "./Views/Reservations/Reservations";
import NewReservation from "./Views/Reservations/NewReservation";
import OneReservation from "./Views/Reservations/OneReservation";
import OnePatient from "./Views/patient/OnePatient";

function App() {
  // <script type="text/javascript" src="//cdn.asprise.com/scannerjs/scanner.js"></script>
  const themeColor = useSelector((state) => state.theme.value);

  let location = useLocation();

  const { t, i18n } = useTranslation();
  let language = i18n.language;

  return (
    <div
      className="App"
      style={{ backgroundColor: themeColor.mood }}
      dir={`${language == "ar" ? "rtl" : ""}`}
    >
      <div className="flex h-100">
        {location.pathname === "/login" ? null : <Index />}
        <div>
          {location.pathname === "/login" ? null : <AppBar />}
          <Routes>
            <Route path="/login" element={<Login />}></Route>

            <Route element={<RequireAuth />}>
              {
                //role base ?
              }

              <Route element={<RequireRole role="admin" />}>
                <Route path="/Users" element={<Users />}></Route>
                <Route path="/Users/:id" element={<OneUser />}></Route>
                <Route path="/Users/NewUser" element={< NewUser />}></Route>
                <Route path="/Types" element={<Types />}></Route>
                <Route path="/Types/:id" element={<OneTypes />}></Route>
                <Route path="/Types/NewType" element={< NewType />}></Route>
                <Route path="/reservations" element={<Reservations />}></Route>
                <Route path="/reservations/:id" element={<OneReservation />}></Route>
                <Route path="/reservations/Newreservation" element={< NewReservation />}></Route>
              </Route>
              <Route path="/Patients" element={<EmployeesList />}></Route>
              <Route path="/Patient/:id" element={<OnePatient />}></Route>
   
              <Route
                path="patients/Newpatient"
                element={<NewPatient />}
              ></Route>

         
              <Route path="/DashBoard" element={<Dashboard />}></Route>
              <Route path="/home" element={<OnePatient />}></Route>

            
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
