import { useLoaderData, useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const UpdateService = () => {
    const service = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            serviceName: service?.serviceName || "",
            cost: service?.serviceCost || "",
            unit: service?.serviceUnit || "",
            description: service?.serviceDescription || ""
        }
    });

    const onSubmit = async (data) => {
        try {
            const updatedService = {
                serviceName: data.serviceName,
                serviceCost: parseFloat(data.cost),
                serviceUnit: data.unit,
                serviceDescription: data.description
            };

            const res = await axiosSecure.patch(`/services/${service._id}`, updatedService);

            if (res.data.modifiedCount > 0 || res.data.acknowledged) {
                toast.success("Service updated successfully!");
                navigate(-1); 
            } else {
                toast.info("No changes were made to the service.");
            }
        } catch (error) {
            console.error("Error updating service:", error);
            toast.error("Failed to update service. Please try again.");
        }
    };

    return (
        <div className="max-w-7xl mx-auto ">
            <div className="bg-base-100 border border-base-200 shadow-xl rounded-3xl overflow-hidden p-6 sm:p-10 transition-all duration-300">
               
                <div className="mb-8">
                
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-base-content mt-3">
                        Edit Service Details
                    </h2>
                    <p className="text-sm text-base-content/60 mt-1">
                        Update pricing, information, and unit specifications for this service.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Service Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-base-content">
                                Service Title <span className="text-error">*</span>
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Home Deep Cleaning"
                            {...register("serviceName", { required: "Service title is required" })}
                            className={`input input-bordered w-full rounded-xl focus:outline-none focus:border-primary transition-all duration-200 ${
                                errors.serviceName ? "input-error" : ""
                            }`}
                        />
                        {errors.serviceName && (
                            <span className="text-xs text-error mt-1">{errors.serviceName.message}</span>
                        )}
                    </div>

                    {/* Cost & Unit (Grid Layout) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Cost */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-base-content">
                                    Cost ($) <span className="text-error">*</span>
                                </span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 font-bold">
                                    $
                                </span>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    {...register("cost", { 
                                        required: "Cost is required",
                                        min: { value: 0, message: "Cost must be positive" } 
                                    })}
                                    className={`input input-bordered pl-9 w-full rounded-xl focus:outline-none focus:border-primary transition-all duration-200 ${
                                        errors.cost ? "input-error" : ""
                                    }`}
                                />
                            </div>
                            {errors.cost && (
                                <span className="text-xs text-error mt-1">{errors.cost.message}</span>
                            )}
                        </div>

                        {/* Unit */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-base-content">
                                    Unit / Metric <span className="text-error">*</span>
                                </span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Per Hour, Per Sqft"
                                {...register("unit", { required: "Unit is required" })}
                                className={`input input-bordered w-full rounded-xl focus:outline-none focus:border-primary transition-all duration-200 ${
                                    errors.unit ? "input-error" : ""
                                }`}
                            />
                            {errors.unit && (
                                <span className="text-xs text-error mt-1">{errors.unit.message}</span>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-base-content">
                                Service Description
                            </span>
                        </label>
                        <textarea
                            rows={4}
                            placeholder="Describe what's included in this service..."
                            {...register("description")}
                            className="textarea textarea-bordered w-full rounded-xl focus:outline-none focus:border-primary transition-all duration-200 leading-relaxed resize-none"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="btn btn-ghost rounded-xl font-medium text-base-content/70 hover:bg-base-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary rounded-xl px-8 font-semibold text-primary-content shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <span className="loading loading-spinner loading-xs"></span>
                                    Saving...
                                </span>
                            ) : (
                                "Update Service"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateService;