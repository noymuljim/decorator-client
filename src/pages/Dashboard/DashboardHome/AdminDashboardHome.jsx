
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {ResponsiveContainer,BarChart,Bar,XAxis, YAxis,CartesianGrid,Tooltip,Legend} from "recharts";
import {FiDollarSign} from "react-icons/fi";

const formatMoney = (n) =>
    `$${Number(n || 0).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;

const AdminDashboardHome = () => {
    const axiosSecure = useAxiosSecure();
    const {data: earnings,isLoading: earningLoading,isError: earningError,error} = useQuery({
        queryKey: ["admin-earnings-summary"],
        refetchOnMount: "always",
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/earnings-summary");
            return res.data;
        },
    });

    const adminEarning = earnings?.adminEarning || 0;

  

const {  data: weekly,  isLoading: weeklyLoading,  isError: weeklyError} = useQuery({
    queryKey: ["admin-weekly-stats"],
    refetchOnMount: "always",
    queryFn: async () => {
        const res = await axiosSecure.get("/admin/weekly-stats");
        return res.data;
    },
});
 
 

    return (
        <div className="min-h-screen space-y-8 pb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-base-content">
                        Admin Dashboard
                    </h1>
                <p className="text-sm text-base-content/50 mt-2">
                        Monitor your bookings, track performance and manage earnings.
                    </p>
                </div>

              
            </div>

            {/* Earnings Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-secondary p-6 sm:p-8 text-primary-content shadow-xl shadow-primary/10">

                {/* Decorative circles */}
                <div className="absolute -right-16 -top-20 w-72 h-72 rounded-full border border-white/10" />
                <div className="absolute -right-4 -bottom-32 w-64 h-64 rounded-full border border-white/10" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">

                    <div>
                        <div className="flex items-center gap-2 text-white/80 mb-5">
                            <div className="p-2 rounded-xl bg-white/15">
                                <FiDollarSign size={20} />
                            </div>
                            <span className="text-sm font-semibold">
                                Total Admin Earnings
                            </span>
                        </div>

                        {earningLoading ? (
                            <span className="loading loading-dots loading-lg" />
                        ) : earningError ? (
                            <p className="text-sm text-white">
                                {error?.response?.data?.message ||
                                    "Failed to load earnings"}
                            </p>
                        ) : (
                            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                                {formatMoney(adminEarning)}
                            </h2>
                        )}

                        <p className="text-sm text-white/70 mt-3">
                            Your total earnings from 10% commission
                        </p>
                    </div>

               
                </div>

              
            </div>

       {/* Weekly chart */}
<div className="rounded-2xl bg-base-100 border border-base-200 p-5 shadow-sm">
    <h3 className="text-lg font-bold mb-1">Last 7 Days Activity</h3>
    <p className="text-sm text-base-content/50 mb-4">
        New registrations vs approved decorators per day
    </p>

    {weeklyLoading ? (
        <div className="h-72 flex items-center justify-center">
            <span className="loading loading-dots loading-lg" />
        </div>
    ) : weeklyError ? (
        <p className="text-sm text-error">Failed to load chart</p>
    ) : (
        <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekly?.daily || []} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                    <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
                    <YAxis allowDecimals={false} tickLine={false} axisLine={false} fontSize={12} />
                    <Tooltip cursor={{ fill: "rgba(128,128,128,0.1)" }} />
                    <Legend />
                    <Bar dataKey="users" name="New Users" fill="#6366f1" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="decorators" name="Approved Decorators" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )}
</div>

          

        </div>
    );
};

export default AdminDashboardHome;
