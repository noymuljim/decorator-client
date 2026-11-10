import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const UserDashboardHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Initialize hidden IDs directly from localStorage
    const [hiddenIds, setHiddenIds] = useState(() => {
        const saved = localStorage.getItem("hiddenCompletedBookings");
        return saved ? JSON.parse(saved) : [];
    });

    // Save hidden IDs to localStorage whenever the list changes
    useEffect(() => {
        localStorage.setItem("hiddenCompletedBookings", JSON.stringify(hiddenIds));
    }, [hiddenIds]);

    // Fetch bookings for the logged-in user
    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ["user-bookings", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    // Filter out items that have been marked as done locally
    const activeTrackings = bookings
        .filter((b) => b.trackingId)
        .filter((b) => !hiddenIds.includes(b._id));

    const handleDismissCompleted = (bookingId) => {
        setHiddenIds((prev) => [...prev, bookingId]);
    };

    return (
        <div className="space-y-6">
            {/* User Greeting & Stats Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-base-100 rounded-2xl border border-base-200 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold">
                        Welcome back, <span className="text-primary">{user?.displayName || "User"}</span>! 👋
                    </h1>
                    <p className="text-xs text-base-content/60 mt-1">
                        Track your active service orders and package updates.
                    </p>
                </div>
                
                <div className="flex gap-3">
                    <div className="bg-base-200/60 px-4 py-2 rounded-xl text-center">
                        <span className="text-[10px] uppercase font-bold text-base-content/50 block">Total Orders</span>
                        <span className="text-lg font-bold">{bookings.length}</span>
                    </div>
                    <div className="bg-primary/10 px-4 py-2 rounded-xl text-center">
                        <span className="text-[10px] uppercase font-bold text-primary block">Active Trackings</span>
                        <span className="text-lg font-bold text-primary">{activeTrackings.length}</span>
                    </div>
                </div>
            </div>

            {/* Tracking Links Section */}
            <div className="bg-base-100 rounded-2xl border border-base-200 shadow-sm p-6 space-y-4">
                <h2 className="text-lg font-bold">Your Package Trackings</h2>

                {isLoading ? (
                    <div className="text-center py-8">
                        <span className="loading loading-spinner loading-md text-primary"></span>
                    </div>
                ) : activeTrackings.length === 0 ? (
                    <div className="text-center py-8 bg-base-200/30 rounded-xl border border-dashed border-base-300">
                        <p className="text-sm text-base-content/60">No active tracking items to display.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Service</th>
                                    <th>Tracking ID</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeTrackings.map((item, index) => {
                                    const isCompleted = item.bookingStatus?.toLowerCase() === "completed";

                                    return (
                                        <tr key={item._id || index}>
                                            <th>{index + 1}</th>
                                            <td className="font-semibold">{item.serviceName}</td>
                                            <td className="font-mono text-sm">{item.trackingId}</td>
                                            <td>
                                                <span
                                                    className={`badge badge-sm font-semibold capitalize ${
                                                        isCompleted ? "badge-success text-white" : "badge-outline"
                                                    }`}
                                                >
                                                    {item.bookingStatus?.replace(/_/g, " ") || "Processing"}
                                                </span>
                                            </td>
                                            <td>
                                                {isCompleted ? (
                                                    <button
                                                        onClick={() => handleDismissCompleted(item._id)}
                                                        className="btn btn-xs btn-success text-white rounded-lg px-3"
                                                    >
                                                        ✓ Done
                                                    </button>
                                                ) : (
                                                    <Link
                                                        to={`/booking-track/${item.trackingId}`}
                                                        className="btn btn-xs btn-primary text-white rounded-lg"
                                                    >
                                                        Track Package →
                                                    </Link>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDashboardHome;