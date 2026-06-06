import Forbidden from "../components/Forbidden";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";


const AdminRoute = ({children}) => {


    const{loading}=useAuth()
    const{role,roleLoading}=useRole()
    
    
    if(loading ||roleLoading){
        return <div>
            <span className="loading loading-ring loading-lg"></span>
			        </div>
    }
    
    
if(role!== 'admin'){
    return <Forbidden></Forbidden>
}
    return children;
};

export default AdminRoute;