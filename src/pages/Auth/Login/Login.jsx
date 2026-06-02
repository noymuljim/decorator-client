import { useForm } from "react-hook-form";
import loginImg from "../../../assets/i.jpg";
import Logo from "../../../components/Logo";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
    const { signInUser } = useAuth();
       const location=useLocation();
    // console.log('in loginpage',location);
    

const navigate=useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();

   const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                navigate(location?.state || '/')
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

            <div className="absolute bottom-40 left-130 bg-white/20 backdrop-blur-lg border border-white/30 p-10 rounded-3xl shadow-xl">
                <div className="flex justify-center">
                    <Logo></Logo>
                </div>
                <h2 className="text-center text-3xl pt-10">Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>

                    <fieldset className="fieldset w-76">


                        <label className="label">Email</label>
                        <input {...register('email', { required: true })}
                            className="input w-full" placeholder="Email" />

                        {errors.email?.type === 'required' &&
                            <p className='text-red-500'>Email required</p>}

                        <label className="label">Password</label>
                        <input {...register('password', {
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




                        <button className="btn btn-primary w-full my-4">Login</button>
                          <div className="divider">Or</div>


                           <SocialLogin></SocialLogin>

                        <h2 className="text-center mt-4">New here? <Link state={location.state} to="/register" className='text-blue-500 font-semibold underline'>Register</Link></h2>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Login;