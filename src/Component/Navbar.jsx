import React from 'react'
import { BsSunFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { RiSettings3Fill } from 'react-icons/ri';

const Navbar = () => {
  return (
    <>
     <div className="nav flex items-center justify-between h-[90px] border-b border-gray-800">
        <div className="logo ">
            <h3  className='text-[25px] font-[700] sp-text'>GenUi</h3>
        </div>
        <div className="icons flex items-center justify-between gap-6">
            {/* <div className="icon"><BsSunFill/></div> */}
            <div className='icon'><FaUserAlt/></div>
            {/* <div className='icon'><RiSettings3Fill/></div> */}
            <div></div>
        </div>
     </div>
    </>
  )
}

export default Navbar;
