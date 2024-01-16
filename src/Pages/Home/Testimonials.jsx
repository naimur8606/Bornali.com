import { useEffect, useState } from "react";

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        fetch("./Testimonial.json")
            .then((res) => res.json())
            .then((data) => {
                setTestimonials(data)
            });
    }, []);
    console.log(testimonials, "hello")

    return (
        <div className="bg-[#F4F6F9] py-10">
            <div className="lg:w-10/12 mx-auto">
                <h2 className="text-4xl font-semibold text-center">Customer Testimonials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-10 px-5 lg:px-0">
                    {testimonials?.map((testimonial, idx) => (
                        <div key={idx} className="p-4 bg-white shadow-lg rounded-md space-y-2">
                            <div className="text-left flex ">
                                <img
                                    src={testimonial?.userImage}
                                    alt={testimonial?.userName}
                                    className="rounded-lg w-14 h-14 mr-3"
                                />
                                <div>
                                    <h5 className="text-lg font-semibold">{testimonial?.userName}</h5>
                                    <p className="text-gray-500">{testimonial?.userWorkFrom}</p>
                                </div>
                            </div>
                            <p>
                                {testimonial?.userReview}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
