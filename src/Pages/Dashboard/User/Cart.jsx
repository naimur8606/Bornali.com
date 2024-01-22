import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useCart from "../../../Hooks/useCart";
import { MdDelete } from "react-icons/md";

const Cart = () => {
    const [cart, refetch] = useCart()
    const axiosPublic = useAxiosPublic()

    const handleDeleteCartProduct = (id, name) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to delete ${name} from your Cart!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosPublic.delete(`/cartProduct/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: `${name} has been deleted from your Cart.`,
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });
    }
    return (
        <div>
            <h3 className="text-3xl font-medium">Shopping Cart</h3>
            <ul className="mt-8">
                {
                    cart?.map((product,idx) => 
                    <li key={idx} className="flex justify-between items-center space-x-2 border-b-2 pb-1 overflow-x-auto">
                        <div className="flex items-center space-x-2">
                        <img className="h-16 md:h-20 md:w-28 rounded-lg" src={product?.productImage} alt="" />
                        <h4>{product?.productName}</h4>
                        </div>
                        <p>Selected: {product?.numberOfProducts}</p>
                        <p>Price:{product?.price}</p>
                        <button onClick={()=> handleDeleteCartProduct(product?._id, product?.productName)} className='flex items-center p-1 text-red-500 hover:bg-red-500 hover:text-white'><MdDelete className='mr-2'></MdDelete> Delete</button>
                    </li>)
                }
            </ul>
        </div>
    );
};

export default Cart;