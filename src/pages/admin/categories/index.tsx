import { useState, useEffect } from "react";
import Image from "next/image";
import { uploadCategoryImage } from "@/lib/supabase-storage";

interface Category {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
}

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    try {
      setUploading(true);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      const { publicUrl } = await uploadCategoryImage(file);
      setNewCategory((prev) => ({ ...prev, imageUrl: publicUrl }));
    } catch (err) {
      setError("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  // Add or Update category
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = editMode ? "PUT" : "POST";
    const url = "/api/categories";
    const payload = editMode ? { ...newCategory, id: editingId } : newCategory;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 200 || response.status === 201) {
        alert("✅ Category saved successfully.");
        setNewCategory({ name: "", description: "", imageUrl: "" });
        setPreviewUrl(null);
        setEditMode(false);
        setEditingId(null);
        fetchCategories();
      } else {
        alert("❌ Error: Please contact the administrator.");
      }
    } catch (err) {
      setError("Failed to save category");
      alert("❌ Error: Please contact the administrator.");
    }
  };

  // Delete category
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        alert("🗑️ Category deleted successfully.");
        fetchCategories();
      } else {
        alert("❌ Error: Please contact the administrator.");
      }
    } catch (err) {
      setError("Failed to delete category");
      alert("❌ Error: Please contact the administrator.");
    }
  };

  // Start editing
  const handleEdit = (category: Category) => {
    setEditMode(true);
    setEditingId(category.id);
    setNewCategory({
      name: category.name,
      description: category.description || "",
      imageUrl: category.imageUrl || "",
    });
    setPreviewUrl(category.imageUrl || null);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditingId(null);
    setNewCategory({ name: "", description: "", imageUrl: "" });
    setPreviewUrl(null);
  };

  if (loading)
    return <div className="p-4 text-center text-gray-500">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl font-sans mt-18">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#F0E0C8] bg-[#580F09] py-4">
        📂 Categories Admin
      </h1>

      {/* Add / Edit Category Form */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          {editMode ? "Edit Category" : "Add New Category"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={newCategory.description ?? ""}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-3 py-2 border rounded focus:outline-none"
                disabled={uploading}
              />
              {uploading && (
                <p className="text-sm text-blue-500 mt-1">Uploading...</p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-start mt-4 md:mt-0">
            {previewUrl && (
              <Image
                src={previewUrl}
                alt="Preview"
                width={200}
                height={200}
                className="rounded-lg border object-cover"
              />
            )}
          </div>

          <div className="md:col-span-2 flex justify-between gap-4">
            <button
              type="submit"
              disabled={uploading}
              className={`w-full bg-[#580F09] text-white font-semibold py-2 px-4 rounded hover:bg-[#580F09] transition duration-200 ${
                uploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {editMode ? "Update Category" : "Add Category"}
            </button>

            {editMode && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="w-full bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <h2 className="text-2xl font-semibold p-6 border-b">Categories List</h2>
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-xs text-gray-600 uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4">{category.name}</td>
                <td className="px-6 py-4">{category.description || "-"}</td>
                <td className="px-6 py-4">
                  {category.imageUrl && (
                    <div className="w-16 h-16 relative">
                      <Image
                        src={category.imageUrl}
                        alt={category.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 space-x-4">
                  <button
                    onClick={() => handleEdit(category)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
