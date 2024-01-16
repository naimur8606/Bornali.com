import { useRef, useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright, IoIosStar } from "react-icons/io";
import Slider from "react-slick";
import '../Shared-Components.css'

const OfferSliderSection = ({ products, sectionProperties, slideNumber }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);

    const settings = {
        dots:true,
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
                                <div className="bg-white rounded-lg shadow-lg">
                                    <div className="flex justify-between pt-6 px-3 md:px-5 pb-2">
                                        <div className="w-1/2 space-y-3">
                                            <h3 className="md:text-3xl lg:text-xl font-semibold">
                                                {product?.name}
                                            </h3>
                                            <div className="flex space-x-2 text-sm md:text-2xl lg:text-base">
                                                <p className="py-0.5 px-3 md:px-5 bg-slate-100 rounded-lg">{product?.weight}</p>
                                                <p className="py-0.5 px-3 md:px-5 bg-slate-100 rounded-lg">{product?.price} ৳</p>
                                            </div>
                                        </div>
                                        <img
                                            className="w-1/2 rounded-md"
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
                    className="text-3xl hidden lg:block text-[#FECD28] hover:text-gray-400 font-medium ml-4 z-50"
                    onClick={() => handleSetPathClick(1)}
                >
                    <IoIosArrowDropright></IoIosArrowDropright>
                </button>
            </div>
    );
};

export default OfferSliderSection;