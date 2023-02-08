import Navbar from "../components/navbar";
import Management from "../components/management";
import PendingList from "../components/pending-list";
import { Routes, Route, Outlet } from "react-router-dom";
interface props {
  isStudents?: boolean;
  isTeachers?: boolean;
  isBooks?: boolean;
}
const Main: React.FC<props> = (props) => {
  return (
    <div className="main-container h-screen flex flex-row-reverse gap-2  ">
      <Navbar />
      <Management {...props} />
      <PendingList />
      <Outlet />
    </div>
  );
};

export default Main;
