import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";

const Addpackage = () => {
    const { user } = useAuth()
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const handlePackage = (data) => {
        console.log(data)


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
                            <input type="radio"{...register('category')} value="Weidding" className="radio" />
                            Others Party</label>


                    </div>

                    {/* name */}
                    <label className="label">Service name</label>
                    <input {...register('serviceName', { required: true })}
                     type="name"   className="input w-full" placeholder="Service name" />

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