import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import Swal from "sweetalert2";


const MyServices = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: services = [],refetch } = useQuery({
        queryKey: ['my-services', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-services?email=${user.email}`
            );
            return res.data;
        }
    });



    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This service will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await axiosSecure.delete(`/services/${id}`);

                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Service has been deleted.",
                        icon: "success"
                    });

                    refetch();
                }
            }
        });
    };
    return (
        <div>
            <h2 className="text-3xl mb-5">
                My Services ({services.length})
            </h2>

            <div className="overflow-x-auto">
                <table className="table">

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            services.map(service => (
                                <tr key={service._id}>
                                    <td>{service.serviceName}</td>
                                    <td>{service.serviceCost}</td>
                                    <td>{service.serviceCategory}</td>

                                    <td className="space-x-2">
                                        <Link
                                            to={`/dashboard/update-service/${service._id}`}
                                            className="btn btn-primary btn-sm"
                                        >
                                            Update
                                        </Link>

                                        <button
                                            onClick={() => handleDelete(service._id)}
                                            className="btn btn-error btn-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyServices;