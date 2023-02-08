import "./app.css";
import Router from "./route";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="app">
      <Router />
      <ToastContainer />
    </div>
  );
}

export default App;
