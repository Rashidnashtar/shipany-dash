import { useMutation, useQueryClient } from "react-query";
import { fetchApi } from "../js/helpers";
import { toast } from "react-toastify";
const useDelete = (
  deleteUrl: string,
  token: string,
  ...fetchingNames: string[]
) => {
  const queryclient = useQueryClient();

  return useMutation(
    () => {
      return fetchApi(deleteUrl, "DELETE", token);
    },
    {
      onSuccess: () => {
        toast.success("تم الحذف بنجاح");
        fetchingNames.forEach((name) => {
          queryclient.invalidateQueries(name);
        });
      },
      onError: () => {
        toast.error("حدث خطأ في عملية الحذف");
      },
    }
  );
};

export default useDelete;
