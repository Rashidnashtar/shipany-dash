import CustomInput from "./../components/assets/custom-input";
import { isItAllNumbers } from "../assets/js/helpers";
import { FormEvent, useState } from "react";
const Login = () => {
  const [userCred, setUserCred] = useState({
    phoneNumber: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    phoneNumber: "",
    password: "",
  });

  const handleChange = (
    value: string,
    name: string,
    parentElement: HTMLElement
  ) => {
    console.log(value, "dsklfjkadsl  ", name);
    setUserCred({ ...userCred, [name]: value });
    // reset error message
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // validation error message
    if (
      !isItAllNumbers(userCred.phoneNumber) ||
      userCred.phoneNumber.length < 9
    ) {
      setFormErrors({ ...formErrors, phoneNumber: "رجاءً اكتب رقم صحيح" });
    }
    if (userCred.password.length < 8) {
      setFormErrors({
        ...formErrors,
        password: "يجب ان تكون أكثر من ثماني أحرف",
      });
    }
  };

  return (
    <div className="ltr flex flex-col justify-center items-center h-screen pt-[5vh] p-2">
      <h1 className="text-5xl mb-2  text-center">تسجيل دخول إلى الإدارة </h1>
      <h4 className="text-xl text-main-gray">
        من فضلك ادخل رقم الهاتف وكلمة المرور
      </h4>

      <form className="w-1/3 p-4 bg-white rounded-md m-10">
        <CustomInput
          id="ph-number"
          type="tel"
          name="phoneNumber"
          placeholder="939214120"
          pattern="^[9].{7}\d"
          arabicTitle=" رقم الهاتف"
          value={userCred.phoneNumber}
          handleChange={handleChange}
          dataInfo="(ادخل الرقم بدون الصفر)"
          staticPhoneNum="963+"
          isPhone
        />
        <p className="text-main-red">{formErrors.phoneNumber}</p>
        <CustomInput
          id="password"
          type="password"
          name="password"
          placeholder="*********"
          pattern=".{8,}"
          arabicTitle=" كلمة المرور "
          value={userCred.password}
          handleChange={handleChange}
        />
        <p className="text-main-red">{formErrors.password}</p>

        <button
          onClick={handleSubmit}
          className="px-4 rounded text-white text-lg hover:bg-secandary-blue transition-all duration-300   py-1 bg-main-blue w-1/2 block mt-5 mx-auto"
        >
          دخول
        </button>
      </form>
    </div>
  );
};

export default Login;
