import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const TaskAssigned = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()


    const { data: bookings = [], refetch } = useQuery({
        queryKey: ['bookings', user?.email, 'decorator_assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/decorator?decoratorEmail=${user.email}&bookingStatus=decorator_assigned`)
            return res.data;
        }
    })

    const handleStatusUpdate = (booking, status) => {

        const statusInfo = { bookingStatus: status,decoratorId:booking.decoratorId ,
                        trackingId:booking.trackingId

         }
        let message = `Booking status updated with${status.split('_').join(" ")}`

        axiosSecure.patch(`/bookings/${booking._id}/status`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }



    const handleRejectOrder = (booking) => {
        const decoratorId = {
            decoratorId: booking.decoratorId
        }

        axiosSecure.patch(`/bookings/${booking._id}/reject`, decoratorId)
            .then(res => {

                if (res.data.bookingResult.modifiedCount > 0) {

                    refetch();

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Delivery rejected",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div>
            <h2>Assigned task for me:{bookings.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            bookings.map((booking, i) => <tr>
                                <th>{i + 1}</th>
                                <td>{booking.serviceName}</td>
                                <td>
                                    {
                                        booking.bookingStatus === "decorator_assigned" ? <>
                                            <button onClick={() => handleStatusUpdate(booking, 'Planning_Phase')}
                                                className="btn btn-primary text-white mr-5">Accept</button>
                                            <button onClick={() => handleRejectOrder(booking)}
                                                className="btn bg-red-400 text-white">Reject</button>
                                        </> : <h2 className='text-blue-400'>Accepted</h2>



                                    }
                                </td>
                                <td className="space-x-4">
                                    <button onClick={() => handleStatusUpdate(booking, 'Materials_Prepared')}
                                        disabled={booking.bookingStatus === 'Materials_Prepared'}
                                        className="btn btn-primary text-white">Materials Prepared</button>

                                    <button onClick={() => handleStatusUpdate(booking, 'On_the_Way_to_Venue')}
                                        disabled={booking.bookingStatus === 'On_the_Way_to_Venue'}
                                        className="btn btn-primary text-white">On the Way to Venue</button>

                                    <button onClick={() => handleStatusUpdate(booking, 'Setup_in_Progress')}
                                        disabled={booking.bookingStatus === 'Setup_in_Progress'}
                                        className="btn btn-primary text-white">Setup in Progress</button>

                                    <button onClick={() => handleStatusUpdate(booking, 'Completed')}
                                        className="btn btn-primary text-white">Completed</button>
                                </td>



                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TaskAssigned;