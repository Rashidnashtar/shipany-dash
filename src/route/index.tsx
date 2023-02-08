import { Routes, Route } from "react-router-dom";
import Join from "../pages/join";
import Main from "../pages/main-page";
import PrivateRoute from "./private-routes";
import JoinRouteGuard from "./join-route-guard";
import Login from "../pages/login";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Main isStudents />} />
        <Route path="/teachers" element={<Main isTeachers />} />
        <Route path="/books" element={<Main isBooks />} />
      </Route>
      <Route element={<JoinRouteGuard />}>
        <Route path="/join" element={<Join />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default Router;