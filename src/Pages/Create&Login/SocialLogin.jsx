import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";
import { AiFillGithub, AiFillGoogleCircle } from "react-icons/ai";


const SocialLogin = () => {
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const { googleLogin, githubLogin } = useAuth();
    const [useAlert, setUseAlert] = useState(true)
    const location = useLocation()?.state?.location
    
    const handleSocialLogin = (media) => {
        media()
            .then((req) => {
                const email = req?.user?.email;
                const photoURL = req?.user?.photoURL;
                const name = req.user?.displayName;
                const status = "User";
                const User = { email, photoURL, name, status };
                axiosPublic.post('/users', User)
                    .then(data => {
                        console.log(data);
                        if (data.insertedId) {
                            setUseAlert(true)
                        }
                    })
                if (useAlert) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Login Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
                navigate(location ? location : "/")
            }
            )
            .catch(error => {
                console.log(error)

            })
    }

    return (
        <>
            <div className="divider">continue with</div>
            <div className="flex justify-around">
                <button
                    onClick={() => handleSocialLogin(googleLogin)}
                    className="flex border border-[#fd4520] text-[#f66f54] py-1 px-2 rounded"><AiFillGoogleCircle className="text-2xl"></AiFillGoogleCircle> Google</button>
                <button
                    onClick={() => handleSocialLogin(githubLogin)}
                    className="flex border border-[#251655] text-[#3a2c8c] py-1 px-2 rounded"><AiFillGithub className="text-2xl"></AiFillGithub> Github</button>
            </div>
        </>
    );
};

export default SocialLogin;