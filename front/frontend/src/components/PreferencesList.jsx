import React, { useState } from "react";

function PreferencesList({ preferences, onAdd, onDelete }) {
  const [newValue, setNewValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newValue.trim()) return;

    // ⚠️ Appelle la fonction onAdd avec la valeur saisie
    onAdd(newValue);

    // Réinitialiser le champ
    setNewValue("");
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Préférences</h3>
      <ul className="mb-4">
        {preferences.map((pref) => (
          <li key={pref.id} className="flex justify-between items-center mb-2">
            <span>{pref.value}</span>
            <button
              onClick={() => onDelete(pref.id)}
              className="text-red-500 hover:text-red-700"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      {/* Formulaire pour ajouter une nouvelle préférence */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="Nouvelle préférence"
          className="border border-gray-300 rounded px-2 py-1 flex-1"
        />

        <button
          type="submit"
          className="bg-primaryBlue text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default PreferencesList;
