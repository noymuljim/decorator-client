import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

const OrderAssign = () => {
        const queryClient = useQueryClient();

    const [selectedBooking, setSelectedBooking] = useState(null)

    const decoratorModalRef = useRef()

    const axiosSecure = useAxiosSecure();
    const { data: bookings = [] ,refetch: bookingsRefetch} = useQuery({
        queryKey: ['bookings', 'panding_assign'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings?bookingStatus=panding_assign')
            return res.data;
        }
    })

    const { data: decorators = [] } = useQuery({
        queryKey: ['decorators', 'available', selectedBooking?.District],
        enabled: !!selectedBooking,

        queryFn: async () => {
            const res = await axiosSecure.get(`/decorators?status=approved&workStatus=available&district=${selectedBooking?.District}`);
            return res.data;
        }
    })
    const openAssignOrderModal = (booking) => {
        setSelectedBooking(booking)
        decoratorModalRef.current.showModal()
    }

    const assignDecorator=(decorator)=>{
          const decoratorAssignInfo={
            decoratorId:decorator._id,
            decoratorEmail:decorator.decoratorEmail,
            decoratorName:decorator.decoratorName,
            bookingId:selectedBooking._id,
        }
              axiosSecure.patch(`/bookings/${selectedBooking._id}`,decoratorAssignInfo)
               .then(res => {
                if (res.data.modifiedCount) {

                     queryClient.invalidateQueries({
                        queryKey: ['decorators', 'available', selectedBooking?.District]
                    });
                    decoratorModalRef.current.close();
                    bookingsRefetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${decorator.decoratorName} has been assign for decoration`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })


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
                                        <button onClick={() => openAssignOrderModal(booking)}
                                            className="btn btn-primary text-white">
                                            Find decorators</button>
                                    }
                                </td>

                            </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>


            {/* modal */}


            <dialog ref={decoratorModalRef}
                className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Decorators available according to district match: {decorators.length}</h3>


                    {/* table */}
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Decorator name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    decorators.map((decorator, index) => <tr key={decorator._id}>
                                        <th>{index + 1}</th>
                                        <td>{decorator.decoratorName}</td>
                                        <td>{decorator.decoratorEmail}</td>
                                        <td>
                                            {
                                                <button onClick={()=>assignDecorator(decorator)}
                                                className="btn btn-primary text-white">Assign</button>
                                            }
                                        </td>


                                    </tr>)
                                }


                            </tbody>
                        </table>
                    </div>


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