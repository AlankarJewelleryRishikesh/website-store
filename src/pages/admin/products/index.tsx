import { useState, useEffect } from "react";
import Image from "next/image";
import { uploadProductImage } from "@/lib/supabase-storage";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
}

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    categoryId: "",
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/categories"),
        ]);

        if (!productsRes.ok || !categoriesRes.ok)
          throw new Error("Failed to fetch data");

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    try {
      setUploading(true);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      const { publicUrl } = await uploadProductImage(file);
      setNewProduct((prev) => ({ ...prev, imageUrl: publicUrl }));
    } catch (err) {
      setError("Failed to upload image");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newProduct,
          price: parseFloat(newProduct.price) || 0,
        }),
      });

      if (response.status === 201) {
        const data = await response.json();
        setProducts((prev) => [...prev, data]);

        alert("✅ Product added successfully.");

        setNewProduct({
          name: "",
          description: "",
          price: "",
          imageUrl: "",
          categoryId: "",
        });
        setPreviewUrl(null);
      } else {
        alert("❌ Error: Please contact the administrator.");
      }
    } catch (err) {
      setError("Failed to create product");
      alert("❌ Error: Please contact the administrator.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        setProducts(products.filter((product) => product.id !== id));
        alert("🗑️ Product deleted successfully.");
      } else {
        alert("❌ Error: Please contact the administrator.");
      }
    } catch (err) {
      setError("Failed to delete product");
      alert("❌ Error: Please contact the administrator.");
    }
  };

  if (loading)
    return <div className="p-4 text-center text-gray-500">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl font-sans mt-18">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#F0E0C8] bg-[#580F09] py-4">
        🛍️ Products Admin
      </h1>

      {/* Add Product Form */}
      <div className="p-6 rounded-xl shadow-md mb-10 bg-[#FCF5F3]">
        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
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
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="number"
                step="0.01"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                // removed required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={newProduct.categoryId}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, categoryId: e.target.value })
                }
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#1A3633] focus:outline-none"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-3 py-2 border rounded focus:outline-none"
                required
                multiple={false}
              />
              {uploading && (
                <p className="text-sm text-blue-500 mt-1">Uploading...</p>
              )}
            </div>

            {previewUrl && (
              <div className="mt-4">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  width={250}
                  height={250}
                  className="rounded-lg border object-cover"
                />
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={uploading}
              className={`w-full bg-[#580F09] text-white font-semibold py-2 px-4 rounded hover:bg-[#580F09] transition duration-200 ${
                uploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <h2 className="text-2xl font-semibold p-6 border-b">Products List</h2>
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-xs text-gray-600 uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4">
                  {product.imageUrl && (
                    <div className="w-16 h-16 relative">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  {categories.find((c) => c.id === product.categoryId)?.name ||
                    "Unknown"}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(product.id)}
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
