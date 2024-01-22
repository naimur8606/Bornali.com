import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import CreateUser from "../Pages/Create&Login/CreateUser";
import Login from "../Pages/Create&Login/Login";
import Home from "../Pages/Home/Home";
import DisplayByCategory from "../Pages/DisplayByCategory/DisplayByCateroty";
import DisplayByOffer from "../Pages/DisplayByOffer/DisplayByOffer";
import DisplayProduct from "../Pages/DisplayProduct/DisplayProduct";
import ForgotPass from "../Pages/Create&Login/ForgotPass";
import Dashboard from "../Layouts/Dashboard";
import Profile from "../Pages/Dashboard/Profile";
import EditProfile from "../Pages/Dashboard/EditProfile";
import PrivateRoute from "./PrivateRoute";
import Cart from "../Pages/Dashboard/User/Cart";
import Favorite from "../Pages/Dashboard/User/Favorite";
// import ErrorPage from "../Pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    // errorElement:<ErrorPage></ErrorPage> ,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/categories/:name",
        element: <DisplayByCategory></DisplayByCategory>,
      },
      {
        path: "/offerBy/:name",
        element: <DisplayByOffer></DisplayByOffer>,
      },
      {
        path: "/products/:id",
        element: <DisplayProduct></DisplayProduct>
      },
      {
        path: '/registration',
        element: <CreateUser></CreateUser>
      },
      {
        path: '/Login',
        element: <Login></Login>
      },
      {
        path: '/forgetPassword',
        element: <ForgotPass></ForgotPass>
      },
      {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute> ,
        children:[
          {
            path:"/dashboard",
            element: <Profile></Profile>
          },
          {
            path:"/dashboard/editProfile",
            element: <EditProfile></EditProfile>
          },
          {
            path:"/dashboard/cart",
            element: <Cart></Cart>
          },
          {
            path:"/dashboard/favorite",
            element: <Favorite></Favorite>
          },
        ]
      },
    ]
  }
]);
export default router;