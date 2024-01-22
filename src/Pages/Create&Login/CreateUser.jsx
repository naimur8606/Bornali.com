import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../../Providers/Firebase/FirebaseConfig";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SocialLogin from "./SocialLogin";
import { Helmet } from "react-helmet-async";

const CreateUser = () => {
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic()
    const { createUser, updateUser } = useAuth();
    const [useAlert, setUseAlert] = useState(true)
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        setLoader(true)
        const name = data?.name;
        const email = data?.email;
        const password = data?.password;
        // console.log(name, email, password)
        if (!/^(?=.*[a-z])(?!.*[A-Z])(?=.*[0-9]).{6,}$/.test(password)) {
            return (
                Swal.fire({
                    title: 'Warning!',
                    text: 'Please create password by small alphabet and must one number. length must be 6',
                    icon: 'warning',
                    confirmButtonText: ' Ok '
                })
            )
        }
        createUser(email, password)
            .then(() => {
                updateUser(name)
                signOut(auth)
                const status = "User";
                const user = { name, email, status };
                axiosPublic.post('/users', user)
                    .then(data => {
                        console.log(data?.data);
                        if (data?.data?.insertedId) {
                            setUseAlert(true)
                        }
                    })
                if (useAlert) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'User Created Successfully',
                        icon: 'success',
                        confirmButtonText: 'Yaaah'
                    })
                }
                navigate("/login")
            })
            .catch(error => {
                Swal.fire({
                    title: 'Warning!',
                    text: `${error.message}`,
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                })
                setLoader(false)
            });

    };
    return (
        <div className="flex items-center min-h-screen w-[97%] lg:w-full mx-auto">
            <Helmet>
                <title>Bornali | Create Account</title>
            </Helmet>
            <div className="flex w-full items-center justify-center my-5">
                <div className="shadow-xl md:w-2/3 lg:w-1/3 mx-auto mt-10 lg:mt-0 px-5 py-10 rounded-lg border">
                    <div className="text-center space-y-2">
                        <h1 className="text-center text-3xl font-semibold">Welcome to Bornali Bazar</h1>
                        <p className="text-xl">Register Your Account</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-5">
                        <div className="">
                            <label>Name*</label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                {...register('name', { required: true })}
                                required
                                className="border mt-0.5 p-2 rounded-lg w-full" />
                        </div>
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
                        <div className="">
                            <label className="label">
                                <span className="label-text">Password*</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Create Password"
                                {...register('password', { required: true })}
                                className="border mt-0.5 p-2 rounded-lg w-full" />
                        </div>
                        <div className="flex justify-between">
                            <p className="text-sm">Have already account! <Link to={"/login"} className="text-blue-600">Login...</Link></p>
                        </div>
                        <div className="mt-6 flex justify-center">
                            <button type="submit" className="w-8/12 mx-auto p-2 rounded-lg text-xl bg-[#fecd28] flex justify-center items-center">
                                <span>{loader || "Create Account"}</span>
                                {
                                    loader && <p className="border-t rounded-xl border-black border-solid w-4 h-4 animate-spin"></p>
                                }
                            </button>
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

export default CreateUser;