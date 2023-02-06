import { Outlet, Navigate } from "react-router-dom";
const PrivateRoute: React.FC = () => {
  console.log("dafdsafa");
  let auth = { token: true };
  return auth.token ? <Outlet /> : <Navigate to="/join" />;
};

export default PrivateRoute;
