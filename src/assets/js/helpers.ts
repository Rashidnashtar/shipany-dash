import axios from "axios";

export const getName = (first: string, father: string | null, last: string) => {
  if (father) {
    return first + " " + father + " " + last;
  }
  return first + " " + last;
};
export const isItAllArabic = (string: string) =>
  !/[^\u0600-\u06FF ]/.test(string);

export const isItAllNumbers = (string: string) => !/[^$,\.\d]/.test(string);

export const fetchApi = async (
  url: string,
  method?: string,
  data?: any,
  token?: string,
  isMulter?: boolean
) => {
  return axios({
    url: import.meta.env.VITE_REACT_APP_BACKEND_URI + url,
    method: method || "GET",
    data,
    headers: {
      Authorization: `bearer ${token}` || "",
      "Content-Type": `${
        !isMulter ? "application/json" : "multipart/form-data"
      }`,
    },
  });
};
