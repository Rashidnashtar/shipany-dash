import { useParams } from "react-router-dom";
import nerdChild from "../assets/images/nerd-child.jpg";
import { useState } from "react";
import CustomPopup from "../components/assets/custom-popup";
interface props {
  isStudent?: boolean;
  isUser?: boolean;
  isPending?: boolean;
}
const Details: React.FC<props> = ({ isStudent, isUser, isPending }) => {
  const Id = useParams();
  const [isDeleteAproved, setIsDeleteAproved] = useState(false);
  const [isPopupShown, setIsPopupShown] = useState(false);
  if (isDeleteAproved) {
    console.log("deleting proccss");
    setIsDeleteAproved(false);
    console.log(Id);
    console.log("deleting");
  }
  console.log(Id);
  return (
    <div className="flex h-screen w-screen justify-center items-center p-1 pb-[5vh] ">
      {/* firstname last name  phone image /student fathername teachername score /book|subject decreption name photo  */}
      <div className="w-full sm:w-2/3 p-4 rounded bg-white border border-main-blue flex flex-col justify-evenly items-center">
        <img
          src={nerdChild}
          alt="profile-photo"
          className="w-32 h-32 rounded-full border border-main-blue hover:border-main-gray hover:opacity-75 cursor-pointer transition-all duration-300"
        />
        <div className="flex text-xl sm:text-2xl md:text-3xl border-y border-main-border py-4 w-full mt-4 justify-evenly flex-wrap">
          <p className="mx-3 mb-3">
            الاسم: <span>محمد رشيد</span>
          </p>
          {isStudent && (
            <>
              <p className="mx-3 mb-3">
                اسم الأب: <span> أحمد</span>
              </p>
              <p className="mx-3 mb-3">
                اسم الأستاذ: <span>خالد</span>
              </p>
            </>
          )}
          <p className="mx-3 mb-3">
            النسبة: <span>نشتر</span>
          </p>
        </div>
        <div className="flex text-xl sm:text-2xl md:text-3xl border-y border-main-border py-4 w-full mt-4 justify-evenly flex-wrap">
          {isUser && (
            <p className="mx-3 mb-3">
              رقم الهاتف: <span>958712199</span>
            </p>
          )}
          {isStudent && (
            <p className="mx-3 mb-3">
              النتيجة: <span>95%</span>
            </p>
          )}
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              setIsPopupShown(true);
            }}
            className="focus:outline-none bg-main-red hover:bg-secandary-red text-white px-7 py-2  rounded-sm mt-4"
          >
            حذف
          </button>
          {isPending && (
            <button
              onClick={() => {}}
              className="focus:outline-none bg-main-blue hover:bg-secandary-blue text-white px-7 py-2  rounded-sm mt-4"
            >
              قبول
            </button>
          )}
        </div>
      </div>
      {isPopupShown && (
        <CustomPopup
          title="هل أنتة متأكد من الحذف؟"
          setIsApproved={setIsDeleteAproved}
          setIsPopupShown={setIsPopupShown}
        />
      )}
    </div>
  );
};

export default Details;
