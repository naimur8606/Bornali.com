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
                return console.log("error")
            }
            console.log(res.data)
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
                <title>EstateEcho | Create Account</title>
            </Helmet>
            <div className="flex w-full flex-col justify-between lg:flex-row-reverse my-5">
                <img className="md:w-2/3 lg:w-2/5 mx-auto" src='https://i.ibb.co/0jhnKK2/login.gif' alt="" />
                <div className="shadow-2xl md:w-2/3 lg:w-1/3 mx-auto mt-10 lg:mt-0 p-5 rounded-lg">
                    <h1 className="text-center text-5xl font-bold">Register now!</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                {...register('name', { required: true })}
                                required
                                className="input input-bordered w-full" />
                        </div>
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
                                <span className="label-text">Image</span>
                            </label>
                            <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password*</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Create Password"
                                {...register('password', { required: true })}
                                className="input input-bordered w-full" />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Create Account</button>
                        </div>
                    </form>
                    <div className="p-8">
                        <p className="text-xl">Have already account <Link to={"/login"} className="text-blue-600 underline">Login</Link></p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateUser;