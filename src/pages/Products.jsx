import { useContext, useEffect, useState } from "react"
import { getBrands, getCategories, getProducts } from "../features/product/services/productService"
import LoaderContext from "../context/LoaderContext";
import ProductCard from "../features/product/components/ProductCard";
import Loader from "../shared/components/Loader";
import CategoryCard from "../features/product/components/CategoryCard";
import BrandCard from "../features/product/components/BrandCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState("");
  const {loading, showLoader, hideLoader} = useContext(LoaderContext);

  // Fetch Product List
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

  // Fetch Product Categories
  const fetchCategories = async () => {
    const result = await getCategories();
    return result.data;
  }

  useEffect(() => {
    const loadCategories = async () => {
      try {
        showLoader();
        const data = await fetchCategories();
        setCategories(data);
      } catch  {
        setError("Unable to fetch categories");
      }
      finally {
        hideLoader();
      }
    }

    loadCategories();
  }, [showLoader, hideLoader])

  // Fetch Brands
  const fetchBrands = async () => {
    const result = await getBrands();
    return result.data;
  }
  
  useEffect(() => {
    const loadBrands = async () => {
      try {
        showLoader();
        const data = await fetchBrands();
        setBrands(data);
      }
      catch {
        setError("Unable to fetch brands.")
      }
      finally {
        hideLoader();
      }
    }

    loadBrands();
  }, [showLoader, hideLoader])

  if (loading) return <Loader />;
  if (error) return <h2>{error}</h2>;
  if(products.length < 1) return <div className="w-[300px] h-[200px] mx-auto my-4 shadow-lg">
      <p className="h-full w-full p-5 flex items-center justify-center font-semibold">No products available.</p>
    </div>

  return (
    <section className="px-4 sm:px-6 lg:px-10 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-5">
          {/* Sidebar Filter Section */}
          <aside className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm lg:sticky lg:h-fit">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Filters</h2>

              <button
                type="button"
                className="text-sm font-medium text-orange-500 hover:text-orange-600"
              >
                Clear
              </button>
            </div>

            {/* Categories Section */}
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
                Categories
              </h3>

              <div className="space-y-3">
                {categories.map((category, index) => (
                  <CategoryCard key={`${category._id}${index}`} category={category} />
                ))}
              </div>
            </div>

            {/* Brands Section */}
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
                Brands
              </h3>

              <div className="space-y-3">
                {brands.map((brand, index) => (
                  <BrandCard key={`${brand._id}${index}`} brand={brand} />
                ))}
              </div>
            </div>
          </aside>

          {/* Product Section */}
          <div>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-xl font-semibold text-gray-800">Products</h1>

              <p className="text-sm text-gray-500">
                Showing products based on selected filters
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8">
              {
                products.map((product, index) => (
                  <ProductCard key={`${product.sold}${index}`} product={product} />
                ))
              }
            </div>
          </div>
        </div>
    </section>
  )
}

export default Products
