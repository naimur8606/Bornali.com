import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useFavorite = () => {
    const axiosPublic = useAxiosPublic()
    const {user} = useAuth()
    const {refetch:reCheck ,data: favorite = []} = useQuery({
        queryKey: ["favorite", user?.email],
        queryFn: async () =>{
            const res = await axiosPublic.get(`/favoriteProducts/${user?.email}`)
            return res.data;
        }
    })
    return [favorite, reCheck];
};

export default useFavorite;