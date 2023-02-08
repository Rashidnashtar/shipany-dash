import { Outlet, Navigate } from "react-router-dom";
const JoinRouteGuard = () => {
  let auth = { token: true };
  let joined = false;
  
  return auth.token && !joined ? <Outlet /> : <Navigate to="/login" />;
};

export default JoinRouteGuard;
