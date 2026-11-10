import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavLink } from 'react-router';
import img1 from "../../../assets/i3.jpg";
import img2 from "../../../assets/pngtree-elegant-wedding-stage-decorated-with-pink-flowers-and-white-curtains-indoor-image_19799024.webp";

const slides = [
    {
        id: 1,
        img: img1,
        title: (
            <>
                Make Every <span className="text-primary underline decoration-primary/30 decoration-wavy">Celebration</span> Memorable
            </>
        ),
        description: "Professional decoration services for weddings, birthdays, anniversaries, and all your special moments.",
    },
    {
        id: 2,
        img: img2,
        title: (
            <>
                Celebrate in Style, <span className="underline decoration-primary/30 text-primary decoration-wavy">Decorate</span> with Confidence
            </>
        ),
        description: "Transform your venue into a stunning atmosphere crafted by expert decorators for unforgettable memories.",
    }
];

const Banner = () => {
    return (
        <section className="">
            <Carousel 
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                interval={5000}
                transitionTime={700}
                className="rounded-3xl overflow-hidden shadow-2xl"
            >
                {slides.map((slide) => (
                    <div key={slide.id} className="relative w-full h-[75vh] min-h-[500px] max-h-[700px] flex items-center">
                        {/* Background Image */}
                        <img 
                            className="absolute inset-0 w-full h-full object-cover object-center" 
                            src={slide.img} 
                            alt="Celebration Banner" 
                        />
                        
                        {/* Modern Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent"></div>

                        {/* Content Container (Fully Responsive Layout) */}
                        <div className="relative z-10 w-full max-w-3xl text-left px-8 md:px-16 flex flex-col items-start space-y-6">
                            
                           

                            {/* Headline */}
                            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
                                {slide.title}
                            </h1>

                            {/* Description */}
                            <p className="text-base sm:text-lg md:text-xl text-gray-300 font-light max-w-2xl leading-relaxed">
                                {slide.description}
                            </p>

                            {/* Action Button & Trust Badge */}
                            <div className="pt-2 flex flex-wrap items-center gap-4">
                                <NavLink to="/allServices">
                                    <button className="btn btn-primary btn-lg text-white rounded-full px-8 shadow-lg shadow-primary/30 hover:scale-105 transition-all duration-300">
                                        Book Decoration Service
                                    </button>
                                </NavLink>
                                  <button className="btn border btn-lg text-primary rounded-full px-8 shadow-lg shadow-primary/30 hover:scale-105 transition-all duration-300">
                                        Contact us
                                    </button>
                            </div>

                        </div>
                    </div>
                ))}
            </Carousel>
        </section>
    );
};

export default Banner;