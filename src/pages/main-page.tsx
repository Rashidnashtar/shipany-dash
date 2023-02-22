import Navbar from "../components/navbar";
import Management from "../components/management";
import PendingList from "../components/pending-list";
import { Routes, Route, Outlet } from "react-router-dom";
interface props {
  isStudents?: boolean;
  isTeachers?: boolean;
  isBooks?: boolean;
  isSubjects?: boolean;
}
const Main: React.FC<props> = (props) => {
  return (
    <div className="main-container h-screen flex flex-row-reverse overflow-hidden gap-2  ">
      <Navbar />
      <Management {...props} />
      <PendingList isUser={props.isTeachers} />
    </div>
  );
};

export default Main;
