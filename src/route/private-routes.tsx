import { Outlet, Navigate } from "react-router-dom";
const PrivateRoute: React.FC = () => {
  let auth = { token: localStorage.getItem("token") };
  let joined = sessionStorage.getItem("joined");
  if (auth.token && joined) {
    return <Outlet />;
  } else if (auth.token && !joined) {
    return <Navigate to="/join" />;
  } else return <Navigate to="/login" />;
};

export default PrivateRoute;
