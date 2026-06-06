import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { useLoaderData } from "react-router";
import team from "../../../assets/team.jpg"
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const BeDecorator = () => {
    const {
        register,
        handleSubmit,
        control,
    } = useForm()



    const { user } = useAuth();

    const axiosSecure = useAxiosSecure()



    const serviceCenters = useLoaderData()

    const regionsDuplicate = serviceCenters.map(c => c.region)
    const regions = [...new Set(regionsDuplicate)]



    const handleDecorator = (data) => {

        axiosSecure.post('/decorators', data)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "your application has been submitted.you will notify withtn 48h",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }


    const riderRegion = useWatch({ control, name: 'region' })
    const districtsByRegion = (region) => {
        const regionDistricts = serviceCenters.filter(c => c.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }

    return (
        <div className=' bg-white p-10 mt-10'>
            <h1 className='text-4xl text-primary font-bold'>Be a Decorator</h1>

            <form onSubmit={handleSubmit(handleDecorator)}>

                {/* parent */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-14'>
                    {/* decorator */}
                    <div>
                        <fieldset className="fieldset">

                            {/* name */}
                            <label className="label">Name</label>
                            <input type="text" className="input w-full"{...register('decoratorName')} placeholder="Decorator name" defaultValue={user?.displayName} />

                            {/* email */}
                            <label className="label">Emial</label>
                            <input type="email" className="input w-full"{...register('decoratorEmail')} placeholder="Decorator email" defaultValue={user?.email} />

                            {/* phn */}
                            <label className="label">Phone No.</label>
                            <input type="number" className="input w-full"{...register('decoratorPhone')} placeholder="+88" />



                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Region</legend>
                                <select {...register('region')}
                                    defaultValue="Pick a region" className="select w-full">
                                    <option disabled={true}>Pick a region</option>
                                    {
                                        regions.map((r, index) => <option key={index} value={r}>{r}</option>
                                        )
                                    }

                                </select>

                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Districts</legend>
                                <select {...register('district')}
                                    defaultValue="Pick a district" className="select w-full">
                                    <option disabled={true}>Pick a District</option>
                                    {
                                        districtsByRegion(riderRegion).map((r, index) => <option key={index} value={r}>{r}</option>
                                        )
                                    }

                                </select>

                            </fieldset>



                            <input type="submit" className='btn btn-primary mt-10 w-full rounded-3xl text-white' value="Apply as a decorator" />



                        </fieldset>

                    </div>
                    <div>
                        <img src={team} alt="" />
                    </div>


                </div>
            </form>
        </div>
    );
};

export default BeDecorator;