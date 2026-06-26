import { useContext, useEffect, useState } from "react"
import { getProducts } from "../features/product/services/productService"
import LoaderContext from "../context/LoaderContext";
import ProductCard from "../features/product/components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const {loading, showLoader, hideLoader} = useContext(LoaderContext);

  const fetchProducts = async () => {
    const result = await getProducts();
    return result.data;
  }

  useEffect(() => {
      const loadProducts = async () => {
        try {
          showLoader();
          const data = await fetchProducts();
          setProducts(data);
        }
        catch {
          setError("Failed to fetch products.");
        }
        finally {
          hideLoader();
        }
      }

      loadProducts();
  }, [showLoader, hideLoader])

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <section className="px-4 sm:px-6 lg:px-10 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
          {
            products.map((product, index) => (
              <ProductCard key={`${product.sold}${index}`} product={product} />
            ))
          }
          </div>
    </section>
  )
}

export default Products
