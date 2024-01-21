import { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ForgotPass = () => {
    const { forgotPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = async () => {
        try {
            await forgotPassword(email);
            setMessage('Password reset email sent. Check your inbox.');
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className='min-h-screen lg:w-10/12 mx-auto flex justify-center items-center'>
            <Helmet>
                <title>Bornali | Forgot Password</title>
            </Helmet>
            <div className='border px-5 py-12 space-y-4 rounded-xl shadow-lg'>
                <div className="text-center space-y-2 mb-5">
                    <h1 className="text-center text-3xl font-semibold">Welcome to Bornali Bazar</h1>
                    <p className="text-xl">Recover Your Password</p>
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">Email*</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="border mt-0.5 p-2 rounded-lg w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button onClick={handleForgotPassword} className='w-8/12 mx-auto p-2 rounded-lg text-xl bg-[#fecd28]'>Reset Password</button>
                <p>{message}</p>
                <hr />
                <div className="mt-10">
                    <p className="">Back to Login page! <Link to={"/login"} className="text-blue-600">Login...</Link></p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPass;
