import './Home.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CategorySlider from '../../Shared-Components/Sliders/CategorySlider';
import { Link } from 'react-router-dom';
// import Responsive from '../../Shared-Components/MySlider';

const Banner = () => {

  return (
    <div className="">
      <div className='relative text-center'>
        <img
          className='h-60 md:h-80 lg:h-[420px]'
          src="https://www.bengalmeat.com/_next/static/media/main_cover.d3667d78.png"
          alt=""
        />
        <div className='absolute top-0 pt-5 lg:pt-14 h-60 md:h-80 lg:h-[420px] text-center w-full md:space-y-3 bg-[#00000033]'>
          <h2 className='text-[#FECD28] text-4xl md:text-5xl font-semibold'>BANGLADESH’S</h2>
          <h3 className='text-[#FECD28] text-3xl md:text-4xl font-normal'>First & Only</h3>
          <h3 className='text-[#FFF] text-2xl md:text-3xl font-semibold'>International Standard Abattoir</h3>
          <div className='mt-4'>
            <Link to={"/"} className='bg-[#FECD28] p-2 rounded-md text-xl'>Start Shopping Now</Link>
          </div>
        </div>
      </div>
      <div className='lg:w-10/12 mx-auto'>
        <div className='-mt-24 lg:-mt-28 hidden lg:block'>
          <CategorySlider slideNumber={5}></CategorySlider>
        </div>
        <div className='-mt-24 hidden md:block lg:hidden'>
          <CategorySlider slideNumber={3}></CategorySlider>
        </div>
        <div className='-mt-16 md:hidden'>
          <CategorySlider slideNumber={2}></CategorySlider>
        </div>
      </div>
    </div>
  );
};

export default Banner;
