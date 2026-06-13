import useAuth from "../../../Hooks/useAuth";

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body items-center text-center">
                    <img
                        src={user?.photoURL}
                      
                        className="w-32 h-32 rounded-full object-cover border-4 border-primary"
                    />

                    <h2 className="text-2xl font-bold mt-4">
                        {user?.displayName}
                    </h2>

                    <p className="text-gray-500">
                        {user?.email}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Profile;