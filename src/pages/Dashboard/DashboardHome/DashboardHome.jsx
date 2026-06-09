import useRole from "../../../Hooks/useRole";
import AdminDashboardHome from "./AdminDashboardHome";
import DecoratorDashboardHome from "./DecoratorDashboardHome";
import UserDashboardHome from "./UserDashboardHome";

const DashboardHome = () => {
        const {roleLoading,role}=useRole()
         
    if(roleLoading){
        return <span className="loading loading-spinner loading-sm"></span>

    }
     if(role=== 'admin'){
        return <AdminDashboardHome></AdminDashboardHome>
    }
    else if( role=== 'rider'){
        return<DecoratorDashboardHome></DecoratorDashboardHome>
    }
    else{
        return <UserDashboardHome></UserDashboardHome>
    }

   
};

export default DashboardHome;