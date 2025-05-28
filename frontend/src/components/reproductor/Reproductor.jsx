import React, { useState } from "react";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import { IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { TiArrowShuffle } from "react-icons/ti";
import { motion } from "framer-motion";
import ImagenDynamic from "./ImagenDynamic";
import { useReproductor } from "../../context/ReproductorContext";
import { formatTime } from "../../utils/formatTime";

const Reproductor = ({ cancion }) => {
  const {
    setIsOpenReproductor,
    isPlaying,
    handlePlayPause,
    audioRef,
    duration,
    progress,
  } = useReproductor();

  const [background, setBackground] = useState("");

  return (
    <motion.div
      className="w-full h-screen inset-0 fixed top-0 left-0 z-50 flex flex-col items-start bg-black text-white px-8"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <div className="w-full h-16 flex items-center justify-between">
        <MdKeyboardArrowDown
          className="text-zinc-100 text-3xl hover:text-zinc-400 cursor-pointer active:scale-95 transition-transform duration-75"
          onClick={() => setIsOpenReproductor(false)}
        />
        <SlOptionsVertical className="text-zinc-100 text-lg hover:text-zinc-400 cursor-pointer active:scale-95 transition-transform duration-75" />
      </div>
      <div className="pt-8 pb-4 w-full">
        <ImagenDynamic
          background={background}
          setBackground={setBackground}
          src={
            cancion?.thumbnail ||
            "https://i.postimg.cc/NLvwrzLh/john-wick-1.jpg"
          }
        />
      </div>
      <div>
        <h2 className="text-2xl font-semibold">
          {cancion?.title || "Título de la canción"}
        </h2>
        <span className="text-lg">{cancion?.artist || "Artista"}</span>
      </div>
      {/* PROGRESS BAR */}
      <div className="w-full mt-5 relative">
        <div className="progress-container">
          <div
            className="progress-filled"
            style={{
              width: `${(progress / duration) * 100}%`,
              backgroundColor: background || "#3b82f6",
            }}
          />
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={progress}
            onChange={(e) => {
              const time = parseFloat(e.target.value);
              audioRef.current.currentTime = time;
            }}
            className="custom-range-input"
          />
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-zinc-400">{formatTime(progress)}</span>
          <span className="text-xs text-zinc-400">{formatTime(duration)}</span>
        </div>
      </div>
      {/* BOTONES DE CONTROL */}
      <div className="w-full h-16 flex items-center justify-between mt-6">
        <TiArrowShuffle className="text-3xl" />
        <IoPlaySkipBackSharp className="text-3xl" />
        <div
          className="w-20 h-20 flex items-center justify-center bg-white rounded-full cursor-pointer active:scale-95 transition-transform duration-75"
          onClick={handlePlayPause}
        >
          {isPlaying ? (
            <IoMdPause className="text-black text-4xl" />
          ) : (
            <IoMdPlay className="text-black text-4xl ml-1" />
          )}
        </div>
        <IoPlaySkipForwardSharp className="text-3xl" />
        <HiArrowPathRoundedSquare className="text-3xl" />
      </div>
      <div className="w-full h-16 flex items-center justify-between mt-6  text-zinc-200 font-semibold">
        <span>A continuación</span>
        <span>Letra</span>
        <span>Similares</span>
      </div>
    </motion.div>
  );
};

export default Reproductor;
