import { useEffect, useState } from "react";
import { IoMdArrowRoundUp } from "react-icons/io";

const UpperArrow = () => {
    const [isButtonVisible, setIsButtonVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = 100;
            const isPastThreshold = window.scrollY > scrollThreshold;
            setIsButtonVisible(isPastThreshold);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleButtonClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <div className="relative">
                {isButtonVisible && (
                    <button
                        onClick={handleButtonClick}
                        className="fixed bottom-8 ml-5  bg-[#FECD28] text-white text-xl p-2 rounded-full shadow-md cursor-pointer"
                    >
                        <IoMdArrowRoundUp />
                    </button>
                )}
            </div>
    );
};

export default UpperArrow;