import { FaHome, FaListAlt, FaUser } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiMenu, } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Agent from "../Pages/Dashboard/Agent/Agent";
import Admin from "../Pages/Dashboard/Admin/Admin";
import User from "../Pages/Dashboard/User/User";


const Dashboard = () => {
    const { user, logOut } = useAuth()
    const [menu, setMenu] = useState(false)
    const [userStatus, setUserStates] = useState('');
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        axiosSecure(`/Users/specific/${user?.email}`)
            .then(res => setUserStates(res.data.status))
    }, [axiosSecure, user])

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
        <div className="flex">
            <div className={`w-72 py-4 lg:py-8 min-h-screen bg-[#535252] text-white text-lg duration-1000 z-50 lg:relative lg:left-0 top-0 absolute ${menu ? "left-0" : "-left-[1000px]"}`}>
                <ul className='menu p-4'>
                    <AiOutlineClose onClick={() => setMenu(false)} className="text-4xl mb-5 lg:hidden"></AiOutlineClose>
                    <li>
                        <NavLink onClick={() => setMenu(false)} to={`/dashboard/${user?.email}`}><FaUser></FaUser>{userStatus === "Admin" ? 'Admin Profile' : userStatus === 'Agent' ? "Agent Profile" : 'My Profile'}</NavLink>
                    </li>
                    {
                        userStatus === "Admin" &&
                        <>
                            <Admin setMenu={setMenu}></Admin>
                        </>
                    }
                    {
                        userStatus === 'Agent' &&
                        <>
                            <Agent setMenu={setMenu}></Agent>
                        </>
                    }
                    {
                        userStatus === 'User' &&
                        <>
                            <User setMenu={setMenu}></User>
                        </>
                    }
                    {
                        userStatus === 'Fraud' &&
                        <>
                            <li>Nothing For You...!</li>
                        </>
                    }
                    <p className="divider"></p>
                    <li>
                        <NavLink to={"/"}><FaHome></FaHome>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/properties"}><FaListAlt></FaListAlt>All Properties</NavLink>
                    </li>
                    <li onClick={SignOut} className="btn btn-outline btn-error mt-5">Log Out</li>
                </ul>
            </div>
            <div className="p-2 md:p-8 w-full">
                <BiMenu onClick={() => setMenu(true)} className="text-5xl my-2 lg:hidden"></BiMenu>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;