import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { useLoaderData } from "react-router";
import team from "../../../assets/team.jpg";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const BeDecorator = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const serviceCenters = useLoaderData() || [];

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            decoratorName: user?.displayName || "",
            decoratorEmail: user?.email || "",
            decoratorPhone: "",
            region: "",
            district: ""
        }
    });

    // Unique regions list
    const regions = [...new Set(serviceCenters.map((c) => c.region))].filter(Boolean);

    // Watch region to derive districts
    const selectedRegion = useWatch({ control, name: "region" });

    const getDistrictsByRegion = (region) => {
        if (!region || region === "Pick a region") return [];
        const regionDistricts = serviceCenters.filter((c) => c.region === region);
        return [...new Set(regionDistricts.map((d) => d.district))].filter(Boolean);
    };

    const handleDecorator = async (data) => {
        try {
            const res = await axiosSecure.post("/decorators", data);

            if (res.data?.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Application Submitted!",
                    text: "Your application has been received. We will notify you within 48 hours.",
                    showConfirmButton: true,
                    confirmButtonColor: "#4F46E5",
                    customClass: {
                        popup: "rounded-3xl"
                    }
                });
                reset();
            }
        }  catch (error) {
    console.error("Submission error:", error);
    const status = error.response?.status;
    Swal.fire({
        icon: status === 409 ? "info" : "error",
        title: status === 409 ? "Already Applied" : "Submission Failed",
        text: error.response?.data?.message || "Something went wrong. Try again.",
        confirmButtonColor: "#4F46E5",
        customClass: { popup: "rounded-3xl" }
    });
}
    };

    return (
        <div className="max-w-6xl mx-auto my-12 px-4 sm:px-6">
            <div className="bg-base-100 rounded-3xl border border-base-200 shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    
                    {/* Left Form Column */}
                    <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
                        {/* Header */}
                        <div className="mb-8">
                            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                                Join Our Team
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-base-content mt-3 tracking-tight">
                                Become a Decorator
                            </h1>
                            <p className="text-sm text-base-content/60 mt-2">
                                Expand your business reach and start offering professional decoration services with us today.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(handleDecorator)} className="space-y-5">
                            
                            {/* Full Name */}
                            <div className="form-control">
                                <label className="label py-1">
                                    <span className="label-text font-semibold text-base-content">Full Name</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Decorator name"
                                        {...register("decoratorName", { required: "Name is required" })}
                                        className="input input-bordered w-full rounded-2xl focus:outline-none focus:border-primary transition-all duration-200"
                                    />
                                </div>
                                {errors.decoratorName && (
                                    <span className="text-xs text-error mt-1">{errors.decoratorName.message}</span>
                                )}
                            </div>

                            {/* Email Address */}
                            <div className="form-control">
                                <label className="label py-1">
                                    <span className="label-text font-semibold text-base-content">Email Address</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Decorator email"
                                    {...register("decoratorEmail", { 
                                        required: "Email is required",
                                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                                    })}
                                    className="input input-bordered w-full rounded-2xl focus:outline-none focus:border-primary transition-all duration-200"
                                />
                                {errors.decoratorEmail && (
                                    <span className="text-xs text-error mt-1">{errors.decoratorEmail.message}</span>
                                )}
                            </div>

                            {/* Phone Number */}
                            <div className="form-control">
                                <label className="label py-1">
                                    <span className="label-text font-semibold text-base-content">Phone Number</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        placeholder="+880 1XXXXXXXXX"
                                        {...register("decoratorPhone", { required: "Phone number is required" })}
                                        className="input input-bordered w-full rounded-2xl focus:outline-none focus:border-primary transition-all duration-200"
                                    />
                                </div>
                                {errors.decoratorPhone && (
                                    <span className="text-xs text-error mt-1">{errors.decoratorPhone.message}</span>
                                )}
                            </div>

                            {/* Region & District Selectors (Grid Layout) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                                {/* Region Select */}
                                <div className="form-control">
                                    <label className="label py-1">
                                        <span className="label-text font-semibold text-base-content">Region</span>
                                    </label>
                                    <select
                                        {...register("region", { required: "Please select a region" })}
                                        defaultValue=""
                                        className="select select-bordered w-full rounded-2xl focus:outline-none focus:border-primary transition-all duration-200"
                                    >
                                        <option value="" disabled>
                                            Pick a region
                                        </option>
                                        {regions.map((r, index) => (
                                            <option key={index} value={r}>
                                                {r}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.region && (
                                        <span className="text-xs text-error mt-1">{errors.region.message}</span>
                                    )}
                                </div>

                                {/* District Select */}
                                <div className="form-control">
                                    <label className="label py-1">
                                        <span className="label-text font-semibold text-base-content">District</span>
                                    </label>
                                    <select
                                        {...register("district", { required: "Please select a district" })}
                                        defaultValue=""
                                        disabled={!selectedRegion || selectedRegion === "Pick a region"}
                                        className="select select-bordered w-full rounded-2xl focus:outline-none focus:border-primary transition-all duration-200 disabled:bg-base-200/50"
                                    >
                                        <option value="" disabled>
                                            Pick a District
                                        </option>
                                        {getDistrictsByRegion(selectedRegion).map((d, index) => (
                                            <option key={index} value={d}>
                                                {d}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.district && (
                                        <span className="text-xs text-error mt-1">{errors.district.message}</span>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn btn-primary w-full rounded-2xl font-bold text-primary-content shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 py-3"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="loading loading-spinner loading-sm"></span>
                                            Submitting Application...
                                        </span>
                                    ) : (
                                        "Apply as a Decorator"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Image Banner Column */}
                    <div className="lg:col-span-5 relative bg-base-200 min-h-[320px] lg:min-h-full">
                        <img
                            src={team}
                            alt="Decorator Team"
                            className="absolute inset-0 w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/30" />
                        
                        {/* Overlay Card Info */}
                        <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-base-100/80 backdrop-blur-md border border-white/20 shadow-lg text-base-content">
                            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Why Join Us?</p>
                            <h3 className="text-lg font-bold mt-1">Get verified orders in your region</h3>
                            <p className="text-xs text-base-content/70 mt-1">
                                Quick approval within 48 hours & direct access to thousands of clients.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BeDecorator;