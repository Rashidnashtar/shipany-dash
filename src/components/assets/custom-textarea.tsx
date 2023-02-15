import { ChangeEvent, useId } from "react";
interface props {
  handleChange: Function;
  value: string;
  name: string;
  placeholder: string;
  isNotRequired?: boolean;
  title: string;
}
const CustomTextarea: React.FC<props> = ({
  handleChange,
  value,
  name,
  placeholder,
  isNotRequired,
  title,
}) => {
  const id = useId();

  const handleLocalChange = (event: ChangeEvent) => {
    const { value, name, validity, parentElement } =
      event.target as HTMLInputElement;
    if (!validity.valid || value.length > 255) {
      parentElement?.classList.add("notValid");
      event.target.classList.add("notValid");
    } else {
      parentElement?.classList.remove("notValid");
      event.target.classList.remove("notValid");
    }
    handleChange(value, name);
  };
  return (
    <label
      htmlFor={id}
      className="custom-label relative text-xl mb-1 mt-3  group flex"
    >
      <textarea
        className="peer text-sm rounded-lg w-full h-28 py-3 mt-5 border border-main-gray focus:border-main-blue focus:outline-none   transition-all duration-300 bg-white pr-3 placeholder:opacity-0 focus:placeholder:opacity-100 resize-none "
        id={id}
        value={value}
        onChange={handleLocalChange}
        name={name}
        placeholder={placeholder}
        required={!!!isNotRequired}
      />
      <span
        className={
          "  absolute top-0 right-1 translate-y-6 text-lg pr-1 transition-all duration-300 peer-focus-within:-translate-y-2   group-focus-within:-translate-y-3   " +
          " "
        }
      >
        {title}
      </span>
    </label>
  );
};

export default CustomTextarea;
