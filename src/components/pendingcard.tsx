interface props {
  isTeacher?: boolean;
  isStudent?: boolean;
  isFather?: boolean;
}
const PendingCard: React.FC<props> = ({ isTeacher, isFather, isStudent }) => {
  const roleStyles = "text-xs font-bold text-right";

  return (
    <div className="flex  border-b border-main-border px-2 py-1 items-center justify-between">
      <div className="flex flex-col justify-between">
        <p className="text-sm font-bold">محمد رشيد نشتر</p>
        {/* isTeacher  */}
        {isTeacher && <p className={roleStyles}>مُدرس</p>}
        {/* isStudent */}
        {isStudent && <p className={roleStyles}>طالب</p>}
        {/* isFather*/}
        {isFather && <p className={roleStyles}>أب</p>}
      </div>
      <div className="flex gap-3  text-xl ">
        <span title="قبول">
          <i className="bi bi-check-circle text-main-blue hover:text-secandary-blue cursor-pointer "></i>
        </span>

        {/* <button
          className={buttonStyles + "  bg-main-blue hover:bg-secandary-blue  "}
        >
          قبول
        </button> */}
        <span title="حذف">
          <i className="bi bi-x-circle text-main-red hover:text-secandary-red cursor-pointer"></i>
        </span>

        {/* <button
          className={buttonStyles + " bg-main-red hover:bg-secandary-red"}
        >
          حذف
        </button> */}
        <span title="تفاصيل">
          <i className="bi bi-three-dots-vertical hover:text-main-gray text-main-border cursor-pointer"></i>
        </span>
        {/* <button className={buttonStyles + " hover:bg-main-gray bg-main-border"}>
          تفاصيل
        </button> */}
      </div>
    </div>
  );
};

export default PendingCard;
