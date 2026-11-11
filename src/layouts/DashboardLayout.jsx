import { LuPackagePlus } from "react-icons/lu";
import { Link, NavLink, Outlet } from "react-router";
import { IoBookmarks } from "react-icons/io5";
import { FaBookmark, FaHistory, FaUserCheck, FaUsers } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import useRole from "../Hooks/useRole";
import { BsListTask } from "react-icons/bs";
import { MdBorderColor, MdOutlineDesignServices } from "react-icons/md";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import Logo from "../components/Logo";
import { SiFacebookgaming } from "react-icons/si";

const DashboardLayout = () => {
    const { role } = useRole();

    const navLinkClasses = ({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
            isActive
                ? "bg-primary text-primary-content shadow-sm"
                : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
        }`;

    // close drawer on mobile after link tap
    const closeDrawer = () => {
        const el = document.getElementById("my-drawer-4");
        if (el) el.checked = false;
    };

    return (
        <div className="drawer lg:drawer-open min-h-screen bg-base-100">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            {/* Main Content Area */}
            <div className="drawer-content flex flex-col min-h-screen bg-base-200/40">
                {/* Navbar */}
                <header className="navbar sticky top-0 z-30 w-full bg-base-100/80 backdrop-blur-md border-b border-base-200 px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        {/* Hamburger */}
                        <label
                            htmlFor="my-drawer-4"
                            aria-label="open sidebar"
                            className="btn btn-ghost lg:hidden p-1 mr-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>

                        <h1 className="font-bold text-xl tracking-tight text-base-content">
                            Dashboard
                        </h1>
                    </div>

                    {/* Role Badge */}
                    {role && (
                        <div className="badge badge-primary badge-outline capitalize font-semibold px-3 py-2 text-xs">
                            {role} Portal
                        </div>
                    )}
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
                    <Outlet />
                </main>
            </div>

            {/* Sidebar Drawer */}
            <div className="drawer-side z-40">
                <label
                    htmlFor="my-drawer-4"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>

                <aside className="w-64 min-h-full bg-base-100 border-r border-base-200 flex flex-col">
                    {/* Brand Header */}
                    <div className="p-5 border-b border-base-200">
                        <Link to="/" onClick={closeDrawer} className="flex items-center gap-3">
                            <Logo />
                        </Link>
                    </div>

                    <nav
                        onClick={(e) => {
                            if (e.target.closest("a")) closeDrawer();
                        }}
                        className="flex-1 p-4 space-y-6 overflow-y-auto"
                    >
                        <div className="space-y-1">
                            <NavLink to="/dashboard" end className={navLinkClasses}>
                                <SiFacebookgaming />
                                <span>Overview</span>
                            </NavLink>
                        </div>

                        {/* Admin Section */}
                        {role === "admin" && (
                            <div className="space-y-1">
                                <h2 className="px-3 text-[11px] font-bold uppercase tracking-wider text-base-content/40 mb-2">
                                    Admin Menu
                                </h2>
                                <NavLink to="/dashboard/addPackage" className={navLinkClasses}>
                                    <LuPackagePlus className="text-base shrink-0" />
                                    <span>Add Package</span>
                                </NavLink>
                                <NavLink to="/dashboard/my-services" className={navLinkClasses}>
                                    <MdOutlineDesignServices className="text-base shrink-0" />
                                    <span>Edit Package</span>
                                </NavLink>
                                <NavLink to="/dashboard/approveDecorator" className={navLinkClasses}>
                                    <FaUserCheck className="text-base shrink-0" />
                                    <span>Approve Decorator</span>
                                </NavLink>
                                <NavLink to="/dashboard/userManagement" className={navLinkClasses}>
                                    <FaUsers className="text-base shrink-0" />
                                    <span>User Management</span>
                                </NavLink>
                                <NavLink to="/dashboard/allBookings" className={navLinkClasses}>
                                    <IoBookmarks className="text-base shrink-0" />
                                    <span>All Bookings</span>
                                </NavLink>
                                <NavLink to="/dashboard/orderAssign" className={navLinkClasses}>
                                    <MdBorderColor className="text-base shrink-0" />
                                    <span>Assign Order</span>
                                </NavLink>
                            </div>
                        )}

                        {/* Decorator Section */}
                        {role === "decorator" && (
                            <div className="space-y-1">
                                <h2 className="px-3 text-[11px] font-bold uppercase tracking-wider text-base-content/40 mb-2">
                                    Decorator Menu
                                </h2>
                                <NavLink to="/dashboard/taskAssigned" className={navLinkClasses}>
                                    <BsListTask className="text-base shrink-0" />
                                    <span>Task Assigned</span>
                                </NavLink>
                                <NavLink to="/dashboard/myEarnings" className={navLinkClasses}>
                                    <FaMoneyBill1Wave className="text-base shrink-0" />
                                    <span>Earnings</span>
                                </NavLink>
                            </div>
                        )}

                        {/* User Section */}
                        {role === "user" && (
                            <div className="space-y-1">
                                <h2 className="px-3 text-[11px] font-bold uppercase tracking-wider text-base-content/40 mb-2">
                                    User Menu
                                </h2>
                                <NavLink to="/dashboard/myBookings" className={navLinkClasses}>
                                    <FaBookmark className="text-base shrink-0" />
                                    <span>My Bookings</span>
                                </NavLink>
                                <NavLink to="/dashboard/paymentHistory" className={navLinkClasses}>
                                    <FaHistory className="text-base shrink-0" />
                                    <span>Payment History</span>
                                </NavLink>
                                <NavLink to="/dashboard/beDecorator" className={navLinkClasses}>
                                    <GrUserWorker className="text-base shrink-0" />
                                    <span>Apply as Decorator</span>
                                </NavLink>
                            </div>
                        )}
                    </nav>
                </aside>
            </div>
        </div>
    );
};

export default DashboardLayout;