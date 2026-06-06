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
            <h2>Manage Users:{users.length}</h2>

             <p>Search Text:{searchText}</p>
            
            <label className="input">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input onChange={(e)=>setSearchText(e.target.value)}
                 type="search"
                    className="grow"
                    placeholder="Search users" />

            </label>


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