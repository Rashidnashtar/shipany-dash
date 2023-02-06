import Navbar from "../components/navbar";
import Management from "../components/management";
import PendingList from "../components/pending-list";
const Main: React.FC = () => {
  return (
    <div className="main-container h-screen flex flex-row gap-2  ">
      <Navbar />
      <Management />
      <PendingList />
    </div>
  );
};

export default Main;
