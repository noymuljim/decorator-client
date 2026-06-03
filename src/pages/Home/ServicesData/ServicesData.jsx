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

        <div>
            <h2 className="font-bold text-3xl text-center mb-5">Services</h2>

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

            <div className="flex justify-center p-5 ">
                <NavLink to="/allServices"> <button className="btn btn-primary w-[200px] text-white rounded-3xl ">View All</button>
                </NavLink>            </div>
        </div>
    );
};

export default ServicesData;