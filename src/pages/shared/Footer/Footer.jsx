import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Logo from "../../../components/Logo";

const Footer = () => {
    return (
       <div>
         <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
            
            <Logo></Logo>
            {/* Contact Details */}
            <nav>
                <h6 className="footer-title">Contact Us</h6>
                <p>Email: support@styledecor.com</p>
                <p>Phone: +880 1234-567890</p>
                <p>Address: Dhaka, Bangladesh</p>
            </nav>

            {/* Social Media */}
            <nav>
                <h6 className="footer-title">Follow Us</h6>
                <a href="#" className="link link-hover flex items-center gap-2">
                    <FaFacebookF /> Facebook
                </a>
                <a href="#" className="link link-hover flex items-center gap-2">
                    <FaInstagram /> Instagram
                </a>
                <a href="#" className="link link-hover flex items-center gap-2">
                    <FaLinkedinIn /> LinkedIn
                </a>
            </nav>

            {/* Business Hours */}
            <nav>
                <h6 className="footer-title">Business Hours</h6>
                <p>Mon - Fri: 9:00 AM - 8:00 PM</p>
                <p>Saturday: 10:00 AM - 6:00 PM</p>
                <p>Sunday: Closed</p>
            </nav>
        </footer>

        <div className="bg-black text-center text-white py-4">
    <p>
        © {new Date().getFullYear()} StyleDecor. All rights reserved.
    </p>
</div>
       </div>
    );
};

export default Footer;