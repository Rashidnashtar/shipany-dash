import { Outlet, Navigate } from "react-router-dom";
const JoinRouteGuard = () => {
  let auth = { token: localStorage.getItem("token") };
  console.log(auth.token);
  let joined = sessionStorage.getItem("joined");

  return auth.token && !joined ? (
    <Outlet />
  ) : auth.token && joined ? (
    <Navigate to="/" />
  ) : (
    <Navigate to="/login" />
  );
};

export default JoinRouteGuard;
