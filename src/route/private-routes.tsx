import { Outlet, Navigate } from "react-router-dom";
const PrivateRoute: React.FC = () => {

  let auth = { token: true };
  let joined = true;
  if (auth.token && joined) {
    return <Outlet />;
  } else if (auth.token && !joined) {
    return <Navigate to="/join" />;
  } else return <Navigate to="/login" />;
};

export default PrivateRoute;
