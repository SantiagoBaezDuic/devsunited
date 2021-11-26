import { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";


export default function Logintest() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
  
    });
}

    const handleUser = (e) => {
        setEmail(e.target.value);
    };

    const handlePass = (e) => {
        setPassword(e.target.value);
    }

    return (
        <>
            <form>
                <input value={email} onChange={handleUser} type="email" />
                <input value={password} onChange={handlePass} type="password" />
                <button onClick={handleRegister}>Ingresar</button>
            </form>
        </>
    )
}