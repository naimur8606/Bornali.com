import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { } from "react-icons/ai";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "./SocialLogin";
import { Helmet } from "react-helmet-async";

const Login = () => {
    const { register, handleSubmit } = useForm();
    const { user, userLogin, setUserLocation } = useAuth()
    const axiosPublic = useAxiosPublic()
    const [useAlert, setUseAlert] = useState(true)
    const location = useLocation()
    const State = location?.state
    setUserLocation(State)
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        console.log(data)
        const email = data.email;
        const password = data.password;
        console.log(email, password)
        userLogin(email, password)
            .then(() => {
                const status = "User";
                const name = user?.displayName;
                const photoURL = user?.photoURL;
                const DatabaseUser = { name, email, photoURL, status };
                axiosPublic.post('/users', DatabaseUser)
                    .then(res => res.json())
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
                    navigate(State?.location ? State?.location : "/")
                }

            }
            )
            .catch(error => {
                Swal.fire({
                    title: 'Warning!',
                    text: `${error.message}`,
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                })
            });

    };
    return (
        <div className="flex items-center min-h-screen w-[97%] lg:w-full mx-auto">
            <Helmet>
                <title>Bornali | Login</title>
            </Helmet>
            <div className="flex w-full items-center justify-center my-5">
                <div className="shadow-xl md:w-2/3 lg:w-1/3 mx-auto mt-10 lg:mt-0 px-5 py-10 rounded-lg border">
                    <div className="text-center space-y-2">
                        <h1 className="text-center text-3xl font-semibold">Welcome to Bornali Bazar</h1>
                        <p className="text-xl">Login with your credentials</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-5">
                        <div className="">
                            <label className="label">
                                <span className="label-text">Email*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your Email"
                                {...register('email', { required: true })}
                                required
                                className="border mt-0.5 p-2 rounded-lg w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password*</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                {...register('password', { required: true })}
                                className="border mt-0.5 p-2 rounded-lg w-full" />
                        </div>
                        <div className="flex justify-between">
                            <p className="text-sm">New User? <Link to={"/registration"} className="text-blue-600">Register Here...</Link></p>
                            <Link to={"/forgetPassword"} className="text-sm">Forget Password</Link>
                        </div>
                        <div className="mt-6 flex justify-center">
                            <button type="submit" className="w-8/12 mx-auto p-2 rounded-lg text-xl bg-[#fecd28]">Login</button>
                        </div>
                    </form>
                    <div className="mt-5 flex justify-center">
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;