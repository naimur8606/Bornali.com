import { Link } from "react-router-dom";

const CommonTitle = ({ sectionProperties }) => {
    return (
        <div className="lg:w-10/12 mx-auto my-5 flex justify-between">
            <div className="flex items-center">
                <img className="h-8" src={sectionProperties?.image} alt="" />
                <h4 className="text-2xl ml-2 font-semibold">{sectionProperties?.name}</h4>
                <p className="hidden md:block h-[1.5px] bg-[#b4b2b2] md:w-60 lg:w-96 ml-5 rounded-xl"></p>
            </div>
            <Link to={sectionProperties?.link} className="text-blue-600">View All</Link>
        </div>
    );
};

export default CommonTitle;