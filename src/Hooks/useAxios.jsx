import axios from "axios";

const axiosInstance= axios.create({
   baseURL: 'https://stylede-backend.vercel.app'
})
const useAxios = () => {
       return axiosInstance;

};

export default useAxios;