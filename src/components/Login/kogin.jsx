import { auth, googleprovider } from '../../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { useState } from 'react'
import CelebrationIcon from '@mui/icons-material/Celebration';
import ScaleLoader from "react-spinners/ScaleLoader";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(auth.currentUser);
    const [isScaleLoader, setIsScaleLoader] = useState(false);

    // console.log(auth?.currentUser?.photoURL)
    const signIn = async () => {
        try{
            setIsScaleLoader(true);
            await createUserWithEmailAndPassword(auth, email, password)
            setLoggedIn(auth.currentUser);
            setIsScaleLoader(false);
        }catch(err){
            console.log(err)
        }
    };
    const signInWithGoogle = async () => {
        try {
            setIsScaleLoader(true);
            await signInWithPopup(auth, googleprovider);
            setIsScaleLoader(false);
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
            {isScaleLoader && <ScaleLoader color="#36d7b7" />}
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
            <div>New User : 
            {/* <Link to="/register"></Link> */}
            </div> 
        </div>
        </>
    )
}

export default Login
