import { ChangeEvent, useId } from "react";

interface props {
  handleChange: Function;
  value: string;
  title: string;
  addedTitle: string;
  name: string;
  isNotRequired?: boolean;
}
const CustomFileInput: React.FC<props> = ({
  handleChange,
  value,
  isNotRequired,
  addedTitle,
  title,
  name,
}) => {
  const Id = useId();
  const handleLocalChange = (e: ChangeEvent) => {
    // @ts-ignore
    handleChange(e.target.files[0], e.target.name);
  };
  return (
    <label
      htmlFor={Id}
      className="flex my-5 text-xl justify-center px-5 border rounded border-main-border cursor-pointer hover:bg-main-border transition-all duration-300"
    >
      <input
        className="hidden"
        type="file"
        name={name}
        id={Id}
        accept=".pdf"
        onChange={handleLocalChange}
        required={!!!isNotRequired}
      />
      {value ? <span className="">{addedTitle}</span> : <span>{title}</span>}
    </label>
  );
};

export default CustomFileInput;
