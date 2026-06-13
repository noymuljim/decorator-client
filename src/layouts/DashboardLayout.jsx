import { LuPackagePlus } from "react-icons/lu";
import { Link, NavLink, Outlet } from "react-router";
import LandingPageLogo from "../assets/shome.png";
import { IoBookmarks } from "react-icons/io5";
import { FaBookmark, FaHistory, FaUserCheck, FaUsers } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import useRole from "../Hooks/useRole";
import { BsListTask } from "react-icons/bs";
import { MdBorderColor, MdOutlineDesignServices } from "react-icons/md";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { RiCalendarScheduleLine } from "react-icons/ri";





const DashboardLayout = () => {
    const { role } = useRole()
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <div className="px-4">Navbar Title</div>
                </nav>
                {/* Page content here */}

                <Outlet></Outlet>


            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">
                        {/* List item */}



                        <li>
                            <NavLink to='/'

                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Back to home">

                                <img className="h-[25px] w-[30px] " src={LandingPageLogo} alt="" />
                                <span className="is-drawer-close:hidden">Back to home</span>
                            </NavLink>
                        </li>

                        <li>
                            <Link to={'/dashboard'}>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                    {/* Home icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                    <span className="is-drawer-close:hidden mx-5">Homepage</span>
                                </button></Link>
                        </li>





                        {
                            role === 'admin' && <>
                                <li>
                                    <NavLink to='/dashboard/addPackage'

                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Add package">

                                        <LuPackagePlus />
                                        <span className="is-drawer-close:hidden">Add package</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/my-services'

                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="All services">

                                        <MdOutlineDesignServices />


                                        <span className="is-drawer-close:hidden">All services</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/approveDecorator'

                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Approve decorator">

                                        <FaUserCheck />

                                        <span className="is-drawer-close:hidden">Approve decorator</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/userManagement'

                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="User management">

                                        <FaUsers />

                                        <span className="is-drawer-close:hidden">User management</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to='/dashboard/allBookings'

                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="All bookings">

                                        <IoBookmarks />

                                        <span className="is-drawer-close:hidden">All bookings</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/orderAssign'

                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Assign order">


                                        <MdBorderColor />

                                        <span className="is-drawer-close:hidden">Assign order</span>
                                    </NavLink>
                                </li>

                            </>
                        }


                        {
                            role === 'decorator' && <>
                                <li>
                                    <NavLink to='/dashboard/taskAssigned'

                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Task assigned">

                                        <BsListTask />

                                        <span className="is-drawer-close:hidden">Task assigned</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/todaySchedule'

                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Today schedule">

                                        <RiCalendarScheduleLine />


                                        <span className="is-drawer-close:hidden">Today schedule</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/myEarnings'

                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Earning">

                                        <FaMoneyBill1Wave />


                                        <span className="is-drawer-close:hidden">Earning</span>
                                    </NavLink>
                                </li>
                            </>
                        }
                        {/* my bookings */}
                        {role === 'user' && (
                            <li>
                                <NavLink
                                    to="/dashboard/myBookings"
                                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                    data-tip="My bookings"
                                >
                                    <FaBookmark />
                                    <span className="is-drawer-close:hidden">My bookings</span>
                                </NavLink>
                            </li>
                        )}
                      {
                        role==='user' && <>
                         <li>
                            <NavLink to='/dashboard/paymentHistory'

                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payment history">

                                <FaHistory />

                                <span className="is-drawer-close:hidden">Payment history</span>
                            </NavLink>
                        </li>

                         <li>
                                    <NavLink to='/dashboard/beDecorator'

                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Apply as Decorator">

                                        <GrUserWorker />
                                        <span className="is-drawer-close:hidden">Apply as Decorator</span>
                                    </NavLink>
                                </li>

                        </>
                             
                        
                      }
                      
                        {/* List item */}
                        <li>
                            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                {/* Settings icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                                <span className="is-drawer-close:hidden">Settings</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;