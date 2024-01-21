import { useLocation } from "react-router-dom";
import CategorySlider from "../../Shared-Components/Sliders/CategorySlider";
import useCategories from "../../Hooks/useCategories";
import Product from "../../Shared-Components/ProductStyle/Product";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import UpperArrow from "../../Shared-Components/Sliders/UpperArrow";
const DisplayByCategory = () => {
    const axiosPublic = useAxiosPublic()
    const [products, setProducts] = useState([])
    const [categories] = useCategories()
    const location = useLocation()?.pathname;
    function separateCategories(path) {
        var regex = /^\/categories\//;
        var result = path.replace(regex, '');
        return result;
    }
    useEffect(() => {
        axiosPublic.get(`/products/${separateCategories(location).toLowerCase()}`).then(data => setProducts(data?.data))
    }, [axiosPublic, location])
    const category = categories?.find(item => item?.categoryName.toLowerCase() === separateCategories(location))
    console.log(categories ,category)

    return (
        <div>
            <Helmet>
                <title>{`Bornali | ${category?.categoryName}`}</title>
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
            <div className="bg-slate-50 py-5 px-3 lg:px-0 min-h-screen">
                <div className="flex items-center lg:w-10/12 mx-auto p-3 rounded-lg bg-gradient-to-r from-[#fecd28] to-[#fff]">
                    <img className="h-12" src={category?.logo} alt="" />
                    <h4 className="text-2xl ml-2 font-semibold">{category?.categoryName}</h4>
                </div>
                <div className="lg:w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-5">
                    {
                        products?.map((product, idx) => <Product key={idx} product={product}></Product>)
                    }
                </div>
            </div>
                    <UpperArrow></UpperArrow>
        </div>
    );
};

export default DisplayByCategory;