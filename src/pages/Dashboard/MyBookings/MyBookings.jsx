import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";


const MyBookings = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()

    const { data: bookings = [], refetch } = useQuery({

        queryKey: ['my-bookings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user?.email}`);
            return res.data;
        }
    })

    const handleDelete = (id) => {
        console.log(id)

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/bookings/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }

        });

    }

    const haldlePayment = async (booking) => {
        const paymentInfo = {
            cost: booking.serviceCost,
            bookingId: booking._id,
            userEmail: booking.userEmail,
            serviceName: booking.serviceName
        }

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        console.log(res.data)
        window.location.assign(res.data.url)
    }
    return (
        <div>
            <h2 className="text-3xl"> My bookings:{bookings.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Service name</th>
                            <th>Servicec cost</th>
                            <th>Pay</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((booking, i) => <tr key={booking._id}>
                                <th>{i + 1}</th>
                                <td>{booking.serviceName}</td>
                                <td>{booking.serviceCost}</td>
                                <td>
                                    {
                                        booking.paymentStatus === 'paid' ? <span className="text-success">Paid</span> : <button onClick={() => haldlePayment(booking)}
                                            className="btn-sm btn">Pay now</button>
                                    }
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(booking._id)}
                                        className="btn btn-circle hover:bg-red-300">
                                        <FaRegTrashAlt />
                                    </button>


                                </td>

                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBookings;