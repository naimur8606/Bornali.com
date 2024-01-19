import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useCategories from "../../Hooks/useCategories";
import { useLocation } from "react-router-dom";
import Product from "../../Shared-Components/Product";

const DisplayByOffer = () => {
    const axiosPublic = useAxiosPublic()
    const [products, setProducts] = useState([])
    const location = useLocation()?.pathname;
    console.log(location)
    function separateCategories(path) {
        var regex = /^\/offerBy\//;
        var result = path.replace(regex, '');
        return result;
    }
    useEffect(() => {
        axiosPublic.get(`/products/${separateCategories(location).toLowerCase()}`).then(data => setProducts(data?.data))
    }, [axiosPublic, location])
    const sectionTitle = [
        {
            name: "Best Sellers",
            logo: "https://i.ibb.co/DgfPmg5/best-token.png",
            link: "best-sellers"
        }, {
            name: "Best Deals",
            logo: "https://i.ibb.co/1z4zX06/best-Deals-icon.png",
            link: "best-deals"
        },
        {
            name: "Popular Items",
            logo: "https://i.ibb.co/QXBwqC7/1657088.png",
            link: "popular-items"
        }
    ]
    const category = sectionTitle?.find(item => item?.link === separateCategories(location).toLowerCase())
    return (
        <div>
            <div className="bg-slate-50 py-5 px-3 lg:px-0">
                <div className="flex items-center lg:w-10/12 mx-auto p-3 rounded-lg bg-gradient-to-r from-[#fecd28] to-[#fff]">
                    <h4 className="text-4xl ml-2 font-semibold">{category?.name}</h4>
                </div>
                <div className="lg:w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-5">
                    {
                        products?.map((product, idx) => <Product key={idx} product={product}></Product>)
                    }
                </div>
            </div>
        </div>
    );
};

export default DisplayByOffer;