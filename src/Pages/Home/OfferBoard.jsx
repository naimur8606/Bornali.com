import { useEffect, useState } from "react";

const OfferBoard = () => {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        fetch("./offer.json")
            .then((res) => res.json())
            .then((data) => setOffers(data));
    }, []);
    return (
        <div className="lg:w-10/12 mx-auto my-10 flex flex-col md:flex-row md:space-x-8 p-3 lg:p-0 space-y-4 md:space-y-0">
            {
                offers?.map((item, idx) => 
                <div key={idx}>
                    <img className="rounded-md" src={item?.offerImage} alt="" />
                </div>
                )
            }
        </div>
    );
};

export default OfferBoard;