import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useDelete from "../assets/hooks/useDelete";
import useAccept from "../assets/hooks/useAccept";
import CustomPopup from "./assets/custom-popup";
interface props {
  isTeacher?: boolean;
  isStudent?: boolean;
  isFather?: boolean;
  id: number;
}
const PendingCard: React.FC<props> = ({
  isTeacher,
  isFather,
  isStudent,
  id,
}) => {
  const roleStyles = "text-xs font-bold text-right";
  const token = localStorage.getItem("token");

  // delete handler........................................................
  const navigate = useNavigate();
  const [isDeleteAproved, setIsDeleteAproved] = useState(false);
  const [isPopupShown, setIsPopupShown] = useState(false);

  const deleteUrl =
    isTeacher || isFather ? `delete_user/${id}` : `delete_student/${id}`;
  const pendingFetchingName = isStudent
    ? `pending-students`
    : isTeacher
    ? `pending-teachers`
    : isFather
    ? `pending-fathers`
    : "";
  const FetchingName = isStudent ? "students" : isTeacher ? "teachers" : "";
  const { mutate: deleteSelected } = useDelete(
    deleteUrl,
    token!,
    pendingFetchingName,
    FetchingName
  );
  if (isDeleteAproved) {
    deleteSelected();
    setIsDeleteAproved(false);
  }
  // ..........................................................................

  // accept handler............................................................
  const acceptUrl =
    isTeacher || isFather ? `accept_user/${id}` : `accept_student/${id}`;
  const { mutate: acceptSelected } = useAccept(
    acceptUrl,
    token!,
    pendingFetchingName,
    FetchingName
  );
  // ..........................................................................
  return (
    <div className="flex border-b border-main-border px-2 py-1 items-center justify-between">
      <div className="flex flex-col justify-between">
        <p className="text-sm font-bold">محمد رشيد نشتر</p>
        {/* isTeacher  */}
        {isTeacher && <p className={roleStyles}>مُدرس</p>}
        {/* isStudent */}
        {isStudent && <p className={roleStyles}>طالب</p>}
        {/* isFather*/}
        {isFather && <p className={roleStyles}>أب</p>}
      </div>
      <div className="flex gap-3  text-xl">
        <span
          onClick={() => {
            acceptSelected();
          }}
          title="قبول"
        >
          <i className="bi bi-check-circle text-main-blue hover:text-secandary-blue cursor-pointer "></i>
        </span>

        <span
          onClick={() => {
            setIsPopupShown(true);
          }}
          title="حذف"
        >
          <i className="bi bi-x-circle text-main-red hover:text-secandary-red cursor-pointer"></i>
        </span>

        <span
          title="تفاصيل"
          onClick={() => {
            navigate(
              isTeacher || isFather
                ? `/pendingusers/${id}`
                : `/pendingstudents/${id}`
            );
          }}
        >
          <i className="bi bi-three-dots-vertical hover:text-main-gray text-main-border cursor-pointer"></i>
        </span>
      </div>
      {isPopupShown && (
        <CustomPopup
          title="هل أنتة متأكد من الحذف"
          setIsApproved={setIsDeleteAproved}
          setIsPopupShown={setIsPopupShown}
        />
      )}
    </div>
  );
};

export default PendingCard;
