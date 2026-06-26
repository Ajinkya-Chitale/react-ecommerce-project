import axios from "axios";

const axiosInstacne = axios.create({
    baseURL: 'https://ecommerce.routemisr.com/api/v1'
})

export default axiosInstacne;