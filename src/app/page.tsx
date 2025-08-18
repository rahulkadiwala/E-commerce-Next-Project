import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { ProductList } from "@/components/ProductList";
import { apiFetch } from "@/lib/api";
import { Product } from "@/types";

async function getProduct(): Promise<Product[]> {
  const res = await apiFetch("/api/products");
  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
}

export default async function Home() {
  const products = await getProduct();
  return (
    <main className="p-8">
      <Hero />
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      <ProductList products={products} />
      <Footer />
    </main>
  );
}
