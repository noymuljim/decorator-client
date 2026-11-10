import { useState } from "react";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";

const Contact = () => {
    const { user } = useAuth() || {};
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const activeEmail = user?.email || email;

    // Direct Email Handler
    const handleEmailSend = (e) => {
        e.preventDefault();
        const recipient = "nm.jimnun@gmail.com";
        const subject = encodeURIComponent(`Decoration Inquiry from ${activeEmail || "Guest"}`);
        const body = encodeURIComponent(
            `Sender Email: ${activeEmail || "Not Provided"}\n\nMessage:\n${message}`
        );

        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    };

    // Direct WhatsApp Handler
    const handleWhatsAppSend = () => {
        const phoneNumber = "8801400104505";
        const text = encodeURIComponent(
            `Hi StyleDecor! 👋\nMy Email: ${activeEmail || "Guest"}\n\nMessage:\n${message || "I am interested in your decoration services."}`
        );

        window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
    };

    return (
        <section id="contact" className="py-12 max-w-4xl mx-auto px-4">
           <div className="text-center space-y-2">
                    <h2 className="font-extrabold text-4xl sm:text-5xl text-base-content tracking-tight text-center">
                        Get in <span className="text-primary ">Touch</span>
                    </h2>
                    <p className="text-base-content/70 text-sm sm:text-base mb-4">
                        Have questions or need a quote? Reach out via WhatsApp or Email.
                    </p>
                </div>
            <div className="bg-base-100 border border-base-200 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">

                {/* Header */}
                

               
                <form onSubmit={handleEmailSend} className="space-y-4">

                  
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Your Email</span>
                        </label>
                        <input
                            type="email"
                            required
                            value={activeEmail}
                            readOnly={!!user?.email} 
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            className={`input input-bordered rounded-xl w-full ${
                                user?.email ? "bg-base-200 cursor-not-allowed" : ""
                            }`}
                        />
                    </div>

                   
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Message</span>
                        </label>
                        <textarea
                            rows={4}
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tell us about your event..."
                            className="textarea textarea-bordered rounded-xl w-full resize-none"
                        ></textarea>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-4">
                        <button
                            type="button"
                            onClick={handleWhatsAppSend}
                            className="btn bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full sm:flex-1 font-semibold border-none flex items-center justify-center gap-2"
                        >
                            <FaWhatsapp className="text-xl" />
                            WhatsApp Us
                        </button>

                        <button
                            type="submit"
                            className="btn btn-primary text-primary-content rounded-full sm:flex-1 font-semibold flex items-center justify-center gap-2"
                        >
                            <FaEnvelope className="text-lg" />
                            Send Email
                        </button>
                    </div>

                </form>
            </div>
        </section>
    );
};

export default Contact;