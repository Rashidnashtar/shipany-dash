import { useMutation } from "react-query";
import { fetchApi, fetchApiWithFile } from "../js/helpers";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
const usePut = (
  url: string,
  methode: string,
  token: string,
  ...reFetchingNames: string[]
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: { data?: { name: string; description: string }; image?: any }) => {
      if (!data.image) {
        return fetchApi(url, methode, data.data, token);
      }
      return fetchApiWithFile(url, methode, !data.data, data.image, token);
    },
    {
      onSuccess: () => {
        toast.success("تمت العملية بنجاح");
        reFetchingNames.forEach((name) => {
          queryClient.invalidateQueries(name);
        });
      },
      onError: () => {
        toast.error("حدث خطأ ما");
      },
    }
  );
};

export default usePut;
