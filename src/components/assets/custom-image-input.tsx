import { useId, useState } from "react";

interface Props {
  file?: string | undefined;
  handleChange: Function;
  isCover?: boolean;
  title?: string;
  classesForStyles?: string;
}
export const CustomImageInput: React.FC<Props> = ({
  file,
  handleChange,
  isCover,
  title,

  classesForStyles,
}) => {
  const [localFile, setLocalFile] = useState<null | string>(null);

  const id = useId();
  return (
    <div
      className={
        "min-w-[300px] rounded-lg mx-auto overflow-hidden flex flex-col items-center justify-center " +
        classesForStyles
      }
    >
      <label
        htmlFor={id}
        className="innerImageDiv"
        style={{
          cursor: "pointer",
          position: "relative",
          backgroundImage: `url('${localFile || file}'),url(/images/image.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: !isCover ? "200px" : "250px",
          width: !isCover ? "200px" : "100%",
          borderRadius: !isCover ? "5%" : "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          type="file"
          accept="image/*"
          id={id}
          name="image"
          style={{ display: "none" }}
          onChange={(e: any) => {
            handleChange(e.target.files[0], e.target.name);
            setLocalFile(URL.createObjectURL(e.target.files?.[0]));
          }}
        />
      </label>
      {title && <span>{title}</span>}
    </div>
  );
};

export default CustomImageInput;
