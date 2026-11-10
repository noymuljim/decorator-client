import { FaFacebookF, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router";
import Logo from "../../../components/Logo";

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content border-t border-base-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-base-300/80">
                    
                    <div className="lg:col-span-4 space-y-4">
                        <div className="flex items-center gap-2">
                            <Logo />
                        </div>
                        <p className="text-sm text-base-content/70 leading-relaxed max-w-sm">
                            Transforming your special moments into unforgettable celebrations with premium, custom event decoration services across Bangladesh.
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            <a 
                                href="https://facebook.com" 
                                target="_blank" 
                                rel="noreferrer" 
                                aria-label="Facebook"
                                className="w-10 h-10 rounded-full bg-base-100 border border-base-300 flex items-center justify-center text-base-content hover:bg-primary hover:text-primary-content hover:border-primary transition-all duration-300 shadow-sm"
                            >
                                <FaFacebookF className="text-sm" />
                            </a>
                            <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noreferrer" 
                                aria-label="Instagram"
                                className="w-10 h-10 rounded-full bg-base-100 border border-base-300 flex items-center justify-center text-base-content hover:bg-primary hover:text-primary-content hover:border-primary transition-all duration-300 shadow-sm"
                            >
                                <FaInstagram className="text-sm" />
                            </a>
                            <a 
                                href="https://www.linkedin.com/in/noymul-matin-jim-7a119332a/" 
                                target="_blank" 
                                rel="noreferrer" 
                                aria-label="LinkedIn"
                                className="w-10 h-10 rounded-full bg-base-100 border border-base-300 flex items-center justify-center text-base-content hover:bg-primary hover:text-primary-content hover:border-primary transition-all duration-300 shadow-sm"
                            >
                                <FaLinkedinIn className="text-sm" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2 space-y-4">
                        <h6 className="text-sm font-bold uppercase tracking-wider text-primary">Quick Links</h6>
                        <ul className="space-y-2.5 text-sm text-base-content/80">
                            <li>
                                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link to="/allServices" className="hover:text-primary transition-colors">Services</Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info Column */}
                    <div className="lg:col-span-3 space-y-4">
                        <h6 className="text-sm font-bold uppercase tracking-wider text-primary">Get In Touch</h6>
                        <ul className="space-y-3 text-sm text-base-content/80">
                            <li className="flex items-start gap-3">
                                <FaEnvelope className="text-primary mt-1 shrink-0" />
                                <a href="mailto:styledecorservice@gmail.com" className="hover:text-primary transition-colors break-all">
                                    nm.jimnun@@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaPhoneAlt className="text-primary shrink-0" />
                                <a href="tel:+8801234567890" className="hover:text-primary transition-colors">
                                    +880 1234-567890demo
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-primary mt-1 shrink-0" />
                                <span>Dhaka, Bangladesh</span>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:col-span-3 space-y-4">
                        <h6 className="text-sm font-bold uppercase tracking-wider text-primary">Business Hours</h6>
                        <div className="bg-base-100 border border-base-300 rounded-2xl p-4 space-y-2 text-xs sm:text-sm shadow-sm">
                            <div className="flex justify-between items-center text-base-content/90">
                                <span>Mon - Fri:</span>
                                <span className="font-semibold text-primary">9:00 AM - 8:00 PM</span>
                            </div>
                            <div className="flex justify-between items-center text-base-content/90">
                                <span>Saturday:</span>
                                <span className="font-semibold text-primary">10:00 AM - 6:00 PM</span>
                            </div>
                            <div className="flex justify-between items-center text-base-content/60">
                                <span>Sunday:</span>
                                <span className="font-semibold text-error">Closed</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-base-content/60 gap-4 text-center sm:text-left">
                    <p>© {new Date().getFullYear()} StyleDecor. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;