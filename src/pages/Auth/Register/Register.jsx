import { useForm } from "react-hook-form";
import loginImg from "../../../assets/i.jpg";
import Logo from "../../../components/Logo";
import { Link, useLocation} from "react-router";
import useAuth from "../../../Hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
    const { registerUser } = useAuth();
    const { updateUserProfile } = useAuth();
    const location= useLocation();


    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleRegister = (data) => {
        // console.log('get all info form data', data)
        const profileImage = data.photo[0];


        registerUser(data.email, data.password)
            .then(result => {
                console.log(result.user);

                toast.success('Register Completed,Now please Login');
                const formData = new FormData();
                formData.append('image', profileImage)
                const imgAPIurl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

                axios.post(imgAPIurl, formData)
                    .then(res => {
                        // console.log('after img upld',res.data.data.url)

                        const userProfile = {
                            displayName: data.name,
                            photoURL: res.data.data.url
                        }
                        updateUserProfile(userProfile)
                            .then(() => {
                                console.log('user profile updated')
                            })
                            .catch(err => {
                                console.log(err)
                            })


                    })
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className="h-screen overflow-hidden">
            <img
                src={loginImg}
                className="w-full h-full object-cover opacity-60 relative"
            />

            <div className="absolute bottom-10 left-130 bg-white/20 backdrop-blur-lg border border-white/30 p-10 rounded-3xl shadow-xl">
                <div className="flex justify-center">
                    <Logo></Logo>
                </div>
                <h2 className="text-center text-3xl p-5">Register</h2>
                <form onSubmit={handleSubmit(handleRegister)}>

                    <fieldset className="fieldset w-76">


                        {/* name */}
                        <label className="label">Name</label>
                        <input type="name" {...register('name', { required: true })}
                            className="input" placeholder="Enter Your name" />

                        {errors.name?.type === 'required' &&
                            <p className='text-red-500'>Name required</p>}


                        {/* image */}
                        <label className="label">Photo</label>

                        <input type="file" {...register('photo', { required: true })}
                            className="file-input" placeholder="upld Your pic" />

                        {errors.file?.type === 'required' &&
                            <p className='text-red-500'>pic required</p>}



                        <label className="label">Email</label>
                        <input {...register('email', { required: true })}
                            type="email" className="input w-full" placeholder="Email" />

                        {errors.email?.type === 'required' &&
                            <p className='text-red-500'>Email required</p>}

                        <label className="label">Password</label>
                        <input type="password" {...register('password', {
                            required: true, minLength: 6,
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/

                        })}
                            className="input w-full" placeholder="Password" />

                        {
                            errors.password?.type === 'required' &&
                            <p>pass required</p>
                        }
                        {
                            errors.password?.type === 'minLength' &&
                            <p>pass need 6 char or more</p>
                        }
                        {
                            errors.password?.type === 'pattern' &&
                            <p>must need 1 uppercase letter 1 lowercase letter
                                1 number 1 special</p>
                        }




                        <button className="btn btn-primary w-full my-4">Register</button>
                        <div className="divider">Or</div>


                        <SocialLogin></SocialLogin>

                        <h2 className="text-center mt-4">Already have an account? <Link state={location.state} to="/login" className='text-blue-500 font-semibold underline'>Login</Link></h2>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Register;