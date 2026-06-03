import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import ful from "../../../assets/d.png"
import { Link } from "react-router";

const AllServicesData = () => {

    const [searchText, setSearchText] = useState('')


    const axiosSecure = useAxiosSecure()

    const { data: services = [] } = useQuery({
        queryKey: ['services', searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allServices?searchText=${searchText}`)
            return res.data
        }
    })


    return (

        <div>
            <div className="flex justify-center">
                <img className="h-[200px] " src={ful} alt="" />

            </div>
            <div className="text-center">
                <h2 className="font-bold text-3xl ">All Services</h2>
                <p className="text-gray-400 mb-5">Find all services with awesome package at one place</p>
            </div>


            {/* search */}


            <div className="my-5">
                <label className="input ">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input onChange={(e) => setSearchText(e.target.value)}
                        type="search"
                        className="grow"
                        placeholder="Search Services" />

                </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 justify-between">
                {
                    services.map((service, index) => <div key={index} className="card bg-base-100 shadow-sm">
                        <figure>
                            <img className="w-full h-64 object-cover p-4"
                                src={service.servicethumbnail} />
                        </figure>
                        <div className="card-body">
                            <div className="">
                                <h2 className="card-title">{service.serviceName}</h2>
                                <h1>Category: <span className=" badge badge-outline p-1 bg-secondary/44 rounded-3xl text-center">{service.serviceCategory}
                                </span> </h1>
                            </div>
                            <div className="card-actions justify-end">
                                <Link to={`/serviceDetails/${service._id}`}>
                                    <button className="btn w-full btn-secondary hover:btn-primary text-black hover:text-white">
                                        Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>)
                }
            </div>

        </div>
    );
};

export default AllServicesData;