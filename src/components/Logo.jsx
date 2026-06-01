
import logo from '../assets/shome.png'
const Logo = () => {
    return (
        <div className='flex items-end'>
            <img className='h-[50px] w-[50px]'
            src={logo} alt="" />
            <h3 className="text-2xl -ms-2.5"><span className='text-primary'>Style</span>Decor</h3>
		 
        </div>
    );
};

export default Logo;