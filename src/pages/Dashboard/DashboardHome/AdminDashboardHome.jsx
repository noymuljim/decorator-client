import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Legend, Pie, PieChart, Tooltip } from "recharts";
import { MdOutlineTaskAlt } from "react-icons/md";

const AdminDashboardHome = () => {
    const axiosSecure = useAxiosSecure()

    const { data: bookingStatus = [] } = useQuery({
        queryKey: ['booking-status-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings/booking-status/stats');
            return res.data;
        }
    })


    const { data: completedBookings = [] } = useQuery({
        queryKey: ['admin-earnings'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings/admin/earnings');
            return res.data;
        }
    });

    const totalRevenue = completedBookings.reduce((total, booking) => {
        return total + booking.serviceCost * 0.15;
    }, 0);



    const getPieChartData = data => {
        return data.map(item => {
            return { name: item.status, value: item.count }
        })
    }
    return (
        <div>
            <h2  className="text-2xl font-bold">Admin dashboard</h2>
            <p className="text-gray-400">Find all stat and earnings</p>

            <div className="stats shadow w-full">
                {
                    bookingStatus.map(stat => <div key={stat._id} className="stat">
                        <div className="stat-figure text-secondary">
                           <MdOutlineTaskAlt />

                        </div>
                        <div className="stat-title text-2xl">{stat._id}</div>
                        <div className="stat-value">{stat.count}</div>
                    </div>)
                }



            </div>
            <div className="flex flex-col md:flex-row items-center justify-between">
                <h2>Your total Revenue from {completedBookings.length} completed orders:
                   <span className="text-3xl font-bold text-green-500">${totalRevenue}</span></h2>

                     <div className='w-full h-[400px]'>
                    <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 2 }} responsive>
                        <Pie
                            dataKey="value"
                            startAngle={180}
                            endAngle={0}
                            data={getPieChartData(bookingStatus)}
                            cx="50%"
                            cy="100%"
                            outerRadius="120%"
                            fill="#8884d8"
                            label
                            isAnimationActive={true}
                        />
                        <Legend></Legend>
                        <Tooltip></Tooltip>
                    </PieChart>
                </div>
            </div>
        </div>

    );
};

export default AdminDashboardHome;