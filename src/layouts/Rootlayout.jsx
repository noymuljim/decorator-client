import { Outlet } from 'react-router';
import Footer from '../pages/shared/Footer/footer';
import Navbar from '../pages/shared/Navbar/navbar';

const Rootlayout = () => {
    return (
        <div>

            <Navbar></Navbar>

            <div>
                <Outlet></Outlet>
            </div>

            <Footer></Footer>
        </div>
    );
};

export default Rootlayout;