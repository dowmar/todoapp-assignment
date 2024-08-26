import axios from "axios";
const BASE_URL = "http://127.0.0.1:3000/api";

export const get = async () => {
  return await axios.get(BASE_URL + "/activity", {
    email: "abc@gmail.com",
  });
};

export const create = async () => {
  return await axios.post(BASE_URL + "/activity", {
    title: "New Activity",
    email: "abc@gmail.com",
  });
};

export const update = async (id, title) => {
  return await axios.patch(BASE_URL + `/activity/${id}`, {
    title,
  });
};

export const destroy = async (id) => {
  return await axios.delete(BASE_URL + `/activity/${id}`);
};
