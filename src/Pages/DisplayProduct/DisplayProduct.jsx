import { Helmet } from "react-helmet-async";
import CategorySlider from "../../Shared-Components/Sliders/CategorySlider";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaCartArrowDown } from "react-icons/fa";
import Swal from "sweetalert2";
import { MdFavoriteBorder } from "react-icons/md";
import useDatabaseUser from "../../Hooks/useDatabaseUser";
import useCart from "../../Hooks/useCart";

const DisplayProduct = () => {
    const [databaseUser] = useDatabaseUser()
    const [, refetch] = useCart()
    const axiosPublic = useAxiosPublic()
    const [product, setProduct] = useState({})
    const [loader, setLoader] = useState(false)
    const [addQuantity, setAddQuantity] = useState(1)
    const productId = useParams()?.id;
    
    useEffect(() => {
        axiosPublic.get(`/singleProduct/${productId}`).then(data => setProduct(data?.data))
    }, [axiosPublic, productId])

    const handleCart = () => {
        setLoader(true)
        const item = {
            productId: product?._id,
            email: databaseUser?.email,
            productImage: product?.image,
            productName: product?.name,
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
    const handleFavoriteProducts = () => {
        setLoader(true)
        const item = {
            productId: product?._id,
            email: databaseUser?.email,
            productImage: product?.image,
            productName: product?.name,
            weight: product?.weight,
            price: product?.price
        }
        axiosPublic.post('/favoriteProducts', item)
            .then(data => {
                if (data.data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: `${product?.name} add on Your Favorite Products list`,
                        icon: 'success',
                        confirmButtonText: 'Yaaah'
                    })
                    refetch()
                    setLoader(false)
                } else {
                    Swal.fire({
                        title: 'Warning!',
                        text: `You are already added ${product?.name} on Your Favorite Products list !`,
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
        <div className="">
            <Helmet>
                <title>{`Bornali | ${product?.name}`}</title>
            </Helmet>

            <div className='lg:w-10/12 mx-auto my-10 px-3 lg:px-0'>
                <div className='hidden lg:block'>
                    <CategorySlider slideNumber={5}></CategorySlider>
                </div>
                <div className='hidden md:block lg:hidden'>
                    <CategorySlider slideNumber={3}></CategorySlider>
                </div>
                <div className='md:hidden'>
                    <CategorySlider slideNumber={2}></CategorySlider>
                </div>
            </div>

            <div className="lg:w-10/12 mx-auto my-5 px-3 lg:px-0">
                <div className="flex flex-col md:flex-row md:space-x-5">
                    <img src={product?.image} alt="" />
                    <div className="space-y-5 px-2 py-5">
                        <h3 className="text-2xl hover:text-[#fecd28] font-medium">{product?.name}</h3>
                        <div className="flex justify-between space-x-2 md:text-lg">
                            <p className="py-0.5 px-3 md:px-5 bg-slate-100 rounded-lg">Quantity: {product?.weight}</p>
                            <p className="py-0.5 px-3 md:px-5 bg-slate-100 rounded-lg">Price: <span className="text-2xl font-medium">{Math.round(product?.price * addQuantity)}</span> ৳</p>
                        </div>
                        <div className="flex">
                            <p className=" text-xl font-semibold">Stock: {product?.stock}</p>
                            <div className="w-2/5 ml-auto text-xl font-semibold border rounded-xl py-1 px-3 space-x-4 flex justify-between">
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
                        </div>
                        <div className="flex flex-col lg:flex-row justify-between space-y-3 lg:space-y-0 lg:space-x-2">
                            <button onClick={handleCart} className="flex items-center hover:bg-[#fecd28] border-2 py-1 justify-center px-3 rounded-lg text-xl">
                                {
                                    loader || <><FaCartArrowDown className="mr-1"></FaCartArrowDown> Add to Cart</>
                                }
                                {
                                    loader && <p className="border-t rounded-xl border-black border-solid w-4 h-4 animate-spin"></p>
                                }
                            </button>
                            <button onClick={handleFavoriteProducts} className="flex items-center hover:bg-[#fecd28] border-2 py-1 justify-center px-3 rounded-lg text-xl">
                                {
                                    loader || <><MdFavoriteBorder className="mr-1"></MdFavoriteBorder> Add to Favorite</>
                                }
                                {
                                    loader && <p className="border-t rounded-xl border-black border-solid w-4 h-4 animate-spin"></p>
                                }
                                </button>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <h3 className="text-2xl font-medium">Additional Information</h3> <hr />
                    <div className="mt-3">
                        {product?.additionalInformation}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DisplayProduct;