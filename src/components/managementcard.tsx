import { getName } from "../assets/js/helpers";
import image from "../assets/images/image.jpg";
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
    <div className="management-card flex items-center p-4 justify-between gap-4 text-center ">
      <p className=" capitalize font-bold whitespace-nowrap">
        {getName("محمد رشيد", "أحمد", "نشتر")}
      </p>
      <p className="">958712199</p>
      <p className="">2</p>
      <p className="whitespace-nowrap">صحيح البخاري</p>
      <p className="description text-xs  text-ellipsis ">
        ابجد هوزابجد هوزابجد هوزابجد هوزابجد هوزابجد هوزابجد هوزابجد هوزابجد
        هوزابجد هوزابجد هوز
      </p>
      {/* <img className="w-16 h-16 rounded-full" src={image} alt="" /> */}
      <div className="flex gap-1">
        <button className="btn-1 focus:outline-none text-xl px-4  rounded-sm">
          تعديل
        </button>
        <button className="btn-2 focus:outline-none text-xl px-4  rounded-sm">
          حذف
        </button>
      </div>
    </div>
  );
};

export default ManagementCard;
