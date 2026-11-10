import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const ServiceDetails = () => {
    const serviceCenters = useLoaderData() || [];
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, reset, control, formState: { errors },
    } = useForm();

    const regionsDuplicate = serviceCenters.map((c) => c.region);
    const regions = [...new Set(regionsDuplicate)];
    const Region = useWatch({ control, name: "Region" });

    const districtsByRegion = (region) => {
        const regionDistricts = serviceCenters.filter((c) => c.region === region);
        const districts = regionDistricts.map((d) => d.district);
        return [...new Set(districts)];
    };

    const serviceModalRef = useRef();
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: service = {}, isLoading } = useQuery({
        queryKey: ["service", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/serviceDetails/${id}`);
            return res.data;
        },
    });

    useEffect(() => {
        if (service?._id) {
            reset({
                serviceName: service.serviceName,
                serviceCost: service.serviceCost,
                userName: user?.displayName || "",
                userEmail: user?.email || "",
            });
        }
    }, [service, user, reset]);

    const openServiceDetailModal = () => {
        if (!user) {
            navigate("/login");
            return;
        }
        serviceModalRef.current?.showModal();
    };

    const closeModal = () => {
        serviceModalRef.current?.close();
    };


    const handleConfirm = async (data) => {
        try {
            setIsSubmitting(true);

            await axiosSecure.post("/bookings", {
                ...data,
                serviceId: service._id,
                createdAt: new Date(),
            });

            closeModal();

            Swal.fire({
                icon: "success",
                title: "Booking Successful!",
                text: "Your booking request has been submitted successfully.",
                confirmButtonText: "View My Bookings",
                confirmButtonColor: "#2563eb",
                allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/dashboard/myBookings");
                }
            });

        } catch (error) {
            console.error("Booking error:", error);

            Swal.fire({
                icon: "error",
                title: "Booking Failed!",
                text: "Something went wrong. Please try again.",
                confirmButtonText: "Okay",
                confirmButtonColor: "#dc2626",
            });

        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8 animate-pulse">
                    <div className="skeleton h-80 lg:w-1/2 rounded-3xl"></div>
                    <div className="flex-1 space-y-4">
                        <div className="skeleton h-8 w-1/3 rounded-lg"></div>
                        <div className="skeleton h-10 w-3/4 rounded-lg"></div>
                        <div className="skeleton h-20 w-full rounded-2xl"></div>
                        <div className="skeleton h-12 w-40 rounded-full"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="bg-base-100 rounded-3xl border border-base-200/80 shadow-sm p-6 lg:p-8 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                    <div className="lg:col-span-5 relative group">
                        <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl transition-all group-hover:bg-primary/20"></div>
                        <img
                            className="w-full h-72 sm:h-80 object-cover rounded-2xl relative z-10 shadow-sm"
                            src={service.servicethumbnail}
                            alt={service.serviceName}
                        />
                        {service.serviceCategory && (
                            <span className="absolute top-4 left-4 z-20 badge badge-neutral bg-base-100/90 backdrop-blur-md text-base-content border-none shadow-md px-3.5 py-2 font-medium text-xs">
                                {service.serviceCategory}
                            </span>
                        )}
                    </div>

                    {/* Service Info Header */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
                        <div className="space-y-3">
                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-base-content leading-tight">
                                {service.serviceName}
                            </h1>

                            {/* Key Stats Bar */}
                            <div className="flex flex-wrap items-center gap-3 pt-1">
                                {service.serviceUnit && (
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-base-200/60 text-base-content/80 text-xs font-semibold">
                                        <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                        </svg>
                                        <span>Unit: {service.serviceUnit} Sqft</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Pricing Card */}
                        <div className="p-5 rounded-2xl bg-base-200/100 border border-base-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <span className="text-xs text-base-content/60 block font-medium">Service Rate</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-extrabold text-primary">{service.serviceCost}</span>
                                    <span className="text-base font-bold text-primary">TK</span>
                                    <span className="text-xs text-base-content/60 font-normal">/ per sqft</span>
                                </div>
                            </div>

                            <button
                                onClick={openServiceDetailModal}
                                className="btn btn-secondary text-secondary-content hover:btn-primary hover:text-primary-content rounded-full font-semibold px-8 shadow-sm transition-all duration-300"
                            >
                                Book Service Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description Card Section */}
            <div className="bg-base-100 rounded-3xl border border-base-200/80 shadow-sm p-6 lg:p-8">
                <h2 className="text-xl font-bold text-base-content mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Service Description
                </h2>
                <div className="prose max-w-none text-base-content/80 text-base leading-relaxed space-y-4">
                    <p>{service.serviceDescription || "No detailed description available for this service."}</p>
                </div>
            </div>

            {/*  Booking Modal */}
            <dialog ref={serviceModalRef} className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
                <div className="modal-box max-w-2xl bg-base-100 rounded-3xl p-6 sm:p-8 shadow-2xl border border-base-200">

                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-base-200">
                        <div>
                            <h3 className="text-2xl font-bold text-base-content">Confirm Booking</h3>
                            <p className="text-xs text-base-content/60 mt-1">Fill out the details below to complete your request.</p>
                        </div>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="btn btn-sm btn-circle btn-ghost text-base-content/60 hover:text-base-content"
                        >
                            ✕
                        </button>
                    </div>

                    <form onSubmit={(event) => handleSubmit(handleConfirm)(event)} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <div className="form-control">
                                <label className="label text-xs font-semibold text-base-content/70">User Name</label>
                                <input
                                    {...register("userName", { required: "Name is required" })}
                                    type="text"
                                    className="input input-bordered w-full rounded-xl bg-base-200/30"
                                    placeholder="Your full name"
                                />
                                {errors.userName && <span className="text-red-500 text-xs mt-1">{errors.userName.message}</span>}
                            </div>

                            {/* User Email */}
                            <div className="form-control">
                                <label className="label text-xs font-semibold text-base-content/70">Email Address</label>
                                <input
                                    {...register("userEmail", { required: "Email is required" })}
                                    type="email"
                                    readOnly
                                    className="input input-bordered w-full rounded-xl bg-base-200/60 opacity-80 cursor-not-allowed"
                                />
                                {errors.userEmail && <span className="text-red-500 text-xs mt-1">{errors.userEmail.message}</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Service Name */}
                            <div className="form-control">
                                <label className="label text-xs font-semibold text-base-content/70">Service Name</label>
                                <input
                                    {...register("serviceName")}
                                    type="text"
                                    readOnly
                                    className="input input-bordered w-full rounded-xl bg-base-200/60 opacity-80 cursor-not-allowed font-medium"
                                />
                            </div>

                            {/* Service Cost */}
                            <div className="form-control">
                                <label className="label text-xs font-semibold text-base-content/70">Service Rate (TK / sqft)</label>
                                <input
                                    {...register("serviceCost")}
                                    type="text"
                                    readOnly
                                    className="input input-bordered w-full rounded-xl bg-base-200/60 opacity-80 cursor-not-allowed font-medium"
                                />
                            </div>
                        </div>

                        {/* Date */}
                        <div className="form-control">
                            <label className="label text-xs font-semibold text-base-content/70">Preferred Service Date</label>
                            <input
                                {...register("date", { required: "Preferred date is required" })}
                                type="date"
                                className="input input-bordered w-full rounded-xl bg-base-200/30"
                            />
                            {errors.date && <span className="text-red-500 text-xs mt-1">{errors.date.message}</span>}
                        </div>
                        {/* mobile */}
            <div className="form-control">
                                <label className="label text-xs font-semibold text-base-content/70">Mobile</label>
                                <input
                                    {...register("Mobile", { required: "Name is required" })}
                                    type="number"
                                    className="input input-bordered w-full rounded-xl bg-base-200/30"
                                    placeholder="Your mobile number"
                                />
                                {errors.Mobile && <span className="text-red-500 text-xs mt-1">{errors.Mobile.message}</span>}
                            </div>
                        {/* Region & District Selects */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label text-xs font-semibold text-base-content/70">Region</label>
                                <select
                                    {...register("Region", { required: "Region selection is required" })}
                                    defaultValue=""
                                    className="select select-bordered w-full rounded-xl bg-base-200/100"
                                >
                                    <option value="" disabled>Pick a region</option>
                                    {regions.map((r, i) => (
                                        <option value={r} key={i}>{r}</option>
                                    ))}
                                </select>
                                {errors.Region && <span className="text-red-500 text-xs mt-1">{errors.Region.message}</span>}
                            </div>

                            <div className="form-control">
                                <label className="label text-xs font-semibold text-base-content/70">District</label>
                                <select
                                    {...register("District", { required: "District selection is required" })}
                                    defaultValue=""
                                    className="select select-bordered w-full rounded-xl bg-base-200/100"
                                >
                                    <option value="" disabled>Pick a district</option>
                                    {Region &&
                                        districtsByRegion(Region).map((d, i) => (
                                            <option value={d} key={i}>{d}</option>
                                        ))}
                                </select>
                                {errors.District && <span className="text-red-500 text-xs mt-1">{errors.District.message}</span>}
                            </div>
                        </div>

                        {/* Address */}
                        <div className="form-control">
                            <label className="label text-xs font-semibold text-base-content/70">Full Address</label>
                            <textarea
                                {...register("address", { required: "Address is required" })}
                                placeholder="Street address, apartment, house number..."
                                rows="2"
                                className="textarea textarea-bordered w-full rounded-xl bg-base-200/30 resize-none"
                            ></textarea>
                            {errors.address && <span className="text-red-500 text-xs mt-1">{errors.address.message}</span>}
                        </div>

                        {/* Additional Notes / Description */}
                        <div className="form-control">
                            <label className="label text-xs font-semibold text-base-content/70">Special Instructions / Notes</label>
                            <textarea
                                {...register("description")}
                                placeholder="Any specific requirements or instructions for our service team..."
                                rows="2"
                                className="textarea textarea-bordered w-full rounded-xl bg-base-200/30 resize-none"
                            ></textarea>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-4 flex items-center justify-end gap-3 border-t border-base-200 mt-6">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="btn btn-ghost rounded-full px-6 font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-primary rounded-full px-8 font-semibold shadow-sm text-white"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="loading loading-spinner loading-xs"></span>
                                        Confirming...
                                    </>
                                ) : (
                                    "Confirm Booking"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default ServiceDetails;