import { useRef, useState } from "react";
import Slider from "react-slick";
import "../Shared-Components.css";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import useCategories from "../../Hooks/useCategories";

const CategorySlider = ({slideNumber}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const [categories] = useCategories();
  const location = useLocation().pathname;
console.log(location)
  const settings = {
    slidesToShow: slideNumber,
    autoplay: true,
    arrows: false,
    afterChange: (index) => {
      setCurrentSlide(index);
    },
  };

  const handleSetPathClick = (x) => {
    const newSlideIndex = (currentSlide + x + categories.length) % categories.length;
    setCurrentSlide(newSlideIndex);
    sliderRef.current.slickGoTo(newSlideIndex);
  };

  return (
    <div className="flex w-full">
      <button
        className="text-3xl text-[#FECD28] hover:text-gray-400 font-medium mr-4 z-50"
        onClick={() => handleSetPathClick(-1)}
      >
        <IoIosArrowDropleft></IoIosArrowDropleft>
      </button>
      <div className="slick-container w-11/12 md:w-full mx-auto">
        <Slider ref={sliderRef} {...settings}>
          {categories?.map((category, idx) => (
            <div key={idx} className="">
              <Link
                to={`/categories/${category?.categoryName.toLowerCase()}`}
                className={`m-3 py-4 md:py-8 px-2 bg-slate-50 ${
                  location === `/categories/${category?.categoryName.toLowerCase()}` 
                    ? 'bg-[#fecd28]' 
                    : ''
                } hover:bg-[#fecd28] flex flex-col items-center shadow-md rounded-md`}
                
              >
                <img
                  className="h-14 md:h-24 w-10 md:w-20"
                  src={category?.logo}
                  alt=""
                />
                <h3 className="md:text-xl font-semibold">
                  {category?.categoryName}
                </h3>
              </Link>
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
  );
};

export default CategorySlider;
