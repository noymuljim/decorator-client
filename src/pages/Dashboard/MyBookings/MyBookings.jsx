import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";


const MyBookings = () => {
    
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()

    const { data: bookings = []} = useQuery({

        queryKey: ['my-bookings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user?.email}`);
            return res.data;
        }
    })


    const haldlePayment = async (booking) => {
        const paymentInfo = {
            cost: booking.serviceCost,
            bookingId: booking._id,
            userEmail: booking.userEmail,
            serviceName: booking.serviceName,
            trackingId:booking.trackingId
        }

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        console.log(res.data)
        window.location.assign(res.data.url)
    }
    return (
        <div>
            <h2 className="text-3xl"> My all bookings data: {bookings.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Service name</th>
                            <th>Servicec cost</th>
                            <th>Payment</th>
                             <th>trackingId Id(click to track)</th>
                            <th>Booking status</th>
                            
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
                                   <Link to={`/booking-track/${booking.trackingId}`} className="text-blue-500 underline">  {booking.trackingId}</Link>
                                </td>
                                <td>
                                    {booking.bookingStatus}
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