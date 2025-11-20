import { useEffect, useState } from "react";

import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config.js"
import { AuthContext } from "./AuthContext.jsx";


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUserWithEmailAndPasswordFunction = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateProfileFunction = (displayName, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName,
            photoURL,
        });
    };

    const sendEmailVerificationFunction = () => {
        setLoading(true);
        return sendEmailVerification(auth.currentUser);
    };

    const signInWithEmailAndPasswordFunction = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const signOutUserFunction = () => {
        setLoading(true);
        return signOut(auth);
    };

    const sendPasswordResetEmailFunction = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    };

    const authInfo = {
        user,
        setUser,
        createUserWithEmailAndPasswordFunction,
        signInWithEmailAndPasswordFunction,
        updateProfileFunction,
        sendEmailVerificationFunction,
        signOutUserFunction,
        sendPasswordResetEmailFunction,
        googleSignIn,
        loading,
        setLoading,
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return <AuthContext value={authInfo}>{children}</AuthContext>
};

export default AuthProvider;