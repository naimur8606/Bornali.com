import { useRef, useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright, IoIosStar } from "react-icons/io";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const OfferSliderSection = ({ products, sectionProperties, slideNumber }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);

    const settings = {
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
    return (
        <div className="bg-[#f4f6f9] pt-10 px-3 lg:px-0">
            <div className="lg:w-10/12 mx-auto my-5 flex justify-between">
                <div className="flex items-center">
                    <img className="h-8" src={sectionProperties?.image} alt="" />
                    <h4 className="text-2xl ml-2 font-semibold">{sectionProperties?.name}</h4>
                    <p className="hidden md:block h-[1.5px] bg-[#b4b2b2] md:w-60 lg:w-96 ml-5 rounded-xl"></p>
                </div>
                <Link to={sectionProperties?.link} className="text-blue-600">View All</Link>
            </div>
            <div className="flex w-full">
                <button
                    className="text-3xl text-[#FECD28] hover:text-gray-400 font-medium mr-4 z-50"
                    onClick={() => handleSetPathClick(-1)}
                >
                    <IoIosArrowDropleft></IoIosArrowDropleft>
                </button>
                <div className="slick-container w-11/12 md:w-full mx-auto">
                    <Slider ref={sliderRef} {...settings}>
                        {products?.map((product, idx) => (
                            <div key={idx} className="p-5">
                                <div className="bg-white rounded-lg shadow-lg">
                                    <div className="flex flex-col-reverse lg:flex-row justify-between  lg:pt-10 lg:px-5 pb-2">
                                        <div className="lg:w-1/2 space-y-3 lg:space-y-10 p-2 lg:p-0">
                                            <h3 className="md:text-3xl lg:text-xl font-semibold">
                                                {product?.name}
                                            </h3>
                                            <div className="flex space-x-2 md:text-2xl lg:text-base">
                                                <p className="py-0.5 px-5 bg-slate-100 rounded-lg">{product?.weight}</p>
                                                <p className="py-0.5 px-5 bg-slate-100 rounded-lg">{product?.price} ৳</p>
                                            </div>
                                        </div>
                                        <img
                                            className="w-full lg:w-1/2 rounded-t-md lg:rounded-md"
                                            src={product?.image}
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex space-x-2 md:space-x-8 items-center">
                                        <button className="text-4xl md:text-6xl lg:text-4xl font-bold px-8 md:px-20 lg:px-10 py-2 bg-[#FECD28] hover:text-white rounded-tr-md rounded-bl-md">+</button>
                                        <p className=" flex items-center py-0.5 px-5 bg-slate-100 rounded-lg font-bold md:text-2xl lg:text-base"><IoIosStar className="text-xl text-[#FECD28] mr-1"></IoIosStar>{product?.rating}</p>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
                <button
                    className="text-3xl text-[#FECD28] hover:text-gray-400 font-medium ml-4 z-50"
                    onClick={() => handleSetPathClick(1)}
                >
                    <IoIosArrowDropright></IoIosArrowDropright>
                </button>
            </div>
        </div>
    );
};

export default OfferSliderSection;