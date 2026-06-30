import { useContext, useEffect, useState } from "react"
import { getBrands, getCategories, getProducts } from "../features/product/services/productService"
import LoaderContext from "../context/LoaderContext";
import ProductCard from "../features/product/components/ProductCard";
import CategoryCard from "../features/product/components/CategoryCard";
import BrandCard from "../features/product/components/BrandCard";
import ProductContext from "../context/ProductContext";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductSkeletonGrid from "../features/product/components/ProductSkeletonGrid";
import ProductCardSkeleton from "../features/product/components/ProductCardSkeleton";

const Products = () => {
  const LIMIT = 12; // Initial product limit to render
  const {products, setProducts, setCategories, setBrands, filteredCategories, filteredBrands, filteredProducts, setFilter, page, setPage, hasMore, setHasMore} = useContext(ProductContext);
  const {loading, showLoader, hideLoader} = useContext(LoaderContext);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [error, setError] = useState("");

  // Show only fist 5 categories
  const visibleCategories = showAllCategories ? filteredCategories : filteredCategories.slice(0, 5);

  const handleCategoriesToggle = () => {
    setShowAllCategories(!showAllCategories);
  }

  // Show only first 5 brands
  const visibleBrands = showAllBrands ? filteredBrands : filteredBrands.slice(0, 5);

  const handleBrandToggle = () => {
    setShowAllBrands(!showAllBrands);
  }

  // Fetch Product List
  const fetchMoreProducts = async () => {
    try {
      const result = await getProducts(LIMIT, page);
      const data = result.data;

      // If no data comes back, tell the component to stop scrolling
      if (!data || data.length === 0) {
        setHasMore(false);
        return;
      }

      // Append new data to existing state and increment page count
      setProducts((prevItems) => [...prevItems, ...data]);

      if (data.length < LIMIT) {
        setHasMore(false);
      }

      setPage((prevPage) => prevPage + 1);
    }
    catch {
      setError("Failed to fetch products.");
    }
  }

  useEffect(() => {
      const loadInitialProducts = async () => {
        try {
          showLoader();
          const result = await getProducts(LIMIT, 1);
          const data = result.data;
          setProducts(data);

          if (data.length < LIMIT) {
            setHasMore(false);
          }

          setPage(2);
        }
        catch {
          setError("Failed to fetch products.");
        }
        finally {
          hideLoader();
        }
      };

      loadInitialProducts();
  }, [setPage, setProducts, setHasMore, showLoader, hideLoader])

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
  }, [showLoader, hideLoader, setCategories])

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
  }, [showLoader, hideLoader, setBrands])

  // Clear Filter Selection
  const handleClear = () => {
    setFilter({
        selectedCategories: [],
        selectedBrands: []
    })
  }

  if (loading) return <ProductCardSkeleton />;
  if (error) return <h2>{error}</h2>;

  return (
    <section className="px-4 sm:px-6 lg:px-10 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-5">
          {/* Sidebar Filter Section */}

          <aside className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm lg:sticky lg:h-fit">
            <div className="mb-5 flex items-center justify-between pb-2 border-b-2 border-b-orange-500">
              <h2 className="text-lg font-semibold text-gray-800">Filters</h2>

              <button
                type="button"
                className="cursor-pointer text-sm font-semibold text-orange-500 hover:text-orange-600"
                onClick={handleClear}
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
                {visibleCategories.map((category, index) => (
                  <CategoryCard key={`${category._id}${index}`} category={category} />
                ))}
              </div>
              <div className={`flex justify-end mt-3 ${visibleCategories.length < 5 ? 'hidden' : 'd-block'}`}>
                <button type="button" className="cursor-pointer text-sm text-orange-500 hover:text-orange-600 font-semibold" onClick={handleCategoriesToggle}>{showAllCategories ? 'Show Less' : 'Show More'}</button>
              </div>
            </div>

            {/* Brands Section */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
                Brands
              </h3>

              <div className="space-y-3">
                {visibleBrands.map((brand, index) => (
                  <BrandCard key={`${brand._id}${index}`} brand={brand} />
                ))}
              </div>
              <div className={`flex justify-end mt-3 ${visibleBrands.length < 5 ? 'hidden' : 'd-block'}`}>
                <button type="button" className="cursor-pointer text-sm text-orange-500 hover:text-orange-600 font-semibold" onClick={handleBrandToggle}>{showAllBrands ? 'Show Less' : 'Show More'}</button>
              </div>
            </div>
          </aside>

          {/* Product Section */}
          <div>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-xl font-semibold text-gray-800">Products (<span className="text-sm">{filteredProducts.length}</span>)</h1>

              <p className="text-sm text-gray-500">
                Showing products based on selected filters
              </p>
            </div>
            {
              (filteredProducts.length > 0)
              ? <InfiniteScroll
                dataLength={products.length}
                next={fetchMoreProducts}
                hasMore={hasMore}
                loader={<ProductSkeletonGrid count={4} />}
                endMessage={
                  <p className='py-6 text-center text-sm text-gray-400'>
                    No more products.
                  </p>
                }
                >
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8">
                    {
                      filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))
                    }
                  </div>
                </InfiniteScroll>
              : <div className="w-full h-52 mx-auto my-4 border border-gray-200 shadow-sm">
                  <div className="h-full w-full p-5 flex flex-col items-center justify-center font-semibold">
                    <p>No products available.</p>
                    <p>Please modify filter criteria.</p>
                  </div>
                </div>
            }
          </div>
        </div>
    </section>
  )
}

export default Products
