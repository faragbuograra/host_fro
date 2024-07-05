import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/user";
import { decryptData } from "../helpers/helpers";

const RequireRole = (role) => {
  var originalData;
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

  const location = useLocation();
  console.log(originalData, role);
  if (originalData == role.role) {
    return <Outlet />;
  } else {
    return <Navigate to="../login" state={{ from: location }} replace />;
  }
};

export default RequireRole;
