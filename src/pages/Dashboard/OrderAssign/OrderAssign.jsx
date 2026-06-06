import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useRef } from "react";

const OrderAssign = () => {
        const decoratorModalRef = useRef()

    const axiosSecure = useAxiosSecure();
    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings', 'panding-assign'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings?bookingStatus=panding-assign')
            return res.data;
        }
    })
    const openAssignOrderModal= (booking)=>{
    decoratorModalRef.current.showModal()
}
    return (
        <div>
            <h2>assign order to decoratirs:{bookings.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Created at</th>
                            <th>Sender District</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((booking, index) => <tr key={booking._id}>
                                <th>{index + 1}</th>
                                <td>{booking.serviceName}</td>
                                <td>{booking.serviceCost}</td>
                                <td>{booking.createdAt}</td>
                                <td>{booking.District}</td>
                                <td>
                                    {
                                        <button onClick={()=>openAssignOrderModal(booking)}
                                        className="btn btn-primary text-white">
                                            Assign Decorator</button>
                                    }
                                </td>

                            </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>


{/* modal */}
              <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>open modal</button>
           
           
            <dialog ref={decoratorModalRef}
             className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default OrderAssign;