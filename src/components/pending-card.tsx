import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useDelete from "../assets/hooks/useDelete";
import useAccept from "../assets/hooks/useAccept";
import CustomPopup from "./assets/custom-popup";
interface props {
  isUser?: boolean;
  id: number;
  first_name: string;
  last_name: string;
}
const PendingCard: React.FC<props> = ({
  isUser,
  id,
  first_name,
  last_name,
}) => {
  const roleStyles = "text-xs font-bold text-right";
  const token = localStorage.getItem("token");

  // delete handler........................................................
  const [isPopupShown, setIsPopupShown] = useState(false);
  const [isAttachShown, setIsAttachShown] = useState(false);

  const deleteUrl = isUser ? `delete_user/${id}` : `delete_student/${id}`;
  const fetchingName = isUser ? "all_pending_users" : "all_pending_students";

  const reFetchingName = isUser ? ["fathers", "teachers"] : ["students"];
  const { mutate: deleteSelected, isLoading: isLoadingDelete } = useDelete(
    deleteUrl,
    token!,
    fetchingName,
    ...reFetchingName
  );

  // ..........................................................................

  // accept handler............................................................
  const acceptUrl = isUser ? `accept_user/${id}` : `accept_student/${id}`;
  const { mutate: acceptSelected, isLoading: isLoadingAcc } = useAccept(
    acceptUrl,
    token!,
    fetchingName,
    ...reFetchingName
  );

  // ..........................................................................
  return (
    <div className="flex border-b border-main-border px-2 py-1 items-center justify-between">
      <div className="flex flex-col justify-between">
        <p className="text-sm font-bold">{first_name + " " + last_name}</p>

        {isUser ? (
          <p className={roleStyles}>مُستخدم</p>
        ) : (
          <p className={roleStyles}>طالب</p>
        )}
      </div>
      <div className="flex gap-3  text-xl">
        <span
          onClick={() => {
            if (!isLoadingAcc) {
              if (isUser) acceptSelected({ teacher_id: id });
              else setIsAttachShown(true);
            }
          }}
          title="قبول"
        >
          <i className="bi bi-check-circle text-main-blue hover:text-secandary-blue cursor-pointer "></i>
        </span>

        <span
          onClick={() => {
            if (!isLoadingDelete) {
              setIsPopupShown(true);
            }
          }}
          title="حذف"
        >
          <i className="bi bi-x-circle text-main-red hover:text-secandary-red cursor-pointer"></i>
        </span>

        {/* <span
          title="تفاصيل"
          onClick={() => {
            navigate(isUser ? `/pendingusers/${id}` : `/pendingstudents/${id}`);
          }}
        >
          <i className="bi bi-three-dots-vertical hover:text-main-gray text-main-border cursor-pointer"></i>
        </span> */}
      </div>
      {isPopupShown && (
        <CustomPopup
          title="هل أنتة متأكد من الحذف"
          asyncFunc={deleteSelected}
          setIsPopupShown={setIsPopupShown}
        />
      )}
      {isAttachShown && (
        <CustomPopup
          asyncFunc={acceptSelected}
          setIsPopupShown={setIsAttachShown}
          title="رجاءً اضف الأستاذ الخاص بالطالب"
          isAttach
        />
      )}
    </div>
  );
};

export default PendingCard;
