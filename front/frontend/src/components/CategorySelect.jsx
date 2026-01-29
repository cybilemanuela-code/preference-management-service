/**
 * Composant pour choisir une catégorie
 */
function CategorySelect({ categories, selectedId, onChange }) {
  return (
    <div className="mb-6">
      <label className="block mb-2 font-semibold text-gray-700">
        Choisir une catégorie
      </label>

      <select
        value={selectedId || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded-md"
      >
        <option value="">-- Sélectionner --</option>

        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategorySelect;