import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const TodaySchedule = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: schedules = [] } = useQuery({
        queryKey: ['today-schedule', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/bookings/today-schedule?decoratorEmail=${user.email}`
            );
            return res.data;
        }
    });

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">
                Today's Schedule ({schedules.length})
            </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Service</th>
                            <th>Customer</th>
                            <th>Address</th>
                            <th>Date</th>
                            <th>Cost</th>
                        </tr>
                    </thead>

                    <tbody>
                        {schedules.map((booking, index) => (
                            <tr key={booking._id}>
                                <th>{index + 1}</th>
                                <td>{booking.serviceName}</td>
                                <td>{booking.userName}</td>
                                <td>{booking.address}</td>
                                <td>{booking.date}</td>
                                <td>${booking.serviceCost}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TodaySchedule;