import React, { useEffect, useState } from "react";
import { Brain } from "lucide-react"; // Logo de l'app
import CategorySelect from "./components/CategorySelect";
import PreferencesList from "./components/PreferencesList";
import {
  fetchCategories,
  fetchPreferences,
  addPreference,
  deletePreference,
} from "./services/api";

/**
 * App.jsx
 *
 * Composant principal de l'application AURA
 * Gère l'affichage des catégories et préférences
 * Style moderne conforme aux guidelines (Tailwind CSS + Roboto)
 */
function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [preferences, setPreferences] = useState([]);

  // ⚠️ Pour l'instant, on fixe un user_id de test (ex: 1)
  const userId = 1;

  // Charger les catégories au démarrage
  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Erreur lors du chargement des catégories :", err);
      }
    }
    loadCategories();
  }, []);

  // Charger les préférences de l'utilisateur
  useEffect(() => {
    async function loadPreferences() {
      try {
        const data = await fetchPreferences(userId); // ⚠️ backend attend user_id
        setPreferences(data);
      } catch (err) {
        console.error("Erreur lors du chargement des préférences :", err);
      }
    }
    loadPreferences();
  }, [userId]);

  // Ajouter une préférence
 async function handleAddPreference(value) {
  try {
    await addPreference({
      user_id: userId,                // ⚠️ fixe ou dynamique
      category_id: selectedCategory.id,
      value: value
    });

    const updated = await fetchPreferences(userId);
    setPreferences(updated);
  } catch (err) {
    console.error("Erreur lors de l'ajout de la préférence :", err);
  }
}


  // Supprimer une préférence
  async function handleDeletePreference(id) {
    try {
      await deletePreference(id);
      setPreferences((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression de la préférence :", err);
    }
  }

  return (
    <div className="min-h-screen bg-lightGray p-6 font-roboto">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Brain className="w-10 h-10 text-primaryBlue" />
          <h1 className="text-[24px] font-semibold text-darkGray">AURA</h1>
        </div>

        {/* Card principale */}
        <div className="bg-white border border-borderGray rounded-lg p-6 shadow">
          <h2 className="text-[20px] font-semibold text-darkGray mb-4 text-center">
            Preferences Management
          </h2>

          {/* Sélecteur de catégorie */}
          <CategorySelect
            categories={categories}
            selectedId={selectedCategory?.id}
            onChange={(cat) => setSelectedCategory(cat)}
          />

          {/* Liste des préférences */}
          {selectedCategory && (
            <PreferencesList
              preferences={preferences}
              categoryId={selectedCategory.id}
              onAdd={handleAddPreference}
              onDelete={handleDeletePreference}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
