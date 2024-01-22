import { IoPersonSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useDatabaseUser from "../../Hooks/useDatabaseUser";
const image_hosting_key = import.meta.env.VITE_Image_Hosting;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const EditProfile = () => {
    const [databaseUser] = useDatabaseUser()
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    
    const handleUserUpdate = async (e) => {
        setLoader(true);
        e.preventDefault();
        const form = e.target;

        // Check if an image file is selected
        const hasImage = form.image.files.length > 0;

        // If an image is selected, upload it
        let photoURL = databaseUser?.photoURL;
        if (hasImage) {
            const imageFile = { image: form.image.files[0] };
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
            if (res.data.success) {
                photoURL = res.data.data.display_url;
            }
        }

        const email = databaseUser?.email;
        const name = form.name.value || databaseUser?.name;
        const gender = form.gender.value || databaseUser?.gender;
        const location = form.location.value || databaseUser?.location;
        const phone = form.phone.value || databaseUser?.phone;

        const updatedUser = { email, photoURL, name, gender, location, phone };
        axiosPublic.patch(`/users/${databaseUser?.email}`, updatedUser)
            .then(data => {
                if (data.data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Profile Update Successfully',
                        icon: 'success',
                        confirmButtonText: 'Yaaah'
                    });
                    setLoader(false);
                    navigate('/dashboard');
                }
            })
            .catch(error => {
                Swal.fire({
                    title: 'warning!',
                    text: `${error.message}`,
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                });
                setLoader(false);
            });
    };

    return (
        <div>
            <div className="flex justify-between">
                <h4 className="text-2xl my-3">Edit Profile</h4>
                <div>
                    <Link to={"/dashboard"} className="flex items-center bg-[#FECD28] p-2 rounded-md"><IoPersonSharp className="mr-1"></IoPersonSharp> View Profile</Link>
                </div>
            </div>
            <form onSubmit={handleUserUpdate} className="mt-5 space-y-3">
                <div className="">
                    <label>Name:</label>
                    <input
                        type="text"
                        placeholder="Your Name"
                        defaultValue={databaseUser?.name}
                        name="name"
                        className="border mt-1 p-2 rounded-lg w-full" />
                </div>
                <div className="">
                    <label>Phone:</label>
                    <input
                        type="number"
                        placeholder="Your phone number"
                        defaultValue={databaseUser?.phone}
                        name="phone"
                        className="border mt-1 p-2 rounded-lg w-full" />
                </div>
                <div className="flex items-center space-x-5">
                    <label>Gender:</label>
                    <select name="gender" id="" className="border mt-1 p-2 rounded-lg" >
                        <option value={databaseUser?.gender}>{databaseUser?.gender}</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="flex items-center space-x-5">
                    <label>Profile Image:</label>
                    <input
                        type="file"
                        placeholder="Your Email"
                        name="image"
                        className="border mt-1 p-2 rounded-lg" />
                </div>
                <div className="">
                    <label>Location:</label>
                    <input
                        type="text"
                        placeholder="Your Location"
                        defaultValue={databaseUser?.location}
                        name="location"
                        className="border mt-1 p-2 rounded-lg w-full" />
                </div>
                <div className="py-5">
                    <button type="submit" className="flex items-center text-xl bg-[#FECD28] py-2 px-4 rounded-md">
                        <span>{loader || "Update Profile"}</span>
                        {
                            loader && <p className="border-t rounded-xl border-black border-solid w-4 h-4 animate-spin"></p>
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;