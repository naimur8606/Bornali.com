import { FaHome, FaShoppingCart, FaUser } from "react-icons/fa";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiMenu, } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { IoLogOutOutline } from "react-icons/io5";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { MdFavoriteBorder } from "react-icons/md";
// import Admin from "../Pages/Dashboard/Admin/Admin";
// import User from "../Pages/Dashboard/User/User";


const Dashboard = () => {
    const { user, logOut } = useAuth()
    const [menu, setMenu] = useState(false)
    const [userStatus, setUserStates] = useState('');
    const axiosPublic = useAxiosPublic();
    const location = useLocation().pathname
    useEffect(() => {
        axiosPublic(`/Users/${user?.email}`)
            .then(res => setUserStates(res.data.status))
    }, [axiosPublic, user])
    console.log(userStatus)
    const SignOut = () => {
        logOut()
            .then(
                Swal.fire({
                    title: 'Success!',
                    text: 'Logout Successfully',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            )
            .catch(error => {
                Swal.fire({
                    title: 'Warning!',
                    text: `${error.message}`,
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                })
            });
    }
    return (
        <div className="flex lg:w-10/12 mx-auto bg-white">
            <div className={`w-72 py-4 lg:py-8 min-h-screen bg-[#f1efef] text-gray-500 border text-lg duration-1000 z-50 lg:relative lg:left-0 top-0 absolute ${menu ? "left-0" : "-left-[1000px]"}`}>
                <ul className='menu p-4'>
                    <AiOutlineClose onClick={() => setMenu(false)} className="text-4xl mb-5 lg:hidden"></AiOutlineClose>
                    <li>
                        <NavLink onClick={() => setMenu(false)} to={`/dashboard`} className={`flex items-center p-1 hover:bg-slate-200 ${location === "/dashboard" && "bg-slate-200"}`}><FaUser className="mr-1"></FaUser>{userStatus === "Admin" ? 'Admin Profile' : 'My Profile'}</NavLink>
                    </li>
                    {
                        userStatus === "User" &&
                        <ul>
                            <li>
                                <NavLink to={"/dashboard/cart"} className={`flex items-center p-1 hover:bg-slate-200 ${location === "/dashboard/cart" && "bg-slate-200"}`}><FaShoppingCart className="mr-1"></FaShoppingCart>My Cart</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/dashboard/favorite"} className={`flex items-center p-1 hover:bg-slate-200 ${location === "/dashboard/favorite" && "bg-slate-200"}`}><MdFavoriteBorder className="mr-1"></MdFavoriteBorder>My Favorite</NavLink>
                            </li>
                        </ul>
                    }

                    <p className="h-0.5 bg-slate-500"></p>
                    <li>
                        <NavLink to={"/"} className="flex items-center p-1"><FaHome className="mr-1"></FaHome>Home</NavLink>
                    </li>
                    <li onClick={SignOut} className='flex items-center p-1 text-red-500 hover:bg-red-500 hover:text-white'><IoLogOutOutline className='mr-2'></IoLogOutOutline> Logout</li>
                </ul>
            </div>
            <div className="p-2 md:p-8 w-full min-h-screen bg-[#f4f6f9]">
                <BiMenu onClick={() => setMenu(true)} className="text-5xl my-2 lg:hidden"></BiMenu>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;