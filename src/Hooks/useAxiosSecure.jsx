import axios from "axios";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});
// runs once, not inside useEffect
axiosSecure.interceptors.request.use(async (config) => {
  const currentUser = getAuth().currentUser;
  if (currentUser) {
    const token = await currentUser.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { LogOut } = useAuth();

  useEffect(() => {
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          LogOut().then(() => navigate("/login"));
        } else if (statusCode === 403) {
          navigate("/forbidden");
        }
        return Promise.reject(error);
      }
    );
    return () => axiosSecure.interceptors.response.eject(resInterceptor);
  }, [navigate, LogOut]);

  return axiosSecure;
};

export default useAxiosSecure;