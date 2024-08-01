import { handleResponse } from "./api";
import { APIkey, filter, pageSize } from "./constants";

const currentDate = new Date();

const parseCurrentDate =
  currentDate.getFullYear() +
  "-" +
  (currentDate.getMonth() + 1).toString().padStart(2, "0") +
  "-" +
  currentDate.getDate().toString().padStart(2, "0");

const sevenDays = new Date();
sevenDays.setDate(currentDate.getDate() - 7);

const parseSevenDays =
  sevenDays.getFullYear() +
  "/" +
  (sevenDays.getMonth() + 1).toString().padStart(2, "0") +
  "/" +
  sevenDays.getDate().toString().padStart(2, 0);

export const getSearchResults = (keyword) => {
  return fetch(`https://nomoreparties.co/news/v2/everything?q=${keyword}&from=${parseSevenDays}&to=${parseCurrentDate}&pageSize=${pageSize}&sortBy=${filter}&apiKey=${APIkey}
      `).then(handleResponse);
};
