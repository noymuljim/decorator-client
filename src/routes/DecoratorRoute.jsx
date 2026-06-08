import Forbidden from "../components/Forbidden";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const DecoratorRoute = ({ children }) => {
    const { loading, user } = useAuth()
    const { role, roleLoading } = useRole()
    if (loading || !user || roleLoading) {
        return <div>
            <span className="loading loading-ring loading-lg"></span>
        </div>
    }
    if (role !== 'decorator') {
        return <Forbidden></Forbidden>
    }
    return children;
};

export default DecoratorRoute;