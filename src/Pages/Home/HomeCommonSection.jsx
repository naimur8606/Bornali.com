import CommonSliderSection from "../../Shared-Components/Sliders/CommonSliderSection";
import CommonTitle from "../../Shared-Components/CommonTitle";

const HomeCommonSection = ({products, title}) => {
    return (
        <div className="bg-[#f4f6f9] py-8 px-3 lg:px-0">
            <div className="bg-[#f4f6f9] md:pt-8 lg:pt-10 px-3 lg:px-0">
                <CommonTitle sectionProperties={title}></CommonTitle>
                <div className="hidden lg:block">
                    <CommonSliderSection products={products} slideNumber={2}></CommonSliderSection>
                </div>
                <div className="lg:hidden">
                    <CommonSliderSection products={products} slideNumber={1}></CommonSliderSection>
                </div>
            </div>
        </div>
    );
};

export default HomeCommonSection;