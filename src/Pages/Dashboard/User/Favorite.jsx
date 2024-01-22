import useFavorite from "../../../Hooks/useFavorite";
import { useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import Swal from "sweetalert2";
import useDatabaseUser from "../../../Hooks/useDatabaseUser";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useCart from "../../../Hooks/useCart";

const Favorite = () => {
    const [databaseUser] = useDatabaseUser()
    const axiosPublic = useAxiosPublic()
    const [favorite, reCheck] = useFavorite()
    const [, refetch] = useCart()
    const [addQuantity, setAddQuantity] = useState(1)
    const [loader, setLoader] = useState(false)

    const handleCart = (product) => {
        setLoader(true)
        const item = {
            productId: product?.productId,
            email: databaseUser?.email,
            productImage: product?.productImage,
            productName: product?.productName,
            weight: product?.weight,
            numberOfProducts: addQuantity,
            status: "pending",
            price: Math.round(product?.price * addQuantity)
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
                    reCheck()
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
        <div>
            <h3 className="text-3xl font-medium">My Favorite Products</h3>
            <ul className="mt-8">
                {
                    favorite?.map((product, idx) =>
                        <li key={idx} className="flex justify-between items-center space-x-2 border-b-2 pb-1 overflow-x-auto">
                            <div className="flex items-center space-x-2">
                                <img className="h-16 md:h-20 md:w-28 rounded-lg" src={product?.productImage} alt="" />
                                <h4>{product?.productName}</h4>
                            </div>
                            <div className="">
                                <p className="py-0.5 px-3 md:px-5 bg-slate-100 rounded-lg">Quantity: {product?.weight}</p>
                                <p className="py-0.5 px-3 md:px-5 bg-slate-100 rounded-lg">Price: <span className="text-2xl font-medium">{Math.round(product?.price * addQuantity)}</span> ৳</p>
                            </div>
                            <div className="ml-auto text-xl font-semibold border rounded-xl py-1 px-3 space-x-6 flex justify-between">
                                <button
                                    onClick={() => setAddQuantity(addQuantity - 1)}
                                    disabled={addQuantity <= 1}
                                    className={`focus:outline-none ${addQuantity <= 1 && 'opacity-50 cursor-not-allowed'}`
                                    }>-</button>
                                <p>{addQuantity}</p>
                                <button
                                    onClick={() => setAddQuantity(addQuantity + 1)}
                                    disabled={addQuantity >= product?.stock}
                                    className={`focus:outline-none ${addQuantity >= product?.stock && 'opacity-50 cursor-not-allowed'}`
                                    }> + </button>
                            </div>
                            <button onClick={()=> handleCart(product)} className="flex items-center hover:bg-[#fecd28] border-2 py-1 justify-center px-3 rounded-lg text-xl">
                                {
                                    loader || <><FaCartArrowDown className="mr-1"></FaCartArrowDown> Add to Cart</>
                                }
                                {
                                    loader && <p className="border-t rounded-xl border-black border-solid w-4 h-4 animate-spin"></p>
                                }
                            </button>
                        </li>)
                }
            </ul>
        </div>
    );
};

export default Favorite;