import { BsPerson, BsPersonX } from 'react-icons/bs'
import { CiLocationOn, CiSearch, CiShoppingCart } from "react-icons/ci";
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
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
                <Link to={'/'}>
                    {/* add logo or anything */}
                    <h2 className='text-2xl text-white font-bold'>Logo</h2>
                </Link>
                <div className='w-1/3 hidden md:block'>
                    <input
                        className='text-xl py-1 px-2 w-full rounded-md'
                        type="text"
                        name=""
                        id=""
                        placeholder={`\u{1F50E} Search Here`}
                    />
                </div>

                <ul className={`text-[#FECD28] flex items-center text-lg space-x-3`}>
                    <li className='md:hidden'>
                        <CiSearch className='text-[#fff] mr-1.5 font-extrabold'></CiSearch>
                    </li>
                    <li className='flex items-center md:border border-[#615f5f] py-1 pl-1 md:pr-3 rounded-md'>
                        <CiLocationOn className="mr-1.5 text-[#fff] md:text-[#FECD28]"></CiLocationOn> <p className='hidden md:block text-sm md:text-lg'>Location</p>
                    </li>
                    <li className='md:border border-[#615f5f] py-1 md:py-0.5 px-2 rounded-md text-lg'>
                        <CiShoppingCart className="md:text-3xl"></CiShoppingCart>
                    </li>

                    <li>
                        {user ?
                            <div className="flex items-center">
                                {user?.photoURL &&
                                    <img className="rounded-[50%] h-8 w-8 mr-2" src={user?.photoURL} alt="" />
                                }
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