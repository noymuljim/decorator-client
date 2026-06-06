import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { IoPersonRemove } from "react-icons/io5";
import { FaRegTrashAlt, FaUserCheck } from "react-icons/fa";
import Swal from "sweetalert2";

const ApproveDecorator = () => {
        const axiosSecure=useAxiosSecure()

    const{data:decorators=[],refetch}=useQuery({
        queryKey:['decorators','pending'],
        queryFn:async()=>{
           const res = await axiosSecure.get('/decorators');
            return res.data;
        }
    })


        const updateDecoratorStatus = (decorator, status) => {
        const updateInfo = { status: status ,email:decorator.decoratorEmail}
        
        

        axiosSecure.patch(`/decorators/${decorator._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                  refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Status updated as ${status}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

    }
    
    

    const handleApproval = (decorator) => {
        updateDecoratorStatus(decorator, 'approved')

    };
    const handleRejection = (decorator) => {
        updateDecoratorStatus(decorator, 'rejected')
    }

        const handleDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed)

                

                axiosSecure.delete(`/decorators/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount) {
                            refetch()

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
        });
    }

    return (
        <div>
            <h2>Decorator Approval pending:{decorators.length}</h2>

                <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>District</th>
                            <th>Application Status</th>
                                  <th>Work status</th>

                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            decorators.map((decorator, index) => <tr key={decorator._id}>
                                <th>{index + 1}</th>
                                <td>{decorator.decoratorName}</td>
                                <td>{decorator.decoratorEmail}</td>
                                <td>{decorator.district}</td>
                                <td className={
                                    `${decorator.status === 'approved'
                                        ? 'text-green-500 font-semibold'
                                        : decorator.status === 'rejected'
                                            ? 'text-red-500 font-semibold'
                                            : 'text-black font-semibold'
                                    }`
                                }>
                                    {decorator.status}
                                </td>
                                    <td>{decorator.workStatus}</td>

                                <td>
                                    <button  onClick={()=>handleApproval(decorator)}
                                    className='btn btn-sm'><FaUserCheck />
                                    </button>
                                    <button onClick={()=>handleRejection(decorator)}
                                     className='btn mx-5 btn-sm'><IoPersonRemove />
                                    </button>
                                    <button onClick={()=>handleDelete(decorator._id)} 
                                    className='btn btn-sm'><FaRegTrashAlt />
                                    </button>
                                </td>

                            </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveDecorator;