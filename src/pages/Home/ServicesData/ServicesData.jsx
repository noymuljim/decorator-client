import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link, NavLink } from "react-router";

const ServicesData = () => {

    const axiosSecure = useAxiosSecure()

    const { data: services = [] } = useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const res = await axiosSecure.get('/services')
            return res.data
        }
    })


    return (

        <div className="py-10">
            <h2 className="font-extrabold text-4xl sm:text-5xl text-base-content mb-4 tracking-tight text-center">Services</h2>
            <p className="text-center text-gray-500 mb-5">All types of decoration services such as weddings, birthdays, anniversaries, and <br /> all your special moments.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                {services.map((service) => (
                    <div
                        key={service._id || service.serviceName}
                        className="group relative flex flex-col bg-base-100/80 backdrop-blur-md rounded-3xl border border-base-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
                    >
                        {/* Image Container with Badge Overlay */}
                        <div className="relative w-full h-64 overflow-hidden bg-base-200">
                            <img
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                src={service.servicethumbnail}
                                alt={service.serviceName}
                            />
                            {/* Gradient Protection Layer */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>

                            {/* Top-Right Category Badge */}
                            <span className="absolute top-4 right-4 px-3 py-1 text-xs font-bold tracking-wide uppercase rounded-full bg-base-100/90 text-primary backdrop-blur-md shadow-sm border border-base-200">
                                {service.serviceCategory}
                            </span>
                        </div>

                        {/* Card Content Body */}
                        <div className="flex flex-col flex-grow p-6 justify-between space-y-4">
                            <div>
                                {/* Service Title */}
                                <h2 className="text-2xl font-bold text-base-content group-hover:text-primary transition-colors duration-200 leading-tight">
                                    {service.serviceName}
                                </h2>

                                {/* Optional Short Description (if present in your object) */}
                                {service.description && (
                                    <p className="text-sm text-base-content/70 mt-2 line-clamp-2">
                                        {service.description}
                                    </p>
                                )}
                            </div>

                            {/* Card Actions & CTA */}
                            <div className=" border-t border-base-200/60 flex items-center justify-between gap-4">
                                {/* Price Display (if available) */}
                                {service.price && (
                                    <div>
                                        <span className="text-xs text-base-content/60 block">Starting at</span>
                                        <span className="text-xl font-extrabold text-primary">${service.price}</span>
                                    </div>
                                )}

                                {/* Full-width / Pushed CTA Button */}
                                <Link to={`/serviceDetails/${service._id}`} className="flex-1 w-full">
                                    <button className="w-full btn btn-secondary text-secondary-content hover:btn-primary hover:text-primary-content rounded-full font-semibold shadow-sm transition-all duration-300">
                                        Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center p-5 ">
                <NavLink to="/allServices">
                    <button className="btn btn-primary w-[300px] p-6 text-white font-bold rounded-3xl ">View All</button>
                </NavLink>
            </div>
        </div>
    );
};

export default ServicesData;