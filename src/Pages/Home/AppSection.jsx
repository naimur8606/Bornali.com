import { Link } from "react-router-dom";

const AppSection = () => {
    return (
        <div className="bg-[url('https://i.ibb.co/GpY3rJq/app-section-cover.png')] bg-cover mt-5">
            <div className="lg:w-10/12 mx-auto py-2 md:py-10 lg:py-16">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold pl-3 md:pl-5 lg:pl-0 lg:p-5">Download Our <br />App</h3>
                <div className="flex">
                    <Link><img className="h-14 md:h-20" src="https://i.ibb.co/qDPJ0jp/play-store-removebg-preview.png" alt="" /></Link>
                    <Link><img className="h-14 md:h-20" src="https://i.ibb.co/N9kcPs2/app-store-removebg-preview.png" alt="" /></Link>
                </div>
            </div>
        </div>
    );
};

export default AppSection;