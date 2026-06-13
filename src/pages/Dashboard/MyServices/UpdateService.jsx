import { useLoaderData } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const UpdateService = () => {

    const service = useLoaderData();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit } = useForm({

        defaultValues: {
            serviceName: service.serviceName,
            cost: service.serviceCost,
            unit: service.serviceUnit,
            description: service.serviceDescription
        }
    });

    const onSubmit = async (data) => {

        const updatedService = {
            serviceName: data.serviceName,
            serviceCost: data.cost,
            serviceUnit: data.unit,
            serviceDescription: data.description
        };

        const res = await axiosSecure.patch(`/services/${service._id}`,updatedService
        );

        if (res.data.modifiedCount > 0) {
            toast.success("Service updated");
        }
    };

    return (
        <form
            className="max-w-2xl mx-auto"
            onSubmit={handleSubmit(onSubmit)}
        >

            <input
                {...register("serviceName")}
                className="input w-full my-2"
            />

            <input
                {...register("cost")}
                className="input w-full my-2"
            />

            <input
                {...register("unit")}
                className="input w-full my-2"
            />

            <textarea
                {...register("description")}
                className="textarea w-full my-2"
            />

            <button className="btn btn-primary">
                Update Service
            </button>

        </form>
    );
};

export default UpdateService;