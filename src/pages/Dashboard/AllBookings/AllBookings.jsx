import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";

const AllBookings = () => {
    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(1);
    const size = 5;

    // Get paginated bookings
    const { data: allBookings = [], isLoading } = useQuery({
        queryKey: ["allBookings", page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allBookings?page=${page}&size=${size}`);
            return res.data;
        },
    });

    // Get total bookings count
    const { data: countData = {} } = useQuery({
        queryKey: ["allBookingsCount"],
        queryFn: async () => {
            const res = await axiosSecure.get("/allBookingsCount");
            return res.data;
        },
    });

    const totalPages = Math.ceil((countData.count || 0) / size);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6">
                All Users Booking Requests: {countData.count || 0}
            </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Created By</th>
                            <th>Service Name</th>
                            <th>Cost</th>
                            <th>Created At</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {allBookings.map((booking, index) => (
                            <tr key={booking._id}>
                                <th>{(page - 1) * size + index + 1}</th>

                                <td>{booking.userEmail}</td>

                                <td>{booking.serviceName}</td>

                                <td>${booking.serviceCost}</td>

                                <td>
                                    {booking.createdAt
                                        ? new Date(
                                              booking.createdAt
                                          ).toLocaleDateString()
                                        : "N/A"}
                                </td>

                                <td>
                                    <span
                                        className={`badge ${
                                            booking.paymentStatus === "Paid"
                                                ? "badge-success"
                                                : "badge-warning"
                                        }`}
                                    >
                                        {booking.paymentStatus}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
                <button
                    className="btn btn-sm"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>

                {[...Array(totalPages).keys()].map((num) => (
                    <button
                        key={num}
                        onClick={() => setPage(num + 1)}
                        className={`btn btn-sm ${
                            page === num + 1 ? "btn-primary" : ""
                        }`}
                    >
                        {num + 1}
                    </button>
                ))}

                <button
                    className="btn btn-sm"
                    disabled={page === totalPages || totalPages === 0}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllBookings;