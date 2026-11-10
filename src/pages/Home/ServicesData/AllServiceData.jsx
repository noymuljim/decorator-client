import { useQuery, keepPreviousData } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import ful from "../../../assets/d.png";
import { Link } from "react-router";

const AllServicesData = () => {
    const [searchText, setSearchText] = useState("");
    const axiosSecure = useAxiosSecure();

    const { data: services = [], isLoading } = useQuery({
        queryKey: ["allServices", searchText],
        queryFn: async () => {
            const res = await axiosSecure.get("/allServices", {
                params: { searchText },
            });
            return res.data;
        },
        placeholderData: keepPreviousData,
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 mb-12 bg-base-100/60 backdrop-blur-sm p-6 md:p-10 rounded-3xl border border-base-200/80 shadow-sm">
                <div className="flex-1 text-center md:text-left space-y-3">
                    <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-base-content leading-tight">
                        Explore All <span className="text-primary">Services</span>
                    </h2>
                    <p className="text-base-content/70 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
                        Find all our premium services with awesome, tailored packages conveniently located in one place.
                    </p>
                     {/* Modern Search Bar */}
            <div className="mt-12">
                <label className="input input-bordered flex items-center gap-3 w-full max-w-lg rounded-full shadow-sm bg-base-100 focus-within:ring-2 focus-within:ring-primary/20">
                    <svg className="h-5 w-5 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        type="search"
                        className="grow bg-transparent outline-none text-base-content placeholder:text-base-content/40"
                        placeholder="Search by category..."
                    />
                </label>
            </div>
                </div>

                <div className="relative flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl transform scale-125 animate-pulse"></div>
                    <img
                        className="h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 object-contain relative z-10 drop-shadow-xl animate-[bounce_4s_infinite]"
                        src={ful}
                        alt="Services Banner"
                    />
                </div>
            </div>

           

            {/* Loading Skeleton */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                        <div key={n} className="flex flex-col gap-4 w-full p-4 bg-base-100 rounded-3xl shadow-sm border border-base-200 animate-pulse">
                            <div className="skeleton h-56 w-full rounded-2xl"></div>
                            <div className="skeleton h-6 w-3/4 rounded-lg"></div>
                            <div className="skeleton h-4 w-1/2 rounded-lg"></div>
                            <div className="skeleton h-12 w-full rounded-full mt-4"></div>
                        </div>
                    ))}
                </div>
            ) : services.length === 0 ? (
                /* Empty State */
                <div className="text-center py-20 bg-base-200/40 rounded-3xl border border-dashed border-base-300">
                    <p className="text-base-content/60 font-medium">No services found in this category.</p>
                </div>
            ) : (
                /* Services Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <div
                            key={service._id || index}
                            className="card bg-base-100 rounded-3xl border border-base-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                        >
                            {/* Card Image & Category Badge */}
                            <figure className="relative overflow-hidden group px-4 pt-4">
                                <img
                                    className="w-full h-56 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                                    src={service.servicethumbnail}
                                    alt={service.serviceName}
                                />
                                {service.serviceCategory && (
                                    <div className="absolute top-7 left-7">
                                        <span className="badge badge-neutral bg-base-100/90 backdrop-blur-md text-base-content font-medium border-none shadow-md px-3 py-2 text-xs">
                                            {service.serviceCategory}
                                        </span>
                                    </div>
                                )}
                            </figure>

                            {/* Card Body */}
                            <div className="card-body p-6 flex flex-col justify-between flex-grow">
                                <div className="space-y-2 mb-4">
                                    <h2 className="card-title text-xl font-bold tracking-tight text-base-content line-clamp-1">
                                        {service.serviceName}
                                    </h2>
                                    {service.description && (
                                        <p className="text-sm text-base-content/70 line-clamp-2">
                                            {service.description}
                                        </p>
                                    )}
                                </div>

                                {/* Card Footer with Price & CTA */}
                                <div className="pt-4 border-t border-base-200/60 flex items-center justify-between gap-4 mt-auto">
                                    {service.price ? (
                                        <div>
                                            <span className="text-xs text-base-content/60 block font-medium">Starting at</span>
                                            <span className="text-xl font-extrabold text-primary">${service.price}</span>
                                        </div>
                                    ) : (
                                        <div>
                                            <span className="text-xs text-base-content/60 block font-medium">Status</span>
                                            <span className="text-sm font-bold text-success">Available</span>
                                        </div>
                                    )}

                                    <Link to={`/serviceDetails/${service._id}`} className="flex-1 max-w-[140px]">
                                        <button className="w-full btn btn-secondary text-secondary-content hover:btn-primary hover:text-primary-content rounded-full font-semibold shadow-sm transition-all duration-300">
                                            Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllServicesData;
