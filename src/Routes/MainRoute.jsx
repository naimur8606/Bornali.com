import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import CreateUser from "../Pages/Create&Login/CreateUser";
import Login from "../Pages/Create&Login/Login";
import Home from "../Pages/Home/Home";
import DisplayByCategory from "../Pages/DisplayByCategory/DisplayByCateroty";
import DisplayByOffer from "../Pages/DisplayByOffer/DisplayByOffer";
// import ErrorPage from "../Pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      // errorElement:<ErrorPage></ErrorPage> ,
      children:[
        {
          path:"/",
          element: <Home></Home> 
        },
        {
          path:"/categories/:name",
          element: <DisplayByCategory></DisplayByCategory>,
        },
        {
          path:"/offerBy/:name",
          element: <DisplayByOffer></DisplayByOffer>,
        }
      ]
    },
    {
      path:'/registration',
      element:<CreateUser></CreateUser>
    },
    {
      path:'/Login',
      element:<Login></Login>
    },
  ]);
  export default router;