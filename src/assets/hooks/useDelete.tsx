import { useMutation, useQueryClient } from "react-query";
import { fetchApi } from "../js/helpers";
import { toast } from "react-toastify";
const useDelete = (
  deleteUrl: string,
  token: string,
  ...reFetchingNames: string[]
) => {
  const queryclient = useQueryClient();

  return useMutation(
    () => {
      return fetchApi(deleteUrl, "DELETE", undefined, token);
    },
    {
      onSuccess: () => {
        toast.success("تم الحذف بنجاح");
        reFetchingNames.forEach((name) => {
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
