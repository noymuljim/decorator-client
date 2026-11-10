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
import MyBookings from "../pages/Dashboard/MyBookings/MyBookings";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled/PaymentCancelled";
import AllBookings from "../pages/Dashboard/AllBookings/AllBookings";
import PyamnetHistory from "../pages/Dashboard/Payment/PaymentHistory/PaymentHistory";
import BeDecorator from "../pages/Dashboard/BeDecorator/BeDecorator";
import ApproveDecorator from "../pages/Dashboard/ApproveDecorator/ApproveDecorator";
import UserManagement from "../pages/Dashboard/UserManagement/UserManagement";
import AdminRoute from "./AdminRoute";
import OrderAssign from "../pages/Dashboard/OrderAssign/OrderAssign";
import TaskAssigned from "../pages/Dashboard/TaskAssigned/TaskAssigned";
import DecoratorRoute from "./DecoratorRoute";
import Earnings from "../pages/Dashboard/Earnings/Earnings";
import Tracking from "../pages/Tracking/Tracking";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import MyServices from "../pages/Dashboard/MyServices/MyServices";
import UpdateService from "../pages/Dashboard/MyServices/UpdateService";
import Profile from "../pages/Home/Profile/Profile";

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
        path: 'profile',
        Component: Profile
      },
      {
        path: 'booking-track/:trackingId',
        Component: Tracking
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
        index: true,
        Component: DashboardHome
      },
      {
        path: 'addPackage',
        Component: Addpackage
      },
      {
        path: 'myBookings',
        Component: MyBookings
      },
      {
        path: 'allBookings',
        Component: AllBookings
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      {
        path: 'paymentHistory',
        Component: PyamnetHistory
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancelled
      },
      {
        path: 'approveDecorator',
        element: <AdminRoute><ApproveDecorator></ApproveDecorator></AdminRoute>
      },
      {
        path: 'userManagement',
        element: <AdminRoute><UserManagement></UserManagement></AdminRoute>
      },
      {
        path: 'orderAssign',
        element: <AdminRoute><OrderAssign></OrderAssign></AdminRoute>
      },
      {
        path: "my-services",
        element: <AdminRoute><MyServices></MyServices></AdminRoute>
      },
      {
        path: "update-service/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/services/${params.id}`),
        element: <AdminRoute><UpdateService></UpdateService></AdminRoute>
      },
      {
        path: 'taskAssigned',
        element: <DecoratorRoute><TaskAssigned></TaskAssigned></DecoratorRoute>
      },

      {
        path: 'myEarnings',
        element: <DecoratorRoute><Earnings></Earnings></DecoratorRoute>
      },
      {
        path: 'beDecorator',
        // Component: BeDecorator,
        element:<PrivateRoute><BeDecorator></BeDecorator></PrivateRoute>,
        loader: () => fetch('/serviceCenters.json').then(res => res.json())

      }
    ]
  }
]);