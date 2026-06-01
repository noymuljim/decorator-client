import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../../../assets/i3.jpg"
import img2 from "../../../assets/i7.png"


const Banner = () => {
    return (
        <Carousel autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
        >


            <div className='relative '>
                <img className='rounded-3xl opacity-30 max-h-screen' src={img1} alt="" />
                <h1 className='absolute bottom-100 left-10 font-semibold text-8xl '>Make Every <span className='text-primary'>Celebration</span> Memoriable</h1>
                <p className='text-xl absolute bottom-70 left-50 text-gray-500 '>Professional decoration services for <span className='text-primary font-bold'>weddings,</span><span className='font-bold text-primary'>birthdays,</span><span className='font-bold text-primary'>anniversaries</span> and all your special moments.</p>
            
             <button className='btn btn-primary text-white rounded-full absolute bottom-40 left-140'>Book Decoration Service</button>
            </div>

            <div className='relative'>
                <img className='rounded-3xl opacity-30 max-h-screen' src={img2} alt="" />
                <h1 className='absolute bottom-100 left-3 font-semibold text-8xl '>Celebrate in Style, Decorate with Confidence</h1>
                <p className='text-xl absolute bottom-70 left-50 text-gray-500 '>Professional decoration services for <span className='text-primary font-bold'>weddings,</span><span className='font-bold text-primary'>birthdays,</span><span className='font-bold text-primary'>anniversaries</span> and all your special moments.</p>
            
             <button className='btn btn-primary text-white rounded-full absolute bottom-40 left-140'>Book Decoration Service</button>
            </div>

        </Carousel>
    );
};

export default Banner;