import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import axios from "axios";
import { toast } from "react-toastify";

const Addpackage = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const handlePackage =async (data) => {
        // console.log(data)
        try {
            const imageFile = data.photo[0];
            const formData = new FormData();
            formData.append('image', imageFile);

         const imgAPIurl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

        const imgRes = await axios.post(imgAPIurl, formData);
        const thumbnailUrl = imgRes.data.data.display_url;

         const serviceData = {
                serviceCategory: data.category,
                serviceName: data.serviceName,
                serviceCost: data.cost,
                serviceUnit: data.unit,
                serviceDescription: data.description,
                servicethumbnail: thumbnailUrl,          
            };

            const res=await  axiosSecure.post('/services', serviceData)
           console.log('Service saved', res.data);
            toast.success('Service saved');
        }
        catch (err) {
            console.error(err);
        }

    }
    return (
        <div>
            <h2 className="text-2xl ml-10 mt-5">Add service with package</h2>

            <form className="p-10"
                onSubmit={handleSubmit(handlePackage)}>

                <fieldset className="fieldset w-full ">
                    <label className="label">Service Category</label>

                    <div className="flex gap-4">
                        <label className="label">
                            <input type="radio"{...register('category')} value="Birthday" className="radio" defaultChecked />
                            Birthday</label>

                        <label className="label">
                            <input type="radio"{...register('category')} value="Weidding" className="radio" />
                            Weidding</label>
                        <label className="label">
                            <input type="radio"{...register('category')} value="Others" className="radio" />
                            Others Party</label>


                    </div>

                    {/* name */}
                    <label className="label">Service name</label>
                    <input {...register('serviceName', { required: true })}
                        type="name" className="input w-full" placeholder="Service name" />

                    {errors.name?.type === 'required' &&
                        <p className='text-red-500'>serviceName required</p>}

                    {/* photo */}

                    <label className="label">Photo</label>
                    <input type="file" {...register('photo', { required: true })}
                        className="file-input w-full" placeholder="Upload Photo" />
                    {
                        errors.file?.type === 'required' && <p>Photo is required</p>
                    }
                    {/* cost */}
                    <label className="label">Service cost </label>
                    <input {...register('cost', { required: true })}
                        type="number" className="input w-full" placeholder="Service cost" />

                    {errors.number?.type === 'required' &&
                        <p className='text-red-500'>cost required</p>}
                    {/* unit  */}
                    <label className="label"> Unit </label>
                    <input {...register('unit', { required: true })}
                        type="number" className="input w-full" placeholder="per sqrt-ft, per floor, per meter" />

                    {errors.number?.type === 'required' &&
                        <p className='text-red-500'>Unit required</p>}

                    {/*description */}
                    <label className="label">Description </label>

                    <textarea {...register('description')}
                        placeholder="Enter description..."
                        className="textarea textarea-bordered w-full h-32 overflow-y-auto resize-none"
                    ></textarea>
                    {/* email */}

                    <label className="label">Created by</label>
                    <input {...register('email', { required: true })}
                        className="input w-full" defaultValue={user?.email} />

                    {errors.text?.type === 'required' &&
                        <p className='text-red-500'>serviceName required</p>}


                    <button className="btn btn-primary w-full my-4">Submit</button>



                </fieldset>
            </form>
        </div>
    );
};

export default Addpackage;