import { useMutation, useQueryClient } from "react-query";
import { fetchApi } from "../js/helpers";
import { toast } from "react-toastify";

const useAccept = (
  url: string,
  token: string,
  ...reFetchingNames: string[]
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: any) => {
      return fetchApi(url, "POST", data, token);
    },
    {
      onSuccess: () => {
        toast.success("تم القبول  بنجاح");
        reFetchingNames.forEach((name) => {
          queryClient.invalidateQueries(name);
        });
      },
      onError: () => {
        toast.error("حدث خطأ في عملية القبول");
      },
    }
  );
};
export default useAccept;
