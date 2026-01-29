import axios from "axios";

const backendUrl = "http://127.0.0.1:8001/api";

export async function fetchCategories() {
  const res = await axios.get(`${backendUrl}/categories`);
  return res.data;
}

export async function fetchPreferences(categoryId) {
  const res = await axios.get(`${backendUrl}/preferences`, { params: { categoryId } });
  return res.data;
}

export async function addPreference(data) {
  await axios.post(`${backendUrl}/preferences`, data);
}

export async function deletePreference(id) {
  await axios.delete(`${backendUrl}/preferences/${id}`);
}
