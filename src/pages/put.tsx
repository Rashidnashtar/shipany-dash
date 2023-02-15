import { FormEvent, useState } from "react";
import CustomTextarea from "../components/assets/custom-textarea";
import CustomInput from "../components/assets/custom-input";
import CustomImageInput from "../components/assets/custom-image-input";
import CustomFileInput from "../components/assets/custom-file-input";
import { useMutation, useQuery } from "react-query";
import { fetchApi, getImageFromServer } from "./../assets/js/helpers";
import { useParams } from "react-router-dom";
import PageLoader from "../components/assets/page-loader";
import usePut from "./../assets/hooks/usePut";
// add book / add subject /edit book / edit subject

interface props {
  isBook?: boolean;
  isSubject?: boolean;
  isEdit?: boolean;
}
//nice file name
const Put: React.FC<props> = ({ isBook, isSubject, isEdit }) => {
  let initalData: any;
  if (isEdit && isBook) {
    initalData = {
      name: "",
      description: "",
      image: "",
      url: "",
    };
  }
  if (isSubject) {
    initalData = {
      name: "",
      description: "",
    };
  }
  const [putCred, setPutCred] = useState(initalData);
  const [putErrors, setPutErrors] = useState({
    name: "",
    description: "",
    image: "",
    url: "",
  });
  console.log(putCred);
  // handle Edit pervious data..................................
  const idName = isBook ? "bookId" : "subjectId";
  const id = useParams()[idName];
  console.log(id);
  const fetchingName = isBook ? "book" : "subject";

  const { isLoading } = useQuery(
    [fetchingName],
    () => fetchApi(`${fetchingName}s/${id}`, undefined, undefined, "token"),
    {
      onSuccess: (data) => {
        console.log(data);
        setPutCred({
          ...data?.data,
          image: getImageFromServer(`${data?.data.image}`),
        });
      },
      enabled: !!isEdit,
    }
  );
  // ...........................................................

  const constrain = isBook ? "كتاب" : "المادة";

  const handleChange = (
    value: any,
    name: string,
    parentElement?: HTMLElement
  ) => {
    setPutCred({ ...putCred, [name]: value });
    // reset error
    setPutErrors({ ...putErrors, [name]: "" });
    console.log(putCred.image);
  };
  const isValid = () => {
    return (
      !putErrors.description &&
      !putErrors.image &&
      !putErrors.name &&
      !putErrors.url &&
      putCred.name &&
      putCred.description &&
      (isSubject || (putCred.image && putCred.url))
    );
  };
  const handleSubmit = (e: FormEvent) => {
    let errors = {
      name: "",
      description: "",
      image: "",
      url: "",
    };
    e.preventDefault();
    if (!putCred.image) {
      errors.image = "الصورة إجبارية";
    }
    if (!putCred.name) {
      errors.name = "الاسم إجباري";
    }
    if (!putCred.description) {
      errors.description = "الوصف إجباري";
    }
    if (putCred.description.length > 255) {
      errors.description = "الوصف يجب ان يكون اقصر من 255 حرف";
    }
    if (!putCred.url) {
      errors.url = "الرابط إجباري";
    }
    setPutErrors(errors);
    console.log(isValid());
    if (isValid()) {
      if (isBook) {
        const bookData = {
          data: { name: putCred.name, description: putCred.description },
          image: putCred.image,
        };
        if (isEdit) putBook(bookData);
        else addBook(bookData);
      }
      if (isSubject) {
        const subjectData = {
          data: { name: putCred.name, description: putCred.description },
        };
        if (isEdit) putSubject(subjectData);
        else addSubject(subjectData);
      }
    }
  };

  //   handle async actions .......................................................
  const { isLoading: isLoadingBooks, mutate: addBook } = usePut(
    "books",
    "POST",
    "books"
  );
  const { isLoading: isLoadingBook, mutate: putBook } = usePut(
    `books/${id}`,
    "PUT",
    "books"
  );

  const { isLoading: isLoadingSubjects, mutate: addSubject } = usePut(
    "subjects",
    "POST",
    "subjects"
  );
  const { isLoading: isLoadingSubject, mutate: putSubject } = usePut(
    `subjects/${id}`,
    "PUT",
    "subjects"
  );

  // ..............................................................................
  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center ">
      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          <h1 className="text-2xl  sm:text-3xl md:text-4xl lg:text-5xl text-center mb-4">
            {isEdit ? ` تعديل ${constrain}` : ` أضف ${constrain}`}
          </h1>
          <form className="w-full sm:w-2/3 md:w-1/3 bg-white rounded border border-main-blue p-4 flex flex-col justify-evenly">
            {isBook && (
              <>
                <CustomImageInput
                  file={undefined}
                  handleChange={handleChange}
                  title="ادخل صورة رجاءً"
                />
                <p className="text-main-red text-xs">{putErrors.image}</p>
              </>
            )}
            <CustomInput
              arabicTitle={`اسم ${constrain} `}
              value={putCred.name}
              handleChange={handleChange}
              name="name"
              placeholder={`اسم ${constrain}`}
              type="text"
            />
            <p className="text-main-red text-xs ">{putErrors.name}</p>
            <CustomTextarea
              handleChange={handleChange}
              name="description"
              value={putCred.description}
              placeholder={`وصف ${constrain}`}
              title={`ادخل وصف ${constrain}`}
            />
            <p className="text-main-red text-xs">{putErrors.description}</p>
            {isBook && (
              <>
                <CustomInput
                  name="url"
                  type="text"
                  arabicTitle="رابط الملف "
                  handleChange={handleChange}
                  value={putCred.url}
                  placeholder="ادخل رابط الملف رجاءً"
                />
                <p className="text-main-red text-xs">{putErrors.url}</p>
              </>
            )}
            <button
              onClick={handleSubmit}
              disabled={
                isLoadingBooks ||
                isLoadingSubjects ||
                isLoadingSubject ||
                isLoadingBook
              }
              className="px-4 rounded text-white text-lg hover:bg-secandary-blue transition-all duration-300 disabled:bg-main-gray   py-1 bg-main-blue w-1/3 block mt-5 mx-auto"
            >
              تأكيد
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Put;
