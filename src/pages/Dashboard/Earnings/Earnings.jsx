import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Earnings = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: bookings = [], } = useQuery({
        queryKey: ['bookings', user.email, 'decorator_assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/decorator/earning?decoratorEmail=${user.email}&bookingStatus=Completed`)

            return res.data;
        }
    })


const calculatePayout = (booking) =>{
  return  booking.serviceCost * 0.85;
} 

    return (
        <div>
            <h2>completed & earnings: {bookings.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Service name</th>
                            <th>Service rate</th>
                            <th>My income</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((booking, i) => <tr key={booking._id}>
                                <th>{i + 1}</th>
                                <td>{booking.serviceName}</td>
                                <td>{booking.serviceCost}</td>
                                <td>{calculatePayout(booking)}</td>
                                <td>
                                    <button className="btn btn-primary text-white">Cash-out</button>
                                </td>

                            </tr>)
                        }


                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Earnings;