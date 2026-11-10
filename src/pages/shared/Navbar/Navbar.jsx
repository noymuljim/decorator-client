import { Link, NavLink, useLocation, useNavigate } from "react-router";
import Logo from "../../../components/Logo";
import Avater from "../../../assets/u.png";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";

const Navbar = () => {
    const { user, LogOut } = useAuth();
    const location = useLocation();
     const { role } = useRole();
    const navigate = useNavigate();
    

    const handleLogout = () => {
        LogOut()
            .then(() => {
                console.log("Logged out successfully");
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleContactClick = (e) => {
        e.preventDefault();

        const scrollToContact = () => {
            const element = document.getElementById("contact");
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        };

        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(scrollToContact, 150);
        } else {
            scrollToContact();
        }
    };
    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) => isActive ? "text-primary font-semibold" : "hover:text-primary transition-colors"}
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/allServices"
                    className={({ isActive }) => isActive ? "text-primary font-semibold" : "hover:text-primary transition-colors"}
                >
                    Services
                </NavLink>
            </li>

            <li>
                <a
                    href="#contact"
                    onClick={handleContactClick}
                    className="hover:text-primary transition-colors cursor-pointer"
                >
                    Contact
                </a>
            </li>
            {role !== "decorator" && (
                <li>
                    <NavLink
                        to="/dashboard/beDecorator"
                        className={({ isActive }) =>
                            isActive
                                ? "text-primary font-semibold"
                                : "hover:text-primary transition-colors"
                        }
                    >
                        Become a decorator
                    </NavLink>
                </li>
            )}
            {user && (
                <li>
                    <NavLink
                        to='/dashboard'
                        className={({ isActive }) => isActive ? "text-primary font-semibold" : "hover:text-primary transition-colors"}
                    >
                        Dashboard
                    </NavLink>
                </li>
            )}
        </>
    );

    return (
        <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-200 w-full transition-all">
            <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                {/* Navbar Start: Mobile Menu & Logo */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-1 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-3 shadow-xl border border-base-200">
                            {links}
                        </ul>
                    </div>
                    <Link to="/" className="flex items-center gap-2">
                        <Logo />
                    </Link>
                </div>

                {/* Navbar Center: Desktop Links */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-1 font-medium">
                        {links}
                    </ul>
                </div>

                {/* Navbar End: User Profile Dropdown or Auth state */}
                <div className="navbar-end gap-3">
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring ring-primary ring-offset-base-100 ring-offset-2">
                                <div className="w-10 rounded-full">
                                    <img
                                        src={user?.photoURL || Avater}
                                        alt="User Avatar"
                                    />
                                </div>
                            </div>
                            <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-xl border border-base-200 mt-3">
                                <div className="px-3 py-2 border-b border-base-200 mb-1">
                                    <p className="font-semibold text-sm truncate">{user?.displayName || "User"}</p>
                                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                                </div>
                                <li>
                                    <Link to='/profile' className="py-2">Profile</Link>
                                </li>

                                <div className="divider my-1"></div>
                                <li>
                                    <button onClick={handleLogout} className="text-error hover:bg-error/10 py-2">
                                        Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to='/login' className="btn btn-sm sm:btn-md btn-outline btn-primary px-5">
                                Log In
                            </Link>
                            <Link to='/register' className="hidden sm:inline-flex btn btn-sm sm:btn-md btn-primary">
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;