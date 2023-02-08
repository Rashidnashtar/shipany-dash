import { ChangeEvent } from "react";
import { isItAllArabic, isItAllNumbers } from "../../assets/js/helpers";
import "../../assets/css/custom-input.css";
interface props {
  id: string;
  value: string;
  type: string;
  name: string;
  placeholder: string;
  pattern: string;
  handleChange: any;
  arabicTitle: string;
  errorMsg?: string;
  dataInfo?: string;
  isNotRequired?: boolean;
  maxLength?: number;
  isPhone?: boolean;
  isArabic?: boolean;
  isClassNumber?: boolean;
  staticPhoneNum?: string;
}
const CustomInput: React.FC<props> = ({
  id,
  value,
  type,
  name,
  placeholder,
  pattern,
  handleChange,
  dataInfo,
  arabicTitle,
  isNotRequired,
  maxLength,
  isPhone,
  isArabic,
  isClassNumber,
  staticPhoneNum,
}) => {
  const handelLocalChange = (event: ChangeEvent) => {
    const { name, value, validity, parentElement } =
      event.target as HTMLInputElement;
    if (!validity.valid) {
      parentElement?.classList.add("notValid");
      event.target.classList.add("notValid");
    } else {
      parentElement?.classList.remove("notValid");
      event.target.classList.remove("notValid");
    }
    // Arabic inputs Vaildation
    if (isArabic && !isItAllArabic(value)) return;

    //  Number Vaildation
    if ((isPhone || isClassNumber) && !isItAllNumbers(value)) return;

    //  Class Number Vaildation
    if (isClassNumber && (+value > 12 || +value < 1)) {
      parentElement?.classList.add("notValid");
    }
    handleChange(value, name, parentElement);
  };
  return (
    <label
      htmlFor={id}
      className={"custom-label relative text-xl mb-1 mt-3  group flex"}
    >
      <input
        onChange={handelLocalChange}
        type={type}
        id={id}
        value={value}
        name={name}
        placeholder={placeholder}
        pattern={pattern}
        required={!!!isNotRequired}
        maxLength={maxLength || undefined}
        className={
          "peer text-sm rounded-lg w-full h-11 py-3 mt-5 border border-main-gray focus:border-main-blue focus:outline-none   transition-all duration-300 bg-white pr-3 placeholder:opacity-0 focus:placeholder:opacity-100  " +
          " " +
          `${
            isPhone
              ? "clasfag ltr text-left pl-1 rounded-none rounded-r-xl "
              : ""
          }`
        }
      />
      {isPhone && (
        <p className="bg-main-gray text-white h-11 rounded-l-lg peer- transition-all duration-300 self-end text-sm w-16 flex justify-center items-center  ">
          {staticPhoneNum}
        </p>
      )}
      <span
        className={
          "  absolute top-0 right-1 translate-y-8 text-lg pr-1 transition-all duration-300 peer-focus-within:-translate-y-2 wit  group-focus-within:-translate-y-3   " +
          " "
        }
        data-info={dataInfo}
      >
        {arabicTitle}
      </span>
    </label>
  );
};

export default CustomInput;
