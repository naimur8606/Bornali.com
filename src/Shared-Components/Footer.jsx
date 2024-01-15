import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer>
            <div className="footer gap-0 text-neutral-content">
                <aside className="bg-[#1F2937] w-full p-10 flex justify-center md:justify-end md:pr-20 text-center">
                    <div>
                        <img className='h-24 mx-auto' src='https://i.ibb.co/mTfvdVR/Esrate-Echo-logo.png' alt="" />
                        <div>
                            <h5 className='text-2xl'>Contact Us</h5>
                            <p>Ibrahimpur, Dhaka-1216, Bangladesh</p>
                            <p>Email: naimur2935@gmail.com</p>
                            <p>Phone: 01568882935</p>
                        </div>
                    </div>
                </aside>
                <nav className="bg-[#111827] w-full p-10 h-full flex justify-center md:justify-start items-center md:pl-20">
                    <div>
                        <h5 className='text-2xl'>Follow Us</h5>
                        <p>Join us with social</p>
                        <div className='text-2xl flex space-x-4'>
                            <FaFacebookF></FaFacebookF>
                            <FaInstagram></FaInstagram>
                            <FaTwitter></FaTwitter>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="footer footer-center p-4 bg-[#151515] text-slate-300 ">
                <aside>
                    <p>Copyright © 2023 - All right reserved by BOSS Restaurant</p>
                </aside>
            </div>
        </footer>
    );
};

export default Footer;