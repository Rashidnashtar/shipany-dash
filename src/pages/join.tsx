import { ChangeEvent, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Join: React.FC = () => {
  const [password, setPassword] = useState("");
  const [isvalid, setIsValid] = useState(true);
  const navigate = useNavigate();
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (import.meta.env.VITE_REACT_ADMIN_PASSWORD === password) {
      toast.success("مرحباً بك سيد راسي");
      navigate("/");
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className="h-screen bg-main-bg-color flex justify-center items-center  ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-1/3  bg-white border shadow shadow-main-gray text-center p-3 rounded gap-3"
      >
        <h1 className="mb-2 text-2xl">ادخل كلمة المرور </h1>

        <label className="relative" htmlFor="pass">
          <input
            className={
              "w-2/3 outline-none border border-main-gray focus:border-main-blue focus:scale-105 rounded-lg transition-all duration-300 placeholder-shown:text-right py-2 px-4" +
              " " +
              `${isvalid ? "" : " border-main-red focus:border-main-red "}`
            }
            type="password"
            id="pass"
            placeholder="**********"
            value={password}
            onChange={(e: ChangeEvent) => {
              const { value } = e.target as HTMLInputElement;
              setPassword(value);
              setIsValid(true);
            }}
          />
          <span
            className={
              " absolute rounded-sm -bottom-10 right-0 bg-main-red p-1 text-xs text-white shadow shadow-main-gray" +
              " " +
              `${isvalid ? "hidden" : "block"}`
            }
          >
            كلمة مرور خاطئة
          </span>
        </label>
        <button className="px-4 rounded text-white hover:bg-secandary-blue transition-all duration-300  py-1 bg-main-blue w-1/2 mt-3 mx-auto ">
          دخول
        </button>
      </form>
    </div>
  );
};

export default Join;
