import { auth } from "./firebase";
import { signInWithPhoneNumber  } from "firebase/auth";
import { useState } from "react";


export const AuthPhone = () => {

    const [phone, setPhone] = useState("");
    

    const signIn = async () => {
        await signInWithPhoneNumber(auth, phone)
    };

    return( 
        <div>
            <input 
                placeholder="PhoneNumber..."  
                onChange={(e) => setPhone(e.target.value)}
            />
        

            <button onClick={signIn}>
                Sign In
            </button>

        </div>
    )
}