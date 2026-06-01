import Map from "../../Map/Map";
import Banner from "../Banner/Banner";
import Swip from "../Swip/Swip";

const Home = () => {
    return (
        <div className="space-y-10">
          <Banner></Banner>
          <Swip></Swip>
          <Map></Map>
        </div>
    );
};

export default Home;