import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";


const ServiceDetails = () => {
    
    const serviceCenters = useLoaderData();




    const navigate = useNavigate();
    const { user } = useAuth();
    const { register, handleSubmit,reset, control, formState: { errors }, } = useForm();



    const regionsDuplicate = serviceCenters.map(c => c.region)
    const regions = [...new Set(regionsDuplicate)];
    const Region = useWatch({ control, name: 'Region' })


    const districtsByRegion = (region) => {
        const regionDistricts = serviceCenters.filter(c => c.region === region);
        const districts = regionDistricts.map(d => d.district)
        return districts;

    }
    const serviceModalRef = useRef()

    const { id } = useParams();

    const axiosSecure = useAxiosSecure()
    const { data: service = {} } = useQuery({
        queryKey: ['service', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/serviceDetails/${id}`);
            return res.data;
        }
    });



    useEffect(() => {
    if (service?._id) {
        reset({
            serviceName: service.serviceName,
            serviceCost: service.serviceCost,
            userName: user?.displayName,
            userEmail: user?.email
        });
    }
}, [service, user, reset]);



    const openServiceDetailModal = () => {
        if (!user) {
            navigate('/login');
            return;
        }

        serviceModalRef.current.showModal();
    };


    const handleConfirm = (data) => {

        axiosSecure.post('/bookings', data)
        console.log(data)
        toast.success('req confirmed')

    }

    return (
        <div>
            <div className="gap-10 flex flex-col md:flex-row justify-center pt-10">
                <div className="w-[400px]">
                    <img className="w-full h-64 object-cover"
                        src={service.servicethumbnail} alt="" />
                </div>
                <div className="flex flex-col items-center md:items-start">
                    <h1 className="text-3xl font-bold">{service.serviceName}</h1>
                    <h1 className="text-gray-400">{service.serviceCategory}</h1>
                    <h1 className="">Sqft: {service.serviceUnit}</h1>
                    <h1 className="text-2xl font-bold">Cost: {service.serviceCost} tk<span className="text-sm font-normal text-gray-500"> /per sqft</span></h1>

                    <button onClick={() => openServiceDetailModal(service)}
                        className="btn btn-primary mt-4 md:mt-25">Book Now</button>
                </div>
            </div>
            <h1 className="font-bold mt-5 text-xl">Description:</h1>
            <p className="mt-5">{service.serviceDescription}</p>
            {/* modal */}



            <dialog ref={serviceModalRef}
                className="modal modal-bottom sm:modal-middle">
                <div className="modal-box space-y-2">
                    <h1 className="text-2xl font-bold py-5 text-center">Confirm your booking now</h1>

                    <form onSubmit={handleSubmit(handleConfirm)}>
                        {/* name */}
                        <label className="label">User name</label>
                        <input {...register('userName', { required: true })}
                            type="text" className="input w-full" defaultValue={user?.displayName} placeholder="User name" />

                        {errors.userName?.type === 'required' &&
                            <p className='text-red-500'>serviceName required</p>}
                        {/* email */}
                        <label className="label">Email</label>
                        <input {...register('userEmail', { required: true })}
                            type="email" className="input w-full" defaultValue={user?.email} readOnly placeholder="User name" />

                        {errors.userEmail?.type === 'required' &&
                            <p className='text-red-500'>serviceName required</p>}
                        {/* service name */}
                        <label className="label">Service name</label>
                        <input {...register('serviceName', { required: true })}
                            type="text" className="input w-full" defaultValue={service?.serviceName} readOnly placeholder="Service name" />

                        {errors.serviceName?.type === 'required' &&
                            <p className='text-red-500'>serviceName required</p>}

                        {/* service cost */}
                        <label className="label">Service cost</label>
                        <input
                            {...register('serviceCost')}
                            type="text"
                            className="input w-full"
                            defaultValue={service?.serviceCost}
                            readOnly
                        />




                        {/* date */}
                        <label className="label">Date</label> <br />
                        <input {...register('date', { required: true })}
                            type="date" className="input w-full" />
                        {errors.date?.type === 'required' &&
                            <p className='text-red-500'>Date is required</p>}

                        {/* region */}
                        <fieldset className="fieldset ">
                            <legend className="fieldset-legend">Regions</legend>
                            <select {...register('Region')} defaultValue="Pick a Region" className="select w-full">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((r, i) => <option value={r} key={i}>{r}</option>)
                                }
                            </select>
                        </fieldset>
                        {/* district */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend ">District</legend>
                            <select {...register('District')} defaultValue="Pick a District" className="select w-full">
                                <option disabled={true}>Pick a district</option>

                                {
                                    Region &&
                                    districtsByRegion(Region).map((r, i) => (
                                        <option value={r} key={i}>{r}</option>
                                    ))
                                }
                            </select>
                        </fieldset>
                        {/*address */}
                        <label className="label">Address</label>

                        <textarea {...register('address')}
                            placeholder="Enter Address..."
                            className="textarea textarea-bordered w-full overflow-y-auto resize-none"
                        ></textarea>
                        {/*description */}
                        <label className="label">Description </label>

                        <textarea {...register('description')}
                            placeholder="Enter description..."
                            className="textarea textarea-bordered w-full  overflow-y-auto resize-none"
                        ></textarea>

                        <button
                            className="btn btn-primary my-3">Confirm</button>
                    </form>


                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ServiceDetails;