import { getName } from "../assets/js/helpers";
import { useNavigate } from "react-router-dom";

interface Props {
  setIsPopupShown: any;
  setId: any;
  isStudents?: boolean;
  isTeachers?: boolean;
  isBooks?: boolean;
  isSubjects?: boolean;
  // // if teacher or student
  first_name?: string;
  father_name?: string;
  last_name?: string;
  phone_number?: number;

  // // if student
  class_number?: number;

  // // if book | subject
  name?: string;
  description?: string;

  // // all
  // image: string;
  _id: number;
}
const ManagementCard: React.FC<Props> = ({
  setIsPopupShown,
  _id,
  setId,
  isStudents,
  isTeachers,
  isBooks,
  isSubjects,
  first_name,
  last_name,
  phone_number,

  name,
  description,
}) => {
  const navigate = useNavigate();
  return (
    <tr className="management-card p-4 h-16  ">
      {(isStudents || isTeachers) && (
        <td className=" font-bold">{first_name + " " + last_name}</td>
      )}
      {isStudents && <td className="">2</td>}
      {isTeachers && <td className="">{phone_number}</td>}
      {(isBooks || isSubjects) && (
        <>
          <td className="whitespace-nowrap">{name}</td>
          <td className="description text-xs  text-ellipsis ">{description}</td>
        </>
      )}

      <td className=" text-sm  sm:text-xl text-white ">
        <button
          onClick={() => {
            setIsPopupShown(true);
            setId(_id);
          }}
          className="btn-2 focus:outline-none   px-4 mb-1 ml-1 rounded-sm"
        >
          حذف
        </button>
        {(isBooks || isSubjects) && (
          <button
            onClick={() => {
              navigate(
                `${isBooks ? `/edit/books/${_id}` : `/edit/subjects/${_id}`}`
              );
              
            }}
            className="btn-1 focus:outline-none  px-4 rounded-sm"
          >
            تعديل
          </button>
        )}
        {(isStudents || isTeachers) && (
          <button
            onClick={() => {
              navigate(`${isTeachers ? `/users/${_id}` : `/students/${_id}`}`);
            }}
            className="btn-1 focus:outline-none  text-inherit mb-1   px-4 rounded-sm"
          >
            تفاصيل
          </button>
        )}
      </td>
    </tr>
  );
};

export default ManagementCard;
