import { Outlet } from 'react-router';
import Footer from '../pages/shared/Footer/footer';
import Navbar from '../pages/shared/Navbar/navbar';

const Rootlayout = () => {
    return (
        <div className='bg-[#EAECED] min-h-screen'>

            <Navbar></Navbar>

            <div className='max-w-7xl mx-auto'>
                <Outlet></Outlet>
            </div>

            <Footer></Footer>
        </div>
    );
};

export default Rootlayout;