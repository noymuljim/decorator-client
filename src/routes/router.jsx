import { createBrowserRouter } from "react-router";
import Rootlayout from "../layouts/rootlayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Addpackage from "../pages/Dashboard/Addpackage/Addpackage";
import AllServicesData from "../pages/Home/ServicesData/AllServiceData";
import ServiceDetails from "../pages/Home/ServicesData/ServiceDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Rootlayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: () => fetch('/serviceCenters.json').then(res => res.json())

      },
      {
        path: 'allServices',
        Component: AllServicesData
      },
      {
        path: "/serviceDetails/:id",
        element: <ServiceDetails />,
                loader: () => fetch('/serviceCenters.json').then(res => res.json())


      },
      
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register

      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: 'addPackage',
        Component: Addpackage
      }
    ]
  }
]);