import { useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const Tracking = () => {
    const { trackingId } = useParams();
    const axiosInstance = useAxios();

    const { data: trackings = [], isLoading } = useQuery({
        queryKey: ["tracking", trackingId],
        queryFn: async () => {
            const res = await axiosInstance.get(`/trackings/${trackingId}/logs`);
            return res.data;
        },
        enabled: !!trackingId
    });

    return (
        <div className="min-h-s max-w-2xl mx-auto p-6 bg-base-100 rounded-2xl border border-base-200 shadow-sm my-6">
          
            <div className="mb-6 flex justify-between items-center border-b border-base-200 pb-4">
                <h1 className="text-xl font-bold">Package Tracking</h1>
                <span >
                    ID: {trackingId}
                </span>
            </div>

           
            {isLoading ? (
                <div className="text-center py-6">
                    <span className="loading loading-spinner loading-md text-primary"></span>
                </div>
            ) : trackings.length === 0 ? (
                <p className="text-center text-sm text-base-content/60 py-6">No logs available.</p>
            ) : (
                <ul className="timeline timeline-vertical">
                    {trackings.map((log, index) => (
                        <li key={log._id || index}>
                            {index !== 0 && <hr />}
                            
                            <div className="timeline-start text-xs text-base-content/60">
                                {new Date(log.createdAt).toLocaleString([], {
                                    dateStyle: 'short',
                                    timeStyle: 'short'
                                })}
                            </div>

                            <div className="timeline-middle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5 text-primary"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>

                            <div className="timeline-end timeline-box font-medium text-sm">
                                {log.details}
                            </div>

                     
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Tracking;