import CustomInput from "./../components/assets/custom-input";
import { fetchApi, isItAllNumbers } from "../assets/js/helpers";
import { FormEvent, useState, useRef } from "react";
import { useMutation } from "react-query";
import PageLoader from "../components/assets/page-loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
  const [userCred, setUserCred] = useState({
    phone: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

  const formRef = useRef(null);
  const isvalid = () => {
    // @ts-ignore
    return formRef?.current?.checkValidity() || false;
  };
  // fetching ..................................................
  const {
    mutate: postLogin,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(
    (data: { phone: string; password: string }) =>
      fetchApi("login", "POST", data),
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.data.token);
        console.log(data);
        toast.success("تم تسجيل الدخول بنجاح");
        navigate("/join");
      },
    }
  );
  // ...........................................................
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
  const validate = (values: any) => {
    // validation error message
    let errors = {
      phone: "",
      password: "",
    };
    if (
      !isItAllNumbers(values.phone) ||
      values.phone.length < 9 ||
      values.phone[0] !== "9"
    ) {
      errors.phone = "رجاءً اكتب رقم صحيح";
    }
    if (values.password.length < 8) {
      errors.password = "يجب ان تكون أكثر من ثماني أحرف";
    }
    return errors;
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // stting error message
    setFormErrors(validate(userCred));
    if (isvalid()) {
      postLogin(userCred);
      setUserCred({ ...userCred, password: "" });
    }
  };
  if (isSuccess) {
    return <></>;
  }
  return (
    <div className="ltr flex flex-col justify-center items-center h-screen pt-[5vh] p-2">
      <h1 className="text-2xl mb-2 sm:text-3xl md:text-4xl lg:text-5xl text-center">
        تسجيل دخول إلى الإدارة{" "}
      </h1>
      <h4 className="text-sm lg:text-xl text-main-gray">
        من فضلك ادخل رقم الهاتف وكلمة المرور
      </h4>

      <form
        ref={formRef}
        className="w-full sm:w-3/4 md:w-2/4 lg:w-1/3 p-4 bg-white rounded-md m-10"
      >
        <CustomInput
          type="tel"
          name="phone"
          placeholder="939214120"
          pattern="^[9].{7}\d"
          arabicTitle=" رقم الهاتف"
          value={userCred.phone}
          handleChange={handleChange}
          dataInfo="(ادخل الرقم بدون الصفر)"
          staticPhoneNum="963+"
          isPhone
        />
        {formErrors.phone && (
          <p className="text-main-red">{formErrors.phone}</p>
        )}
        <CustomInput
          type="password"
          name="password"
          placeholder="*********"
          pattern=".{8,}"
          arabicTitle=" كلمة المرور "
          value={userCred.password}
          handleChange={handleChange}
        />
        {formErrors.password && (
          <p className="text-main-red">{formErrors.password}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="px-4 rounded text-white text-lg hover:bg-secandary-blue transition-all duration-300   py-1 bg-main-blue w-1/2 block mt-5 mx-auto"
        >
          دخول
        </button>
      </form>
      {/* @ts-ignore */}
      {isError && (
        <p className="text-main-red">خطأ في الإتصال أو البيانات المدخلة</p>
      )}
      {isLoading && <PageLoader />}
    </div>
  );
};

export default Login;
