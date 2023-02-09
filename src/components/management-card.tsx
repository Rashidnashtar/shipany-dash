import { getName } from "../assets/js/helpers";
// import image from "../assets/images/image.jpg";
interface Props {
  // if teacher or student
  first_name?: string;
  father_name?: string;
  last_name?: string;
  phone_number?: number;

  // if student
  class_number?: number;

  // if book
  book_name?: string;
  description?: string;

  // all
  image: string;
  _id: number;
}
const ManagementCard: React.FC = () => {
  return (
    <tr className="management-card p-4  ">
      <td className=" font-bold">{getName("محمد رشيد", "أحمد", "نشتر")}</td>
      <td className="">958712199</td>
      <td className="">2</td>
      {/* <td className="whitespace-nowrap">صحيح البخاري</td> */}
      {/* <td className="description text-xs  text-ellipsis ">
        ابجد هوزابجد هوزابجد هوزابجد هوزابجد هوزابجد هوزابجد هوزابجد هوزابجد
        هوزابجد هوزابجد هوز
      </td> */}
      {/* <img className="w-16 h-16 rounded-full" src={image} alt="" /> */}
      <td className=" text-sm  sm:text-xl  ">
        <button className="btn-2 focus:outline-none  px-4 mb-1 ml-1 rounded-sm">
          حذف
        </button>
        <button className="btn-1 focus:outline-none  px-4 rounded-sm">
          تعديل
        </button>
      </td>
    </tr>
  );
};

export default ManagementCard;
