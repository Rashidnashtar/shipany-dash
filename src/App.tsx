import "./app.css";
import Main from "./pages/main-page";
import Join from "./pages/join";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/assets/privateroute";
import JoinRouteGuard from "./components/assets/joinrouteguard";
import Login from "./pages/login";
function App() {
  return (
    <div className="app">
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
    </div>
  );
}

export default App;
