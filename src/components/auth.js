import { auth, googleProvider } from "./firebase";
import { createUserWithEmailAndPassword, signInWithPopup,  } from "firebase/auth";
import { useState } from "react";


export const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(auth?.currentUser?.email)

    const signIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password)
        } catch(err){
            console.error(err)
        }    
    };

    const signInWithGoogle = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password)
        } catch(err){
            console.error(err)
        }    
    };

    const logout = async () => {
        try {
            await signInWithPopup(auth)
        } catch (err) {
            console.error(err)
        }
    }

    return( 
        <div>
            <input 
                placeholder="Email..."  
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                placeholder="Password..." 
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={signIn}>
                Sign In
            </button>
            <button onClick={signInWithGoogle}>
                Sign In With Google
            </button>
            <button onClick={logout}>
                Logout
            </button>

        </div>
    )
}