import { Link } from "react-router-dom";
import ShopByCategorySlider from "../../Shared-Components/Sliders/ShopByCategorySlider";

const ShopByCategory = () => {
    
    return (
        <div className="my-10 px-5">
            <div className="lg:w-10/12 mx-auto my-5 flex justify-between">
            <div className="flex items-center">
                <img className="h-8" src={"https://i.ibb.co/DgfPmg5/best-token.png"} alt="" />
                <h4 className="text-2xl ml-2 font-semibold">Shop By Category</h4>
                <p className="hidden md:block h-[1.5px] bg-[#b4b2b2] md:w-60 lg:w-96 ml-5 rounded-xl"></p>
            </div>
            <Link to={"/categories/beef"} className="text-blue-600">View All</Link>
        </div>
            <div className="hidden md:block">
            <ShopByCategorySlider slideNumber={4}></ShopByCategorySlider>
            </div>
            <div className="md:hidden">
            <ShopByCategorySlider slideNumber={2}></ShopByCategorySlider>
            </div>
        </div>
    );
};

export default ShopByCategory;