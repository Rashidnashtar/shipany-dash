import { Routes, Route } from "react-router-dom";
import Join from "../pages/join";
import Main from "../pages/main-page";
import PrivateRoute from "./private-routes";
import JoinRouteGuard from "./join-route-guard";
import Login from "../pages/login";
import NoFoundPage from "../components/assets/404";
import Details from "../pages/details";
const Router: React.FC = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Main isStudents />} />
        <Route path="/students/:studentId" element={<Details isStudent />} />
        <Route path="/users/:userId" element={<Details isUser />} />
        <Route
          path="/pendingstudents/:userId"
          element={<Details isStudent isPending />}
        />
        <Route
          path="/pendingusers/:userId"
          element={<Details isUser isPending />}
        />
        <Route path="/teachers" element={<Main isTeachers />} />
        <Route path="/books" element={<Main isBooks />} />
        <Route path="/subjects" element={<Main isSubjects />} />
      </Route>
      <Route element={<JoinRouteGuard />}>
        <Route path="/join" element={<Join />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NoFoundPage />} />
      <Route />
    </Routes>
  );
};

export default Router;
