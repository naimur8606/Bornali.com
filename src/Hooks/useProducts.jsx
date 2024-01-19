import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useLocation } from "react-router-dom";

const useProducts = () => {
    const location = useLocation()?.pathname
    function separateCategories(path) {
        var regex = /^\/categories\//;
        var result = path.replace(regex, '');
        return result;
    }
    const pathQuery = separateCategories(location) ==="/" ? '' : separateCategories(location) ;
    console.log(pathQuery)
    const axiosPublic = useAxiosPublic()
    const {refetch ,data: products = []} = useQuery({
        queryKey: ["products"],
        queryFn: async () =>{
            const res = await axiosPublic.get(`/products/${pathQuery}`)
            return res.data;
        }
    })
    return [products, refetch];
};

export default useProducts;