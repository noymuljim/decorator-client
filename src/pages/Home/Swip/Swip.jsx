import 'swiper/css';
import img1 from "../../../assets/b.png"
import img2 from "../../../assets/w.png"
import img3 from "../../../assets/p.png"
import img4 from "../../../assets/b.png"
import img5 from "../../../assets/wi.png"
import img6 from "../../../assets/p.png"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

const logos = [img1, img2, img3, img4, img5, img6];

const Swip = () => {
    return (
        <div>

            <Swiper

                slidesPerView={5}
                centeredSlides={true}
                spaceBetween={10}
                grabCursor={true}

                loop={true}
                modules={[Autoplay]}

                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}

                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}


            >

                {
                    logos.map((logo, index) =>
                        <SwiperSlide key={index}>
                            <div className="h-15 flex items-center justify-center">
                                <img
                                    src={logo}
                                   
                                    className="max-h-24 w-auto object-contain"
                                />
                            </div>
                        </SwiperSlide>
                    )
                }


            </Swiper>
        </div>
    );
};

export default Swip;