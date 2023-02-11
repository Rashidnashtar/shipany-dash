import { getName } from "../assets/js/helpers";
// import image from "../assets/images/image.jpg";
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

  // // if book
  book_name?: string;
  description?: string;
  // //if subject
  subject_name?: string;
  subject_description?: string;

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
  father_name,
  phone_number,
  class_number,
  book_name,
  description,
  subject_name,
  subject_description,
}) => {
  return (
    <tr className="management-card p-4  ">
      {(isStudents || isTeachers) && (
        <>
          <td className=" font-bold">{getName("محمد رشيد", "أحمد", "نشتر")}</td>
          <td className="">958712199</td>
        </>
      )}
      {isStudents && <td className="">2</td>}
      {(isBooks || isSubjects) && (
        <>
          <td className="whitespace-nowrap">صحيح البخاري</td>
          <td className="description text-xs  text-ellipsis ">
            ابجد هوزابجد هوزابجد هوزابجد هوزابجد هوزابجد هوزابجد هوزابجد هوزابجد
            هوزابجد هوزابجد هوز
          </td>
        </>
      )}

      <td className=" text-sm  sm:text-xl text-white ">
        <button
          onClick={() => {
            setIsPopupShown(true);
            setId(_id);
          }}
          className="btn-2 focus:outline-none  px-4 mb-1 ml-1 rounded-sm"
        >
          حذف
        </button>
        {(isBooks || isSubjects) && (
          <button className="btn-1 focus:outline-none  px-4 rounded-sm">
            تعديل
          </button>
        )}
        {(isStudents || isTeachers) && (
          <button className="btn-1 focus:outline-none  px-4 rounded-sm">
            تفاصيل
          </button>
        )}
      </td>
    </tr>
  );
};

export default ManagementCard;
