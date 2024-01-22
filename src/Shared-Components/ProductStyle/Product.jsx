import { FaCartArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import useDatabaseUser from "../../Hooks/useDatabaseUser";
import useCart from "../../Hooks/useCart";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";
import Swal from "sweetalert2";

const Product = ({ product }) => {
    const [databaseUser] = useDatabaseUser()
    const [, refetch] = useCart()
    const axiosPublic = useAxiosPublic()
    const [loader, setLoader] = useState(false)
    const handleCart = () => {
        setLoader(true)
        const item = {
            productId: product?._id,
            email: databaseUser?.email,
            productImage: product?.image,
            productName: product?.name,
            weight: product?.weight,
            numberOfProducts: 1,
            status: "pending",
            price: Math.round(product?.price)
        }
        axiosPublic.post('/CartProducts', item)
            .then(data => {
                if (data.data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: `${product?.name} add on Your cart`,
                        icon: 'success',
                        confirmButtonText: 'Yaaah'
                    })
                    refetch()
                    setLoader(false)
                } else {
                    Swal.fire({
                        title: 'Warning!',
                        text: 'You are already select it..!',
                        icon: 'warning',
                        confirmButtonText: 'Ok'
                    })
                    setLoader(false)

                }
            })
            .catch(err => {
                Swal.fire({
                    title: 'Warning!',
                    text: `${err.message}`,
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                })
                setLoader(false)
            })
    }
    return (
        <div className="shadow-lg rounded-lg bg-white">
            <Link to={`/products/${product?._id}`}>
                <img className="h-60 w-full rounded-t-lg" src={product?.image} alt="" />
            </Link>
            <div className="space-y-3 px-2 py-5">
                <Link to={`/products/${product?._id}`}>
                    <h3 className="text-2xl hover:text-[#fecd28] font-medium">{product?.name}</h3>
                </Link>
                <div className="flex space-x-2 md:text-lg lg:text-base">
                    <p className="py-0.5 px-3 md:px-5 bg-slate-100 rounded-lg">{product?.weight}</p>
                    <p className="py-0.5 px-3 md:px-5 bg-slate-100 rounded-lg">{product?.price} ৳</p>
                    <button onClick={handleCart} className="flex items-center bg-[#fecd28] py-0.5 px-3 rounded-lg">
                        {
                            loader || <><FaCartArrowDown className="mr-1"></FaCartArrowDown> Add to Cart</>
                        }
                        {
                            loader && <p className="border-t rounded-xl border-black border-solid w-4 h-4 animate-spin"></p>
                        }
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Product;