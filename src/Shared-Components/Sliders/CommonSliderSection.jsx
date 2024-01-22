import { useRef, useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright, IoIosStar } from "react-icons/io";
import Slider from "react-slick";
import '../Shared-Components.css'
import { Link } from "react-router-dom";
import useDatabaseUser from "../../Hooks/useDatabaseUser";
import useCart from "../../Hooks/useCart";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const OfferSliderSection = ({ products, sectionProperties, slideNumber }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);
    const [databaseUser] = useDatabaseUser()
    const [, refetch] = useCart()
    const axiosPublic = useAxiosPublic()
    const [loader, setLoader] = useState(false)

    const settings = {
        dots: true,
        slidesToShow: slideNumber,
        autoplay: true,
        arrows: false,
        afterChange: (index) => {
            setCurrentSlide(index);
        },
    };

    const handleSetPathClick = (x) => {
        const newSlideIndex = (currentSlide + x + products?.length) % products?.length;
        setCurrentSlide(newSlideIndex);
        sliderRef.current.slickGoTo(newSlideIndex);
    };

    const handleCart = (product) => {
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
        <div className="flex w-full lg:w-10/12 mx-auto">
            <button
                className="text-3xl hidden lg:block text-[#FECD28] hover:text-gray-400 font-medium mr-4 z-50"
                onClick={() => handleSetPathClick(-1)}
            >
                <IoIosArrowDropleft></IoIosArrowDropleft>
            </button>
            <div className="slick-container w-full">
                <Slider ref={sliderRef} {...settings}>
                    {products?.map((product, idx) => (
                        <div key={idx} className="md:p-5">
                            <div className="bg-white rounded-xl shadow-lg">
                                <div className="flex justify-between pt-6 px-3 md:px-5 pb-2">
                                    <div className="w-1/2 space-y-3">
                                        <Link to={`/products/${product?._id}`}>
                                            <h3 className="md:text-3xl lg:text-xl hover:text-[#fecd28] font-semibold">{product?.name}</h3>
                                        </Link>
                                        <div className="flex space-x-2 text-sm md:text-2xl lg:text-base">
                                            <p className="py-0.5 px-3 md:px-5 bg-slate-100 rounded-lg">{product?.weight}</p>
                                            <p className="py-0.5 px-3 md:px-5 bg-slate-100 rounded-lg">{product?.price} ৳</p>
                                        </div>
                                    </div>
                                    <div className="w-1/2">
                                        <Link to={`/products/${product?._id}`}>
                                            <img className=" h-full rounded-md" src={product?.image} alt="" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex space-x-2 md:space-x-8 items-center">
                                    <button onClick={()=> handleCart(product)} className="text-4xl md:text-6xl lg:text-4xl font-bold px-8 md:px-20 lg:px-10 py-1 bg-[#FECD28] hover:text-white rounded-tr-xl rounded-bl-xl">
                                        {
                                            loader || <>+</>
                                        }
                                        {
                                            loader && <p className="border-t rounded-xl border-black border-solid w-4 h-4 animate-spin"></p>
                                        }
                                    </button>
                                    <p className=" flex items-center py-0.5 px-5 bg-slate-100 rounded-lg font-bold md:text-2xl lg:text-base"><IoIosStar className="text-xl text-[#FECD28] mr-1"></IoIosStar>{product?.rating}</p>

                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            <button
                className="text-3xl hidden lg:block text-[#FECD28] hover:text-gray-400 font-medium ml-4 z-50"
                onClick={() => handleSetPathClick(1)}
            >
                <IoIosArrowDropright></IoIosArrowDropright>
            </button>
        </div>
    );
};

export default OfferSliderSection;