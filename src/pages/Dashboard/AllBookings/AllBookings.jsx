import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllBookings = () => {
    const axiosSecure = useAxiosSecure()



    const { data: allBookings = [] } = useQuery({
        queryKey: ['allBookings'],
        queryFn:async () => {
            const res = await axiosSecure.get('/allBookings');
            return res.data;
        }
    })
    return (
        <div>
            <h2 className="text-2xl font-bold">All users Booking Request: {allBookings.length}</h2>
        </div>
    );
};

export default AllBookings;