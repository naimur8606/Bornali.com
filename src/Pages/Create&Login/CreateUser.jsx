import { Link, useNavigate } from "react-router-dom";
// import SocialLogin from "./SocialLogin";
import { signOut } from "firebase/auth";
import auth from "../../Providers/Firebase/FirebaseConfig";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SocialLogin from "./SocialLogin";
import { Helmet } from "react-helmet-async";
const image_hosting_key = import.meta.env.VITE_Image_Hosting;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CreateUser = () => {
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic()
    const { createUser, updateUser } = useAuth();
    const [useAlert, setUseAlert] = useState(true)
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }); console.log('with image url', res.data);
        if (res.data.success) {
            const name = data.name;
            const email = data.email;
            const photoUrl = res.data.data.display_url;
            const password = data.password;
            console.log(name, email, photoUrl, password)
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
                    updateUser(name, photoUrl)
                    signOut(auth)
                    const status = "User";
                    const user = { name, email, photoUrl, status };
                    axiosPublic.post('/users', user)
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
                });
        }
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
                            <label className="label">
                                <span className="label-text">Name*</span>
                            </label>
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
                                <span className="mr-3">Image*</span>
                            </label>
                            <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
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
                            <button type="submit" className="w-8/12 mx-auto p-2 rounded-lg text-xl bg-[#fecd28]">Create Account</button>
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