import { auth, googleprovider } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { useState } from 'react'
import CelebrationIcon from '@mui/icons-material/Celebration';

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(auth.currentUser);

    // console.log(auth?.currentUser?.photoURL)
    const signIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password)
            setLoggedIn(auth.currentUser);
        }catch(err){
            console.log(err)
        }
    };
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleprovider);
            setLoggedIn(auth.currentUser);
        }catch(err){
            console.log(err);
        }
    }
    const logOut = async () => {
        try{
            await signOut(auth);
            setLoggedIn(auth.currentUser);
        }catch(err){
            console.log(err);
        }
    }
    return (
        <>
        <div>
            <label htmlFor="email">Email </label>
            <input className="email" 
                placeholder="Email..."
                name='email'
                id="email"
                onChange={(e)=>setEmail(e.target.value)}
            />
            <br />
            <label htmlFor="password">Password </label>
            <input 
                className="password" 
                type="password"
                name='password'
                id='password'
                placeholder="password..."
                onChange={(e)=>setPassword(e.target.value)}    
            />
            <br />
            <button onClick={signIn}>Sign In</button>
            <br/>
            <div>
                <button
                    onClick={signInWithGoogle}
                >
                    Sign In With Google
                </button>
            </div>
            <br />
            {loggedIn!=null?
            <div>
            <CelebrationIcon />
            <div>
                <button
                    onClick={logOut}
                >   
                    Log Out
                </button>
            </div>
            </div>:<h2>Login and edit your choices !</h2>}
        </div>
        </>
    )
}
