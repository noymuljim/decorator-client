import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { GrUserAdmin } from "react-icons/gr";
import Swal from "sweetalert2";
import { LuShieldOff } from "react-icons/lu";
import { useState } from "react";


const UserManagement = () => {
        const [searchText, setSearchText] = useState('')


    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users',searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?searchText=${searchText}`);
            return res.data
        }
    })



    const handleManageAdmin = (user, role) => {

        const roleInfo = { role: role }

        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.displayName} marked as ${role}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

    }

    const handleMakeAdmin = (user) => {
        handleManageAdmin(user, 'admin')
    }
    const handleRemoveAdmin = (user) => {
        handleManageAdmin(user, 'user')
    }


    return (
        <div>
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-base-100 p-6 rounded-3xl border border-base-200 shadow-sm mb-6">
    {/* Page Title & Counter Badge */}
    <div className="space-y-1">
        <div className=" gap-3">
            <h2 className="text-2xl font-extrabold text-base-content tracking-tight">
                Manage Admin
            </h2>
           <h1 className="font-bold">Total Users: {users.length}
             </h1>
        </div>
       
    </div>

    {/* Search Input Controls */}
    
    <div className="w-full sm:w-80">
         <p className="text-xs text-base-content/60 mb-2">
            Search, filter, and review registered user accounts.
        </p>
        <div className="relative flex items-center">
            {/* Search Icon */}
            <svg 
                className="w-4 h-4 absolute left-4 text-base-content/40 pointer-events-none transition-colors group-focus-within:text-primary" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
            </svg>

            {/* Input Field */}
            <input
                type="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search users by name or email..."
                className="input input-bordered w-full pl-11 pr-10 py-2.5 rounded-2xl bg-base-200/50 border-base-300 focus:bg-base-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-sm"
            />

            {/* Clear Button (Shows when typing) */}
            {searchText && (
                <button
                    type="button"
                    onClick={() => setSearchText("")}
                    className="absolute right-3 btn btn-ghost btn-xs btn-circle text-base-content/40 hover:text-base-content"
                >
                    ✕
                </button>
            )}
        </div>
        
        {/* Real-time Query Indicator Pill */}
        {searchText && (
            <div className="mt-2 text-xs text-base-content/60 flex items-center gap-1">
                <span>Filtering by:</span>
                <span className="font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                    "{searchText}"
                </span>
            </div>
        )}
    </div>
</div>


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Action</th>
                            <th>Other Actions</th>


                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) => <tr key={user._id}>
                                <td>
                                    {i + 1}
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={user.photoURL} alt="" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.displayName}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <td>
                                    {user.role}
                                </td>

                                <th>
                                    {
                                        user.role === 'admin' ?
                                            <button onClick={() => handleRemoveAdmin(user)}
                                                className="btn bg-green-500 text-white"><GrUserAdmin />
                                            </button> :

                                            <button onClick={() => handleMakeAdmin(user)}
                                                  className="btn bg-red-500 text-white"><LuShieldOff />
                                            </button>
                                    }
                                </th>
                                <th>
                                    action
                                </th>

                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;