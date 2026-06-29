import { createContext, useMemo, useState } from "react";

const ProductContext = createContext();

export const ProductContextProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const [filter, setFilter] = useState({
        selectedCategories: [],
        selectedBrands: []
    })

    // Display Categories for the products which are visible on screen
    const filteredCategories = useMemo(() => {
        if(products.length === 0 || categories.length === 0) {
            return []
        }

        const productCategories = new Set(
            products.map((p) => p.category._id)
        );

        return categories.filter((c) => {
            if(productCategories.has(c._id)) {
                return c;
            }
        })
    }, [products, categories])

    // Dispaly Brands for the products which are visible on screen
    const filteredBrands = useMemo(() => {
        if(products.length === 0 || brands.length === 0) {
            return []
        }

        const productBrands = new Set(
            products.map((p) => p.brand._id)
        );

        return brands.filter((b) => {
            if(productBrands.has(b._id)) {
                return b;
            }
        })
    }, [products, brands])

    // Filtered Products List
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchedCategory = filter.selectedCategories.length === 0 || filter.selectedCategories.includes(product.category._id);
            const matchedBrand = filter.selectedBrands.length === 0 || filter.selectedBrands.includes(product.brand._id);

            return matchedCategory && matchedBrand;
        })
    }, [products, filter])
    
    const value = useMemo(() => {
        return {
            products, setProducts, categories, setCategories, brands, setBrands, filteredCategories, filteredBrands, filter, setFilter, filteredProducts
        }
    }, [products, categories, brands, filteredCategories, filteredBrands, filter, filteredProducts])

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export default ProductContext;