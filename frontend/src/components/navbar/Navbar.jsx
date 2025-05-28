"use client";
import { SlMenu } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { GoShareAndroid } from "react-icons/go";
import { motion } from "framer-motion";
import { useReproductor } from "../../context/ReproductorContext";

const Navbar = () => {
  const { setIsOpenBuscar, isOpenBuscar } = useReproductor();

  return (
    <div className="w-full h-16 text-white flex items-center justify-between">
      <div className="flex items-center gap-8">
        <SlMenu className="text-xl cursor-pointer text-zinc-100 active:scale-95 transition-transform duration-75 select-none" />
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center">
            <span className="text-xl font-bold select-none">W</span>
          </div>
          <h2 className="font-semibold text-xl">Music</h2>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <motion.div
          onClick={() => setIsOpenBuscar(!isOpenBuscar)}
          whileTap={{ y: 1 }}
        >
          <BsSearch
            className="text-xl text-zinc-100 active:scale-95 transition-transform duration-75 cursor-pointer select-none"
            onClick={() => setIsOpenBuscar(true)}
          />
        </motion.div>
        <GoShareAndroid className="text-xl text-zinc-100 active:scale-95 transition-transform duration-75 cursor-pointer select-none" />
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
