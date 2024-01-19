import { FaCartArrowDown } from "react-icons/fa";

const Product = ({ product }) => {
    console.log(product)
    return (
        <div className="shadow-lg rounded-lg bg-white">
            <img className="h-60 w-full rounded-t-lg" src={product?.image} alt="" />
            <div className="space-y-3 px-2 py-5">
                <h3 className="text-xl font-medium">{product?.name}</h3>
                <div className="flex space-x-2 md:text-lg lg:text-base">
                    <p className="py-0.5 px-3 md:px-5 bg-slate-100 rounded-lg">{product?.weight}</p>
                    <p className="py-0.5 px-3 md:px-5 bg-slate-100 rounded-lg">{product?.price} ৳</p>
                    <button className="flex items-center bg-[#fecd28] py-0.5 px-3 rounded-lg"><FaCartArrowDown className="mr-1"></FaCartArrowDown> Add to Cart </button>
                </div>

            </div>
        </div>
    );
};

export default Product;