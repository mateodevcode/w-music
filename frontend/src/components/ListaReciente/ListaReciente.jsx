import React, { useState } from "react";
import { FaPlay, FaPause, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const ListaReciente = ({ setIsOpenReproductor, isOpenReproductor }) => {
  const [reproduciendo, setReproduciendo] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const itemsPerPage = 5;
  const lista_reciente = [
    {
      nombre: "Marianita",
      tipo: "Canción",
      imagen: "https://i.postimg.cc/NLvwrzLh/john-wick-1.jpg",
      videoId: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
      cantantes: ["Hector Zuleta", "Adanies Diaz"],
    },
    {
      nombre: "Marianita",
      tipo: "Canción",
      imagen: "https://i.postimg.cc/NLvwrzLh/john-wick-1.jpg",
      videoId: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
      cantantes: ["Hector Zuleta", "Adanies Diaz"],
    },
    {
      nombre: "Marianita",
      tipo: "Canción",
      imagen: "https://i.postimg.cc/NLvwrzLh/john-wick-1.jpg",
      videoId: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
      cantantes: ["Hector Zuleta", "Adanies Diaz"],
    },
    {
      nombre: "Marianita",
      tipo: "Canción",
      imagen: "https://i.postimg.cc/NLvwrzLh/john-wick-1.jpg",
      videoId: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
      cantantes: ["Hector Zuleta", "Adanies Diaz"],
    },
    {
      nombre: "Marianita",
      tipo: "Canción",
      imagen: "https://i.postimg.cc/NLvwrzLh/john-wick-1.jpg",
      videoId: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
      cantantes: ["Hector Zuleta", "Adanies Diaz"],
    },
    {
      nombre: "Marianita",
      tipo: "Canción",
      imagen: "https://i.postimg.cc/NLvwrzLh/john-wick-1.jpg",
      videoId: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
      cantantes: ["Hector Zuleta", "Adanies Diaz"],
    },
    {
      nombre: "Marianita",
      tipo: "Canción",
      imagen: "https://i.postimg.cc/NLvwrzLh/john-wick-1.jpg",
      videoId: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
      cantantes: ["Hector Zuleta", "Adanies Diaz"],
    },
  ];

  const handleNext = () => {
    if ((slideIndex + 1) * itemsPerPage < lista_reciente.length) {
      setSlideIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (slideIndex > 0) {
      setSlideIndex((prev) => prev - 1);
    }
  };

  const startIndex = slideIndex * itemsPerPage;
  const currentItems = lista_reciente.slice(
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
      <div className="w-full flex items-center justify-between mt-5">
        <div className="flex flex-row items-center justify-start w-full px-4 gap-4">
          <img
            src="https://i.postimg.cc/NLvwrzLh/john-wick-1.jpg"
            alt="User Avatar"
            className="w-12 h-12 rounded-full cursor-pointer active:scale-95 transition-transform duration-75 select-none"
          />
          <div className="flex flex-col items-start justify-center">
            <span className="text-zinc-300 text-lg font-semibold">
              Mateo Lizcano Noriega
            </span>
            <span className="text-white text-xl font-extrabold">
              Volver a escuchar
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center justify-end w-fullpx-4 gap-4">
          <span className="text-zinc-50 text-sm font-semibold rounded-full p-2 px-4 border-[1px] border-zinc-500 hover:bg-white/10 hover:text-white transition-colors duration-200 cursor-pointer">
            Más
          </span>
          <div className="flex flex-row items-center justify-between gap-4">
            <span className="">
              <MdKeyboardArrowLeft
                className="text-zinc-300 text-4xl font-semibold border-[1px] border-zinc-500 rounded-full p-1 opacity-50 hover:bg-white/10 hover:text-white transition-colors duration-200 cursor-pointer"
                onClick={handlePrev}
                disabled={slideIndex === 0}
              />
            </span>
            <span>
              <MdKeyboardArrowRight
                className="text-zinc-300 text-4xl font-semibold border-[1px] border-zinc-500 rounded-full p-1 hover:bg-white/10 hover:text-white transition-colors duration-200 cursor-pointer"
                onClick={handleNext}
                disabled={
                  (slideIndex + 1) * itemsPerPage >= lista_reciente.length
                }
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
              onClick={() => {
                setIsOpenReproductor(!isOpenReproductor);
              }}
              className="flex flex-col items-start justify-center text-white rounded-lg cursor-pointer relative w-auto flex-shrink-0"
            >
              <img
                src={item.imagen}
                alt={item.nombre}
                className="w-40 h-40 rounded-md cursor-pointer select-none"
              />
              <span className="font-semibold mt-2">{item.nombre} </span>
              <span className="w-40 text-sm text-gray-300">
                {item.tipo} - {item.cantantes[0]} y {item.cantantes[1]}
              </span>

              {reproduciendo ? (
                <FaPause
                  className="absolute top-16 left-[40%] text-white text-4xl"
                  onClick={() => setReproduciendo(false)}
                />
              ) : (
                <FaPlay
                  className="absolute top-16 left-[40%] text-white text-4xl"
                  onClick={() => setReproduciendo(true)}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListaReciente;
