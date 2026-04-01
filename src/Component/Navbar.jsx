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
import { auth } from "../firebase";

import { motion, scale } from "framer-motion";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);
  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="nav flex items-center justify-between h-[90px] border-b border-gray-800"
      >
        <div className="logo ">
          <h3
           initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          
          className="text-[25px] font-bold font-2xl sp-text">GenUi</h3>
        </div>
        <div className="icons flex items-center justify-between gap-6">
          {!user ? (
            <motion.div whileTap={{scale : 1.1}} whileHover={{scale : 1.2}} animate={{scale: 1}} onClick={handleLogin} className="icon cursor-pointer">
              <FaUserAlt />
            </motion.div>
          ) : (
            <motion.div whileTap={{scale : 1.1}} whileHover={{rotate : 20 , scale : 1.2}} onClick={handleLogout} className="icon cursor-pointer">
              <SlLogout />
            </motion.div>
          )}
          <div></div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
