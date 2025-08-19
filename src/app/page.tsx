import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { ProductList } from "@/components/ProductList";
import { apiFetch } from "@/lib/api";
import { Product } from "@/types";

async function getProduct(): Promise<Product[]> {
  const res = await apiFetch("/api/products");

  if (res.status === 404) {
    return [];
  }
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

export default async function Home() {
  const products = await getProduct();
  return (
    <main className="p-8">
      <Hero />
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      {products.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <ProductList products={products} />
      )}
      <Footer />
    </main>
  );
}
