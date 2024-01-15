import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "./Shared-Components.css";
import { Link } from "react-router-dom";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const CategorySlider = ({slideNumber}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("./Category.json")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

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
                to={`/${category?.categoryName}`}
                className="m-3 py-4 md:py-8 px-2 bg-slate-50 flex flex-col items-center shadow-md rounded-md"
              >
                <img
                  className="h-14 md:h-24 w-10 md:w-20"
                  src={category?.categoryImage}
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
