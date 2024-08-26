import axios from "axios";
const BASE_URL = "http://127.0.0.1:3000/api";

export const getAllTasksForActivity = async (id) => {
  return await axios.get(BASE_URL + `/task/activity/${id}`);
};

export const create = async (data) => {
  return await axios.post(BASE_URL + "/task", data);
};

export const update = async (id, data) => {
  return await axios.patch(BASE_URL + `/task/${id}`, data);
};

export const updateStatus = async (id, data) => {
  return await axios.patch(BASE_URL + `/task/${id}`, data);
};

export const destroy = async (id) => {
  return await axios.delete(BASE_URL + `/task/${id}`);
};
