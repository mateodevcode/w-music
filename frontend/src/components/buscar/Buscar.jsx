"use client";
import React, { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { RxCountdownTimer } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { motion } from "motion/react";
import { BsSearch } from "react-icons/bs";

const Buscar = ({
  setIsOpenReproductor,
  setIsOpenBuscar,
  isOpenBuscar,
  searchTerm,
  setSearchTerm,
  handleSearch,
  listaBusqueda,
  setCancion,
  cancion,
}) => {
  const [Historial, setHistorial] = useState(() => {
    const historial = JSON.parse(localStorage.getItem("historial")) || [];
    return historial;
  });

  useEffect(() => {
    localStorage.setItem("historial", JSON.stringify(Historial));
  }, [Historial]);

  const handleHistorialclick = (item) => {
    setHistorial((prev) => [...prev, item]); // Add clicked item to historial
  };

  const handleDeleteHistorial = (e, index) => {
    e.stopPropagation(); // Prevent click from closing the modal
    setHistorial((prev) => prev.filter((_, i) => i !== index)); // Remove item from historial
  };

  return (
    <div
      className="w-full h-screen inset-0 fixed top-0 left-0 z-50 flex flex-col items-center bg-black/50 text-white"
      onClick={() => setIsOpenBuscar(!isOpenBuscar)} // Close modal on background click
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0, scale: 0 }}
        className="w-10/12 h-96 bg-zinc-900 absolute top-5 rounded-md border-[1px] border-zinc-700 flex flex-col items-start justify-start"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing the modal
      >
        <div className="w-full h-10 flex items-center justify-start px-4 gap-4 border-b-[1px] border-zinc-700">
          <GoArrowLeft className="text-2xl" />
          <input
            id="searchInput"
            name="searchInput"
            type="text"
            placeholder="Buscar canciones, álbumes, artistas, géneros..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Evita comportamiento por defecto si es necesario
                handleSearch(e, searchTerm);
                handleHistorialclick(searchTerm); // Añadir término a historial
              }
            }}
            autoFocus
            className="w-full h-8 outline-none bg-zinc-900 text-white "
          />
          <button
            className="w-8 h-8 flex items-center justify-center"
            onClick={(e) => {
              handleSearch(e, searchTerm); // Use the value from the input field
              handleHistorialclick(searchTerm); // Add search term to historial on search
            }}
          >
            <BsSearch className="text-xl" />
          </button>
        </div>
        <div className="w-full h-80 overflow-y-auto">
          {searchTerm ? (
            <>
              {listaBusqueda.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setIsOpenReproductor(true);
                    setIsOpenBuscar(false);
                    setCancion(item);
                    handleHistorialclick(item?.title);
                  }}
                  className="w-full h-12 flex items-center justify-between px-4 py-6 gap-4 text-zinc-400 hover:bg-zinc-800 transition-colors duration-200"
                >
                  <div className="flex items-center gap-4 cursor-pointer">
                    <img
                      src={item?.thumbnail}
                      alt={item?.title}
                      className="w-8 h-8 rounded-md"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white">
                        {item?.title}
                      </span>
                      <span className="text-xs">{item?.artist}</span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {Historial.length > 0 ? (
                <>
                  {Historial.reverse().map((item, index) => (
                    <div
                      key={index}
                      className="w-full h-12 flex items-center justify-between px-4 py-6 gap-4 text-zinc-400 hover:bg-zinc-800 transition-colors duration-200 cursor-pointer"
                      onClick={(e) => {
                        setSearchTerm(item);
                        handleSearch(e, item);
                        handleHistorialclick(item);
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <RxCountdownTimer className="text-xl" />
                        <span className="text-sm">{item}</span>
                      </div>
                      <RiDeleteBin6Line
                        className="text-xl cursor-pointer hover:text-zinc-100 transition-colors duration-200"
                        onClick={(e) => handleDeleteHistorial(e, index)}
                      />
                    </div>
                  ))}
                </>
              ) : null}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Buscar;
