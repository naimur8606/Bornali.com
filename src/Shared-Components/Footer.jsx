import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer>
            <div className="bg-[#1F2937] text-white flex flex-col md:flex-row items-center p-10 space-y-5  md:space-y-0">
                <aside className="w-full flex md:justify-end md:pr-20">
                    <div>
                        {/* add logo or anything */}
                        <h2 className='text-4xl text-white font-bold'>Logo</h2>
                        <div>
                            <h5 className='text-2xl'>Contact Us</h5>
                            <p>Ibrahimpur, Dhaka-1216, Bangladesh</p>
                            <p>Email: naimur2935@gmail.com</p>
                            <p>Phone: 01568882935</p>
                        </div>
                    </div>
                </aside>
                <nav className="w-full flex md:justify-start md:pr-20">
                    <div className='space-y-2'>
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
        </footer>
    );
};

export default Footer;