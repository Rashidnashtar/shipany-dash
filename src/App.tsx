import "./app.css";
import Main from "./pages/main";
import Join from "./pages/join";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/assets/privateroute";
function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Main />} />
        </Route>
        <Route path="/join" element={<Join />} />
      </Routes>
    </div>
  );
}

export default App;
