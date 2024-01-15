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
                <title>EstateEcho | Login</title>
            </Helmet>
            <div className="flex w-full flex-col justify-between lg:flex-row-reverse my-5">
                <img className="md:w-2/3 lg:w-2/5 mx-auto" src='https://i.ibb.co/0jhnKK2/login.gif' alt="" />
                <div className="shadow-2xl md:w-2/3 lg:w-1/3 mx-auto mt-10 lg:mt-0 p-5 rounded-lg">
                    <h1 className="text-center text-5xl font-bold">Login now!</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your Email"
                                {...register('email', { required: true })}
                                required
                                className="input input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password*</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                {...register('password', { required: true })}
                                className="input input-bordered w-full" />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <div className="p-8">
                        <p className="text-xl">Are you new here <Link to={"/registration"} className="text-blue-600 underline">Registration</Link> account</p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;