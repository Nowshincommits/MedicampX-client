import { auth } from "@/firebase/firebase.init";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const createUser = (email,password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    const signInUser = (email,password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }
    const signInWithGoogle = () => {
        setLoading(true);
       return signInWithPopup(auth,googleProvider);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    }, [])
    const authInfo = {
        user,
        loading,
        createUser,
        logOut,
        signInWithGoogle,
        signInUser
    }
        return (
            <AuthContext value={authInfo}>
                {children}
            </AuthContext>
        );
};

export default AuthProvider;