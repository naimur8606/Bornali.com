import { FaCartArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
    return (
        <div className="shadow-lg rounded-lg bg-white">
            <Link to={`/products/${product?._id}`}>
                <img className="h-60 w-full rounded-t-lg" src={product?.image} alt="" />
            </Link>
            <div className="space-y-3 px-2 py-5">
                <Link to={`/products/${product?._id}`}>
                    <h3 className="text-2xl hover:text-[#fecd28] font-medium">{product?.name}</h3>
                </Link>
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