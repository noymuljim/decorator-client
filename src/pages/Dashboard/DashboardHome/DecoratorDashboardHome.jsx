import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const formatMoney = (n) =>
    `$${Number(n || 0).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;

const DecoratorDashboardHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats, isLoading, isError, error } = useQuery({
        queryKey: ["decorator-stats", user?.email],
        enabled: !!user?.email,
        refetchOnMount: "always",
        queryFn: async () => {
            const res = await axiosSecure.get("/decorator/stats");
            return res.data;
        }
    });

    const totalAssigned = stats?.totalAssigned || 0;
    const completed = stats?.completed || 0;
    const earnings = stats?.earnings || 0;
    const pending = totalAssigned - completed;

    const cards = [
        { title: "Total Assigned Tasks", value: totalAssigned, color: "text-primary" },
        { title: "Completed Tasks", value: completed, color: "text-success" },
        { title: "Pending Tasks", value: pending, color: "text-warning" },
        { title: "My Earnings (90%)", value: formatMoney(earnings), color: "text-secondary" }
    ];

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (isError) {
        return (
            <p className="text-center text-error py-20">
                {error?.response?.data?.message || "Failed to load stats."}
            </p>
        );
    }

    return (
        <div className="p-4 sm:p-6">
            <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-base-content">
                    Welcome, {user?.displayName || "Decorator"}
                </h2>
                <p className="text-sm text-base-content/60 mt-1">Your work summary till now.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {cards.map((card) => (
                    <div
                        key={card.title}
                        className="bg-base-100 border border-base-200 rounded-3xl shadow-md p-6"
                    >
                        <p className="text-xs font-semibold uppercase tracking-wider text-base-content/60">
                            {card.title}
                        </p>
                        <h3 className={`text-3xl font-extrabold mt-2 ${card.color}`}>{card.value}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DecoratorDashboardHome;