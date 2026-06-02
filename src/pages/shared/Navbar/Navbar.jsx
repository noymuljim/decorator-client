import { Link, NavLink } from "react-router";
import Logo from "../../../components/Logo";
import Avater from "../../../assets/u.png";
import useAuth from "../../../Hooks/useAuth";

const Navbar = () => {
    const { user, LogOut } = useAuth();

    const handleLogout = () => {
        LogOut()
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.log(error)
            })
    }
    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="">Services</NavLink></li>
        <li><NavLink to="">About</NavLink></li>
        <li><NavLink to="">Contact</NavLink></li>
        {
            user && <>
                <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
            </>
        }

    </>
    return (
        <div className="bg-base-100 shadow-sm w-full ">

            <div className="navbar p-0 max-w-7xl mx-auto">
                <div className="navbar-start ">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>

                    <a>  <Logo ></Logo></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">

                        {links}
                    </ul>
                </div>
                <div className="navbar-end">



                    <div className="dropdown dropdown-bottom dropdown-end">




                        <div tabIndex={0} role="button" className="btn btn-secondary rounded-full m-0">
                            <img
                                className="h-[30px] w-[30px] rounded-full object-cover"
                                src={user && user.photoURL ? user.photoURL : Avater}
                                alt="User Avatar"
                            />
                        </div>





                        <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li>
                                {
                                    user ?
                                        <a onClick={handleLogout}>Log Out</a>
                                        :
                                        <Link to='/login'>Log In</Link>
                                }
                            </li>
                            <li><a>Profile</a></li>
                        </ul>

                    </div>



                </div>

            </div>


        </div>
    );
};

export default Navbar;