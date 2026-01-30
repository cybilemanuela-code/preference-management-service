import axios from "axios";

const backendUrl = "http://127.0.0.1:8001/api";

// Récupérer toutes les catégories
export async function fetchCategories() {
  const res = await axios.get(`${backendUrl}/categories/`);
  return res.data;
}

// Récupérer les préférences d'un utilisateur
export async function fetchPreferences(userId) {
  const res = await axios.get(`${backendUrl}/preferences/user/${userId}`);
  return res.data;
}

// Ajouter une préférence
export async function addPreference(data) {
  // data doit être { user_id, category_id, value }
  const res = await axios.post(`${backendUrl}/preferences/`, data);
  return res.data;
}

// Supprimer une préférence
export async function deletePreference(id) {
  const res = await axios.delete(`${backendUrl}/preferences/${id}`);
  return res.data;
}
