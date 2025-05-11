"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package } from "lucide-react"

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        
        if (data.success) {
          setProducts(data.data);
        } else {
          setError("Failed to fetch products");
        }
      } catch (err) {
        setError("An error occurred while fetching products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-slate-100 flex items-center text-base">
          <Package className="mr-2 h-5 w-5 text-cyan-500" />
          Products
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4">Loading products...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-400">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center py-4">No products found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => (
              <div key={product._id} className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                <h3 className="text-slate-300 font-medium">{product.name}</h3>
                <p className="text-slate-400 text-sm mt-1">{product.description}</p>
                <div className="mt-2 text-cyan-400 font-mono">${product.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}