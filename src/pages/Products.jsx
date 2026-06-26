import { useContext, useEffect, useState } from "react"
import { getProducts } from "../features/product/services/productService"
import LoaderContext from "../context/LoaderContext";
import Product from "../features/product/components/product";

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
    <div>
        {
          products.map((item, index) => (
            <Product key={`${item.sold}${index}`} item={item} />
          ))
        }
    </div>
  )
}

export default Products
