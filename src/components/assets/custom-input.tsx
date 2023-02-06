import { ChangeEvent } from "react";
import { isItAllArabic, isItAllNumbers } from "../../assets/js/helpers";
interface props {
  id: string;
  value: string;
  type: string;
  name: string;
  placeholder: string;
  pattern: string;
  handleChange: any;
  arabicTitle: string;
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
      parentElement?.classList.add("text-main-red border border-main-red");
    } else {
      parentElement?.classList.remove("text-main-red border border-main-red");
    }
    // Arabic inputs Vaildation
    if (isArabic && !isItAllArabic(value)) return;

    //  Number Vaildation
    if ((isPhone || isClassNumber) && !isItAllNumbers(value)) return;

    //  Class Number Vaildation
    if (isClassNumber && (+value > 12 || +value < 1)) {
      parentElement?.classList.add("text-main-red border border-main-red");
    }
    // confirme Password Vaildation
    handleChange(value, name, parentElement);
  };
  return (
    <label htmlFor={id} className={`${isPhone ? "flex" : ""}`}>
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
        className={`${isPhone ? "clasfag" : ""}`}
      />
      {isPhone && <p className="static-pre-number">{staticPhoneNum}</p>}
      <span data-info={dataInfo}>{arabicTitle}</span>
    </label>
  );
};

export default CustomInput;
