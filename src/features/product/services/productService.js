import axiosInstacne from "../../../api/axiosInstance";

// Fetch Products
export const getProducts = async (limit, page) => {
    const response = await axiosInstacne.get(`/products?limit=${limit}&page=${page}`);
    const data = await response.data;
    return data;
}

// Fetch Categories
export const getCategories = async () => {
    const response = await axiosInstacne.get('/categories');
    const data = await response.data;
    return data;
}

// Fetch Brands
export const getBrands = async () => {
    const response = await  axiosInstacne.get('/brands');
    const data = await response.data;
    return data;
}