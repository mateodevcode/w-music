import React, { useEffect, useRef, useState } from "react";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import { IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { TiArrowShuffle } from "react-icons/ti";
import { motion } from "motion/react";
import ImagenDynamic from "./ImagenDynamic";

const Reproductor = ({ setIsOpenReproductor, cancion }) => {
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [background, setBackground] = useState("");

  const [audioSrc, setAudioSrc] = useState("");

  useEffect(() => {
    const fetchAudioUrl = async () => {
      if (!cancion?.videoId) return;
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/stream/${cancion.videoId}`
        );
        const data = await res.json();
        if (data.audio_url) {
          setAudioSrc(data.audio_url);
        }
      } catch (error) {
        console.error("Error fetching audio stream:", error);
      }
    };
    fetchAudioUrl();
  }, [cancion?.videoId]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.floor(time % 60) || 0;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const updateTimeFromPosition = (pageX) => {
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = pageX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const newTime = percentage * duration;
    setCurrentTime(newTime);
    if (audioRef.current) audioRef.current.currentTime = newTime;
  };

  // Eventos del drag
  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateTimeFromPosition(e.pageX);
  };

  const handleMouseMove = (e) => {
    if (isDragging) updateTimeFromPosition(e.pageX);
  };

  const handleMouseUp = () => {
    if (isDragging) setIsDragging(false);
  };

  // Touch
  const handleTouchStart = (e) => {
    setIsDragging(true);
    updateTimeFromPosition(e.touches[0].pageX);
  };

  const handleTouchMove = (e) => {
    if (isDragging) updateTimeFromPosition(e.touches[0].pageX);
  };

  const handleTouchEnd = () => {
    if (isDragging) setIsDragging(false);
  };

  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isDragging]);

  useEffect(() => {
    const handleLoadedMetadata = () => {
      setDuration(audioRef.current.duration);
    };
    audioRef.current?.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      audioRef.current?.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );
    };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, duration]);

  return (
    <motion.div
      className="w-full h-screen inset-0 fixed top-0 left-0 z-50 flex flex-col items-start bg-black text-white px-8"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <audio
        ref={audioRef}
        src={audioSrc}
        onEnded={() => setIsPlaying(false)}
        autoPlay
      />
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
        <div
          ref={progressBarRef}
          className="relative w-full h-1 bg-gray-700 rounded-full cursor-pointer"
          onClick={(e) => updateTimeFromPosition(e.pageX)}
        >
          <div
            className={`absolute h-1 ${background} rounded-full`}
            style={{
              width: `${(currentTime / duration) * 100 || 0}%`,
              backgroundColor: background,
            }}
          />
          <div
            className="absolute w-3 h-3 bg-blue-600 rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2"
            style={{ left: `${(currentTime / duration) * 100 || 0}%` }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          />
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-zinc-400">
            {formatTime(currentTime)}
          </span>
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
