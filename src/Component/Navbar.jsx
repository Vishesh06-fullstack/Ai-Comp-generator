import React from "react";
import { useState, useEffect } from "react";
import { BsSunFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { RiSettings3Fill } from "react-icons/ri";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { SlLogout } from "react-icons/sl";
import { handleLogin } from "../auth";
import { handleLogout } from "../auth";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../firebase";
import {toast} from "react-toastify";


const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);
  return (
    <>
      <div className="nav flex items-center justify-between h-[90px] border-b border-gray-800">
        <div className="logo ">
          <h3 className="text-[25px] font-bold font-2xl sp-text">GenUi</h3>
        </div>
        <div className="icons flex items-center justify-between gap-6">
          {/* <div className="icon"><BsSunFill/></div> */}
          {!user ? (
            <div onClick={handleLogin} className="icon cursor-pointer">
              <FaUserAlt />
            </div>
          ) : (
            <div
              onClick={
               handleLogout
              }
              className="icon cursor-pointer"
            >
              <SlLogout />
            </div>
          )}
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
