import Map from "../../Map/Map";
import Banner from "../Banner/Banner";
import Contact from "../contact/Contact";
import ServicesData from "../ServicesData/ServicesData";
import Swip from "../Swip/Swip";

const Home = () => {
    return (
        <div className="space-y-10">
            <div className="px-4 pt-4">
                <Banner></Banner>
            </div>

            <Swip></Swip>
            <div className='max-w-7xl mx-auto'>
                <ServicesData></ServicesData>
                <Map></Map>
                <Contact></Contact>
            </div>

        </div>
    );
};

export default Home;