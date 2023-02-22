import { useParams } from "react-router-dom";
import nerdChild from "../assets/images/nerd-child.jpg";
import { useState } from "react";
import CustomPopup from "../components/assets/custom-popup";
import useDelete from "./../assets/hooks/useDelete";
import useAccept from "./../assets/hooks/useAccept";
interface props {
  isStudent?: boolean;
  isUser?: boolean;
  isPending?: boolean;
}
const Details: React.FC<props> = ({ isStudent, isUser, isPending }) => {
  const token = localStorage.getItem("token");

  const idName = isStudent ? "studentId" : isUser ? "userId" : "";
  const id = useParams()[idName];
  console.log(id);
  //   handle Delete.......................................................
  const [isDeleteAproved, setIsDeleteAproved] = useState(false);
  const [isPopupShown, setIsPopupShown] = useState(false);
  const deleteUrl = isUser ? `delete_user/${id}` : `delete_student/${id}`;
  let reFetchName: string[] = [];
  if (isPending) {
    reFetchName = ["pending-teachers", "pending-students", "pending-fathers"];
  }
  if (isStudent) {
    reFetchName = [...reFetchName, "students"];
  }
  if (isUser) {
    reFetchName = [...reFetchName, "teachers"];
  }
  const { mutate: deleteSelected } = useDelete(
    deleteUrl,
    token!,
    ...reFetchName
  );
  if (isDeleteAproved) {
    deleteSelected();
    setIsDeleteAproved(false);
  }
  //   ......................................................................

  //handle accept............................................................
  const acceptUrl = isUser ? `/accept_user/${id}` : `/accept_student/${id}`;
  const { mutate: acceptSelected } = useAccept(
    acceptUrl,
    token!,
    ...reFetchName
  );
  // ........................................................................
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
        <div className="flex text-xl sm:text-2xl md:text-3xl border-y border-main-border py-8 w-full mt-4 justify-evenly flex-wrap">
          {isUser && (
            <p className="mx-3 mb-3">
              رقم الهاتف: <span>958712199</span>
            </p>
          )}
          {isStudent && (
            <>
              <h2 className="mb-3">النتيجة:</h2>
              {!isPending ? (
                <div className="mx-3 mb-3 h-5 bg-main-border w-full relative">
                  <span
                    style={{ width: "75%" }}
                    className="absolute bg-main-blue h-full left-0 top-0"
                  ></span>
                  <span className="absolute bg-main-border text-xl p-1 rounded top-6 left-[73%]">
                    75%
                  </span>
                </div>
              ) : (
                <p> لايوجد نتيجة حاليا</p>
              )}
            </>
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
              onClick={() => {
                acceptSelected({ teacher_id: id });
              }}
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
          asyncFunc={deleteSelected}
          setIsPopupShown={setIsPopupShown}
        />
      )}
    </div>
  );
};

export default Details;
