import axios from "axios";

const axiosInstance= axios.create({
   baseURL: 'https://style-server.vercel.app'
})


const useAxios = () => {
       return axiosInstance;

};

export default useAxios;