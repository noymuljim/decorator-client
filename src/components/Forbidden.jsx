import { Link } from "react-router";

const Forbidden = () => {
    return (
        <div>
            <div className="min-h-screen flex flex-col justify-center items-center gap-4">

                <h2 className="text-2xl font-semibold">Forbidden page ..</h2>
                <div className='flex'>
                    <Link to="/"><button className="btn">Go Home</button>
                </Link>
                    <Link to="/dashboard"><button className="btn">Go Dashboard</button>
                </Link>
                </div>
            </div>
        </div>
    );
};

export default Forbidden;