import { createBrowserRouter } from "react-router";
import Rootlayout from "../layouts/rootlayout";
import Home from "../pages/Home/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
  Component: Rootlayout,
  children:[
    {
        index:true,
        Component: Home,
        loader: () => fetch('/public/serviceCenters.json').then(res => res.json())

    },
    
  ]
  },
]);