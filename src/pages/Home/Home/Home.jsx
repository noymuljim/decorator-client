import Map from "../../Map/Map";
import Banner from "../Banner/Banner";
import ServicesData from "../ServicesData/ServicesData";
import Swip from "../Swip/Swip";

const Home = () => {
    return (
        <div className="space-y-10">
          <Banner></Banner>
          <Swip></Swip>
          <ServicesData></ServicesData>
          <Map></Map>
        </div>
    );
};

export default Home;