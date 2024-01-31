import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from "../firebase.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInSuccess } from "../redux/user/userSlice.js";

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleGoogleClick = async () => {
        const auth = getAuth(app)
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            console.log(resultsFromGoogle.user.displayName);
            const res = await axios.post('/api/auth/google', {
                name: resultsFromGoogle.user.displayName,
                email: resultsFromGoogle.user.email,
                googlePhoto: resultsFromGoogle.user.photoURL
            }, { headers: { 'Content-Type': 'application/json' } });
              console.log(res.data)
            if (res.status === 200) {

                dispatch(signInSuccess(res.data))
                navigate('/')
            }

        } catch (error) {
            console.log("okay" + error)
        }
    }

    return (
        <Button type="button" gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
            <AiFillGoogleCircle className="w-6 h-6 mr-2" />
            Continue with Google
        </Button>
    );
}