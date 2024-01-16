import CommonTitle from "../../Shared-Components/CommonTitle";
import ShopByCategorySlider from "../../Shared-Components/Sliders/ShopByCategorySlider";

const ShopByCategory = () => {
    

    const sectionProperties = {
        name: "Shop By Category",
        image: "https://i.ibb.co/DgfPmg5/best-token.png",
        link: "/categories"
    }
    return (
        <div className="my-10">
            <CommonTitle sectionProperties={sectionProperties}></CommonTitle>
            <ShopByCategorySlider></ShopByCategorySlider>
        </div>
    );
};

export default ShopByCategory;