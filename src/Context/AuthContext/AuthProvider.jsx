import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../../firebase/firebase.init";
import { useEffect, useState } from "react";
const Googleprovider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const registerUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

      const updateUserProfile=(profile)=>{
        return updateProfile(auth.currentUser,profile)
    }
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    

    const signInGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, Googleprovider)
    }


    const LogOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    useEffect(() => {
        const unSuscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            //console.log(currentUser)
            setLoading(false);
        })
        return () => {
            unSuscribe();
        }
    }, [])

    const authInfo = {
        registerUser, signInUser, user,loading, signInGoogle, LogOut,updateUserProfile

    }


    return (

        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;