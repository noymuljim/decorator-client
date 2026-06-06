import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const PyamnetHistory = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()



    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data
        }
    })
    return (
        <div>
            <h3 className='text-3xl'> payment history{payments.length}</h3>

           
           
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Parcel Name</th>
                            <th>Amount</th>
                            <th>Transaction Id</th>
                        </tr>
                    </thead>

                   
                    <tbody>
                         {
                        payments.map((payment,index)=><tr key={payment._id}>
                            <th>{index+1}</th>
                            <td>{payment.serviceName}</td>
                            <td>${payment.amount}</td>
                            <td>{payment.transactionId}</td>
                        </tr>)
                    }
                    
                        
                      
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PyamnetHistory;