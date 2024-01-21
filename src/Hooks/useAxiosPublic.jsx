import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'https://bornali-com-server.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;