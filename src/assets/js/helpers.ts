export const getName = (first: string, father: string | null, last: string) => {
  if (father) {
    return first + " " + father + " " + last;
  }
  return first + " " + last;
};
export const isItAllArabic = (string: string) =>
  !/[^\u0600-\u06FF ]/.test(string);
