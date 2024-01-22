import { BsPerson } from 'react-icons/bs'
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../Hooks/useAuth';
import { IoLogOutOutline, IoPersonSharp } from "react-icons/io5";
import './Shared-Components.css'
import { useState } from 'react';
import useCart from '../Hooks/useCart';
import useDatabaseUser from '../Hooks/useDatabaseUser';

const Navbar = () => {
    const [databaseUser] = useDatabaseUser()
    const [cart] = useCart()
    const { logOut } = useAuth()
    const [menu, setMenu] = useState(false)
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
        <div className="bg-[#25262B]">
            <div className='lg:w-10/12 mx-auto py-2 md:py-4 px-3 flex justify-between items-center'>
                <Link className='md:w-1/3' to={'/'}>
                    {/* add logo or anything */}
                    <img className='h-10' src="https://i.ibb.co/Pw6K25C/bornali-dflt-logo-removebg-preview.png" alt="" />
                </Link>
                <div className='md:w-1/3 hidden md:block'>
                    <input
                        className='text-xl py-1 px-2 w-full rounded-md'
                        type="text"
                        name=""
                        id=""
                        placeholder={`\u{1F50E} Search Here`}
                    />
                </div>

                <ul className={`md:w-1/3 text-[#FECD28] flex justify-end items-center text-lg space-x-3 relative`}>
                    <li className='md:hidden'>
                        <CiSearch className='text-[#fff] mr-1.5 font-extrabold'></CiSearch>
                    </li>
                    <li className='md:border border-[#615f5f] py-1 md:py-0.5 px-2 rounded-md text-lg relative'>
                        <Link to={"/dashboard/cart"}>
                            <CiShoppingCart className="md:text-3xl"></CiShoppingCart><p className='absolute -top-2 -right-2 px-1 text-xs text-black font-semibold bg-[#fecd28] rounded-full'>{cart?.length}</p>
                        </Link>
                    </li>

                    <li>
                        {databaseUser ?
                            <div onClick={() => setMenu(!menu)} className='flex items-center border-b border-[#615f5f]'>
                                <div className=''>
                                    {
                                        databaseUser?.photoURL ? <img className="rounded-lg h-8 w-8 mr-2" src={databaseUser?.photoURL} alt="" /> : <IoPersonSharp className='text-2xl text-gray-50 mr-1'></IoPersonSharp>
                                    }
                                </div>

                                <div className='hidden lg:block'>
                                    <p className='text-xs text-gray-300'>Welcome back</p>
                                    <h5 className='text-base text-white'>{databaseUser?.name}</h5>
                                </div>
                                <ul className={`w-44 md:w-64 absolute right-0 top-10 md:top-13 bg-[#25262B] text-center rounded-md z-50 ${menu || "hidden"}`}>
                                    <li>
                                        <Link to={"/dashBoard"} className='flex justify-center items-center py-1 hover:bg-gray-700'>
                                            <IoPersonSharp className='rounded-full'></IoPersonSharp> <span className='text-white ml-2'>Profile</span>
                                        </Link>
                                    </li>
                                    <li onClick={SignOut} className='flex justify-center items-center py-1 hover:bg-gray-700 text-red-500'><IoLogOutOutline className='mr-2'></IoLogOutOutline> Logout</li>
                                </ul>
                            </div>
                            :
                            <Link to={"/login"} className='flex items-center border border-[#615f5f] py-1 pl-1 pr-3 rounded-md'>
                                <BsPerson className="mr-1.5"></BsPerson>
                                <p className='text-sm md:text-lg'>Sing In</p>
                            </Link>
                        }
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;