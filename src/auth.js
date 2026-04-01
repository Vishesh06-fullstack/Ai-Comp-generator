import { auth } from "./firebase.js";
import { GoogleAuthProvider, signInWithPopup , signOut } from "firebase/auth";
import { toast } from "react-toastify";

const provider = new GoogleAuthProvider();

export const handleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
    toast.success("Login Successful!");
  } catch (error) {
    console.log(error);
    toast.error("Login Failed");
  }
};


export const handleLogout = async () => {
  try {
    await signOut(auth);
    toast.success("Logout Successful!");
    return true;
  } catch (error) {
    console.log(error);
    toast.error("Logout Failed");
    return false;
  }
}