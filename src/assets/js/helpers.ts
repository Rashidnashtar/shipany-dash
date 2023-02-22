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
      Authorization: `Bearer ${token}` || "",
      "Content-Type": `${
        !isMulter ? "application/json" : "multipart/form-data"
      }`,
    },
  });
};
export const fetchApiWithFile = async (
  url: string,
  method: string,
  data: Object,
  imgfile: any,
  token?: string
) => {
  const formData = new FormData();
  formData.append("image", imgfile);
  Object.keys(data).forEach((key) => {
    // @ts-ignore
    formData.append(key, data[key]);
  });
  return axios({
    url: import.meta.env.VITE_REACT_APP_BACKEND_URI + url,
    method,
    data: formData,
    headers: {
      Authorization: `bearer ${token}` || "",
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getImageFromServer = (url: string) => {
  return import.meta.env.VITE_REACT_APP_IMAGE_URI + url;
};

export const getItemsBetweenTowIndexes = (
  array: Array<any>,
  min: number,
  max: number
) => {
  if (!!array) return array.slice(min, max);
  else return [];
};

export const searchInArray = (
  array: any[],
  searchValue: string,
  constrain: string
) => {
  return array.filter((ele) => {
    if (constrain === "full_name") {
      let name = ele["first_name"] + " " + ele["last_name"];
      return name.includes(searchValue);
    }
    return ele[constrain].includes(searchValue);
  });
};
