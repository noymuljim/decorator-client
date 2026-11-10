import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const TaskAssigned = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: bookings = [], refetch, isLoading } = useQuery({
        queryKey: ["bookings", user?.email, "decorator_assigned"],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/bookings/decorator?decoratorEmail=${user?.email}&bookingStatus=decorator_assigned`
            );
            return res.data;
        },
        enabled: !!user?.email
    });

    const handleStatusUpdate = (booking, status) => {
        const statusInfo = {
            bookingStatus: status,
            decoratorId: booking.decoratorId,
            trackingId: booking.trackingId
        };

        const formattedStatus = status.split("_").join(" ");
        const message = `Booking status updated to "${formattedStatus}"`;

        axiosSecure.patch(`/bookings/${booking._id}/status`, statusInfo)
            .then((res) => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    const handleRejectOrder = (booking) => {
        const decoratorId = {
            decoratorId: booking.decoratorId
        };

        Swal.fire({
            title: "Reject Task?",
            text: "Are you sure you want to decline this task assignment?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Reject"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/bookings/${booking._id}/reject`, decoratorId)
                    .then((res) => {
                        if (res.data.bookingResult?.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Task assignment rejected",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    });
            }
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 ">
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-extrabold text-base-content tracking-tight">
                            Assigned Tasks
                        </h2>
                        <span className="badge badge-primary font-bold rounded-full px-3 py-1">
                            {bookings.length}
                        </span>
                    </div>
                    <p className="text-xs text-base-content/60 mt-1">
                        Review new requests and update status for active decorator assignments.
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="bg-base-100 rounded-3xl border border-base-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead className="bg-base-200/50 text-base-content/70 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="py-4 pl-6">#</th>
                                <th className="py-4">Service & Contact Info</th>
                                <th className="py-4">Initial Response</th>
                                <th className="py-4 pr-6">Progressive Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-base-200 text-sm">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-12">
                                        <span className="loading loading-spinner loading-md text-primary"></span>
                                        <p className="text-xs text-base-content/50 mt-2">Loading tasks...</p>
                                    </td>
                                </tr>
                            ) : bookings.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-12">
                                        <div className="max-w-xs mx-auto space-y-2">
                                            <div className="text-4xl">🎉</div>
                                            <h3 className="font-bold text-base-content">No Pending Tasks</h3>
                                            <p className="text-xs text-base-content/60">
                                                You have completed or responded to all assigned decorator jobs!
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                bookings.map((booking, i) => (
                                    <tr key={booking._id} className="hover:bg-base-200/40 transition-colors">
                                        <td className="font-semibold text-base-content/50 pl-6">{i + 1}</td>

                                        {/* Service Details, Mobile, and Address */}
                                        <td className="py-4 space-y-1">
                                            <div className="font-bold text-base-content">{booking.serviceName}</div>
                                            
                                            {booking.trackingId && (
                                                <span className="text-xs font-mono text-base-content/50 block">
                                                    ID: {booking.trackingId}
                                                </span>
                                            )}

                                            {/* Mobile Number */}
                                            {booking.Mobile && (
                                                <div className="text-xs text-base-content/80 flex items-center gap-1 font-medium">
                                                    <span className="text-base-content/50">📞 Mobile:</span>
                                                    <a href={`tel:${booking.Mobile}`} className="hover:underline text-primary">
                                                        {booking.Mobile}
                                                    </a>
                                                </div>
                                            )}

                                            {/* Address */}
                                            {booking.address && (
                                                <div className="text-xs text-base-content/70 flex items-start gap-1">
                                                    <span className="text-base-content/50 shrink-0">📍 Address:</span>
                                                    <span>{booking.address}</span>
                                                </div>
                                            )}
                                        </td>

                                        {/* Accept / Reject Controls */}
                                        <td className="py-4">
                                            {booking.bookingStatus === "decorator_assigned" ? (
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleStatusUpdate(booking, "Planning_Phase")}
                                                        className="btn btn-sm btn-primary rounded-xl font-semibold text-white shadow-sm"
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => handleRejectOrder(booking)}
                                                        className="btn btn-sm btn-error btn-outline rounded-xl font-semibold"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="badge badge-success badge-soft font-semibold rounded-full px-3 py-1 text-xs">
                                                    Accepted
                                                </span>
                                            )}
                                        </td>

                                        {/* Action Workflow Buttons */}
                                        <td className="py-4 pr-6">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <button
                                                    onClick={() => handleStatusUpdate(booking, "Materials_Prepared")}
                                                    disabled={booking.bookingStatus === "Materials_Prepared"}
                                                    className="btn btn-xs sm:btn-sm btn-outline btn-primary rounded-xl font-medium"
                                                >
                                                    Materials Prepared
                                                </button>

                                                <button
                                                    onClick={() => handleStatusUpdate(booking, "On_the_Way_to_Venue")}
                                                    disabled={booking.bookingStatus === "On_the_Way_to_Venue"}
                                                    className="btn btn-xs sm:btn-sm btn-outline btn-primary rounded-xl font-medium"
                                                >
                                                    On the Way
                                                </button>

                                                <button
                                                    onClick={() => handleStatusUpdate(booking, "Setup_in_Progress")}
                                                    disabled={booking.bookingStatus === "Setup_in_Progress"}
                                                    className="btn btn-xs sm:btn-sm btn-outline btn-primary rounded-xl font-medium"
                                                >
                                                    Setup in Progress
                                                </button>

                                                <button
                                                    onClick={() => handleStatusUpdate(booking, "Completed")}
                                                    className="btn btn-xs sm:btn-sm btn-success text-white rounded-xl font-semibold shadow-sm"
                                                >
                                                    Completed
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TaskAssigned;