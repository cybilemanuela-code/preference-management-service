import { useState } from "react";

/**
 * Liste des préférences d’une catégorie
 */
function PreferencesList({ preferences, onAdd, onDelete, categoryId }) {
  const [newPref, setNewPref] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!newPref) return;

    onAdd({
      name: newPref,
      category_id: categoryId,
    });

    setNewPref("");
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Préférences</h2>

      <ul className="mb-4 space-y-2">
        {preferences.map((pref) => (
          <li
            key={pref.id}
            className="flex justify-between items-center bg-gray-100 p-2 rounded"
          >
            <span>{pref.name}</span>

            <button
              onClick={() => onDelete(pref.id)}
              className="text-red-500 hover:text-red-700"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      {/* Formulaire ajout */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newPref}
          onChange={(e) => setNewPref(e.target.value)}
          placeholder="Nouvelle préférence"
          className="flex-1 p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default PreferencesList;