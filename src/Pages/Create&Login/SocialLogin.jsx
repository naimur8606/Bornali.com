import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";


const SocialLogin = () => {
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const { googleLogin } = useAuth();
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
            <div className="w-8/12">
                <button
                    onClick={() => handleSocialLogin(googleLogin)}
                    className="w-full border flex justify-center p-1.5 rounded-lg text-xl">
                       By Google <img className="h-8 ml-3" src="https://i.ibb.co/JQHCybC/google.png" alt="" />
                    </button>
            </div>
        </>
    );
};

export default SocialLogin;