"use client";

import { useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useReproductor } from "../../context/ReproductorContext";

const ListaReciente = () => {
  const {
    setIsOpenReproductor,
    ListaRecomendada,
    setCancion,
    isPlaying,
    handlePlayPause,
    cancion,
    setListaRecomendada,
  } = useReproductor();

  const listaOrdenada = [...ListaRecomendada].sort(
    (a, b) => b.contador - a.contador
  );

  const itemsPerPage = 10; // 👈 Cambia este valor según lo que quieras
  const [slideIndex, setSlideIndex] = useState(0);

  const isBeginning = slideIndex === 0;
  const isEnd = (slideIndex + 1) * itemsPerPage >= listaOrdenada.length;

  const handleNext = () => {
    if (!isEnd) {
      setSlideIndex((prev) => prev + 2);
    }
  };

  const handlePrev = () => {
    if (!isBeginning) {
      setSlideIndex((prev) => prev - 2);
    }
  };
  const startIndex = slideIndex * itemsPerPage;
  const currentItems = listaOrdenada.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const variants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <>
      <div className="w-full flex items-center justify-between mt-5 z-10">
        <div className="flex flex-row items-center justify-start w-full px-4 gap-4">
          <img
            src="https://i.postimg.cc/NLvwrzLh/john-wick-1.jpg"
            alt="User Avatar"
            className="w-14 h-14 rounded-full cursor-pointer active:scale-95 transition-transform duration-75 select-none"
          />
          <div className="flex flex-col items-start justify-center">
            <span className="text-zinc-300 text-lg font-semibold">
              Mateo Lizcano Noriega
            </span>
            <span className="text-zinc-100 text-xl font-extrabold">
              Volver a escuchar
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center justify-end w-fullpx-4 gap-4">
          <span className="text-zinc-50 text-sm font-semibold rounded-full p-2 px-4 border-[1px] border-zinc-500 hover:bg-white/10 hover:text-white active:scale-95 transition-transform duration-75 cursor-pointer select-none">
            Más
          </span>
          <div className="flex-row items-center justify-between gap-4 hidden md:flex">
            <span className="active:scale-95 transition-transform duration-75 cursor-pointer select-none">
              <MdKeyboardArrowLeft
                className={`text-zinc-300 text-4xl font-semibold border-[1px] border-zinc-500 rounded-full p-1 transition-colors duration-200 cursor-pointer ${
                  isBeginning
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-white/10 hover:text-white"
                }`}
                onClick={handlePrev}
              />
            </span>
            <span className="active:scale-95 transition-transform duration-75 cursor-pointer select-none">
              <MdKeyboardArrowRight
                className={`text-zinc-300 text-4xl font-semibold border-[1px] border-zinc-500 rounded-full p-1 transition-colors duration-200 cursor-pointer ${
                  isEnd
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-white/10 hover:text-white"
                }`}
                onClick={handleNext}
              />
            </span>
          </div>
        </div>
      </div>

      <div className="w-full h-60 flex items-center mt-5 relative">
        <div className="flex items-center overflow-auto gap-4 w-full mt-5">
          {currentItems.map((item, index) => (
            <motion.div
              whileTap={{ y: 1 }}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCancion(item); // Cambia la canción actual
                setIsOpenReproductor(true); // Abre el reproductor
                setListaRecomendada((prev) =>
                  prev.map((s) =>
                    s?.videoId === item.videoId
                      ? { ...s, contador: s.contador + 1 }
                      : s
                  )
                );
              }}
              className="flex flex-col items-start justify-center text-white rounded-lg cursor-pointer relative w-auto flex-shrink-0 select-none"
            >
              <img
                src={
                  item.thumbnail ||
                  "https://i.postimg.cc/NLvwrzLh/john-wick-1.jpg"
                }
                alt={item.title}
                className="w-40 h-40 rounded-md cursor-pointer select-none"
              />
              <span className="font-semibold mt-2">{item.title} </span>
              <span className="w-40 text-sm text-gray-300 pb-4">
                Canción - {item.artist}
              </span>
              <div
                onClick={(e) => {
                  setCancion(item);
                  e.stopPropagation();
                  // setIsOpenReproductor(false);
                  handlePlayPause();
                }}
              >
                {cancion && cancion.videoId === item.videoId ? (
                  isPlaying ? (
                    <FaPause className="absolute top-16 left-[40%] text-zinc-100 text-4xl opacity-85" />
                  ) : (
                    <FaPlay className="absolute top-16 left-[40%] text-zinc-100 text-4xl opacity-85" />
                  )
                ) : (
                  <FaPlay className="absolute top-16 left-[40%] text-zinc-100 text-4xl opacity-85" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListaReciente;
