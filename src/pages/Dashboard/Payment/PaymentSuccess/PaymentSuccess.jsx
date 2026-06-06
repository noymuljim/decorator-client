import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
        const[paymentInfo,setPaymentInfo]=useState({})


      const[searchParams]=useSearchParams();
    const axiosSecure = useAxiosSecure();

    const sessionId= searchParams.get('session_id')
    console.log(sessionId)


    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data)
                     setPaymentInfo({
                        transactionId:res.data.transactionId,
                        trackingId:res.data.trackingId
                    })
                })
        }
    }, [sessionId, axiosSecure])
    return (
        <div>
            <h2>Success</h2>
            <p>transaction ID:{paymentInfo.transactionId}</p>
            <p>your traking ID:{paymentInfo.trackingId}</p>
            
        </div>
    );
};

export default PaymentSuccess;