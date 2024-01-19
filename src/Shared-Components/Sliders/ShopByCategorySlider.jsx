import { useEffect, useRef, useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright, IoIosStar } from "react-icons/io";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const ShopByCategorySlider = ({ slideNumber }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("./Category.json")
            .then((res) => res.json())
            .then((data) => setCategories(data));
    }, []);

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
        const newSlideIndex = (currentSlide + x + categories?.length) % categories?.length;
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
                    {categories?.map((category, idx) => (
                        <div key={idx} className="p-3">
                            <Link to={`/categories/${category?.categoryName}`} className="rounded-lg shadow-lg">
                                <div className="relative text-white category-slider hover:text-[#fecd28] overflow-visible">
                                    <img
                                        className="rounded-md transition-transform duration-300 transform hover:scale-110"
                                        src={category?.categoryImage}
                                        alt=""
                                    />
                                    <div className="absolute bottom-0 pb-5 h-full w-full rounded-md flex justify-center items-end" style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%)' }}>
                                        <p className="text-2xl font-bold">{category?.categoryName}</p>
                                    </div>
                                </div>
                            </Link>
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

export default ShopByCategorySlider;