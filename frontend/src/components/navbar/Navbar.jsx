"use client";
import { SlMenu } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { GoShareAndroid } from "react-icons/go";
import { motion } from "framer-motion";
import { useReproductor } from "../../context/ReproductorContext";
import Logo from "./logo/Logo";

const Navbar = () => {
  const { setIsOpenBuscar, isOpenBuscar } = useReproductor();

  return (
    <div className="w-full h-16 text-white flex items-center justify-between z-10">
      <div className="flex items-center gap-4">
        <SlMenu className="text-xl cursor-pointer text-[#67c312] hover:text-[#67c312]/50 active:scale-95 transition-transform duration-75 select-none" />
        <Logo />
      </div>
      <div className="flex items-center gap-4">
        <motion.div
          onClick={() => setIsOpenBuscar(!isOpenBuscar)}
          whileTap={{ y: 1 }}
        >
          <BsSearch
            className="text-xl text-[#67c312] hover:text-[#67c312]/50 active:scale-95 transition-transform duration-75 cursor-pointer select-none"
            onClick={() => setIsOpenBuscar(true)}
          />
        </motion.div>
        <GoShareAndroid className="text-xl text-[#67c312] hover:text-[#67c312]/50 active:scale-95 transition-transform duration-75 cursor-pointer select-none" />
        <img
          src="https://i.postimg.cc/NLvwrzLh/john-wick-1.jpg"
          alt="User Avatar"
          className="w-8 h-8 rounded-full cursor-pointer active:scale-95 transition-transform duration-75 select-none"
        />
      </div>
    </div>
  );
};

export default Navbar;
