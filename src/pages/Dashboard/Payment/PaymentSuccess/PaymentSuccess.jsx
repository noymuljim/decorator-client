import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const axiosSecure = useAxiosSecure();
    const sessionId = searchParams.get("session_id");

    const [paymentInfo, setPaymentInfo] = useState({});
    const [isLoading, setIsLoading] = useState(Boolean(sessionId));

    useEffect(() => {
        if (!sessionId) {
            return;
        }
        axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res => {
                console.log(res.data);
                setPaymentInfo({
                    transactionId: res.data.transactionId,
                    trackingId: res.data.trackingId
                });
            })
            .catch(err => console.error("Payment confirmation error:", err))
            .finally(() => setIsLoading(false));
    }, [sessionId, axiosSecure]);

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full bg-base-100 rounded-3xl border border-base-200 shadow-xl p-8 text-center space-y-6">
                
                {/* Success Check Icon */}
                <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-success/20 rounded-full blur-xl transform scale-125 animate-pulse"></div>
                    <div className="h-20 w-20 rounded-full bg-success/10 text-success flex items-center justify-center relative z-10 shadow-sm">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                {/* Heading */}
                <div className="space-y-2">
                    <h2 className="text-3xl font-extrabold tracking-tight text-base-content">
                        Payment Successful!
                    </h2>
                    <p className="text-sm text-base-content/60">
                        Thank you! Your payment has been successfully processed and your booking is confirmed.
                    </p>
                </div>

                {/* Loading / Transaction Details Card */}
                {isLoading ? (
                    <div className="space-y-3 py-4 animate-pulse">
                        <div className="skeleton h-12 w-full rounded-2xl"></div>
                        <div className="skeleton h-12 w-full rounded-2xl"></div>
                    </div>
                ) : (
                    <div className="bg-base-200/50 rounded-2xl p-4 text-left space-y-3 border border-base-200">
                        <div className="flex justify-between items-center text-xs sm:text-sm">
                            <span className="text-base-content/60 font-medium">Transaction ID:</span>
                            <span className="font-mono font-semibold text-base-content bg-base-100 px-2.5 py-1 rounded-lg border border-base-200">
                                {paymentInfo.transactionId || "N/A"}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-xs sm:text-sm">
                            <span className="text-base-content/60 font-medium">Tracking ID:</span>
                            <span className="font-mono font-semibold text-primary bg-base-100 px-2.5 py-1 rounded-lg border border-base-200">
                                {paymentInfo.trackingId || "N/A"}
                            </span>
                        </div>
                    </div>
                )}

                {/* Action Button */}
                <div className="pt-2">
                    <Link to="/dashboard/myBookings" className="w-full block">
                        <button className="w-full btn btn-primary text-primary-content hover:btn-secondary rounded-full font-semibold shadow-sm transition-all duration-300 py-3">
                            View My Bookings
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default PaymentSuccess;