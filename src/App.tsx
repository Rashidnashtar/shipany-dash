import "./app.css";
import Navbar from "./components/navbar";
import Management from "./components/management";
import PendingList from "./components/pending-list";
function App() {
  return (
    <div className="app">
      <div className="main-container h-screen flex flex-row gap-2  ">
        <Navbar />
        <Management />
        <PendingList />
      </div>
    </div>
  );
}

export default App;
