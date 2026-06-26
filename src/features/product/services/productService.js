import axiosInstacne from "../../../api/axiosInstance";

export const getProducts = async () => {
    const response = await axiosInstacne.get('/products');
    const data = await response.data;
    return data;
}