"use client";
import Buscar from "./components/buscar/Buscar";
import ListaReciente from "./components/ListaReciente/ListaReciente";
import Navbar from "./components/navbar/Navbar";
import Reproductor from "./components/reproductor/Reproductor";
import Sugerencias from "./components/sugerencias/Sugerencias";
import { NavUser } from "./components/usuario/NavUser";
import { useState } from "react";
import { AnimatePresence } from "motion/react";

const App = () => {
  const [isOpenReproductor, setIsOpenReproductor] = useState(false);
  const [isOpenBuscar, setIsOpenBuscar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [listaBusqueda, setListaBusqueda] = useState([]);
  const [cancion, setCancion] = useState({});

  const handleSearch = async (e, searchTerm) => {
    e.preventDefault();
    // const query = document.getElementById("searchInput").value;
    const res = await fetch(`/search?query=${encodeURIComponent(searchTerm)}`);
    const data = await res.json();
    setListaBusqueda(data); // Clear previous search result
  };

  console.log(cancion);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-start bg-gradient-to-bl from-zinc-950 via-zinc-900 to-blue-950">
      <div className="w-11/12 flex flex-col ">
        <Navbar setIsOpenBuscar={setIsOpenBuscar} isOpenBuscar={isOpenBuscar} />
        <Sugerencias
          setIsOpenBuscar={setIsOpenBuscar}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
          setListaBusqueda={setListaBusqueda}
        />
        {/* <NavUser /> */}
        <ListaReciente
          setIsOpenReproductor={setIsOpenReproductor}
          isOpenBuscar={isOpenBuscar}
        />
      </div>

      {/* Modales */}
      <AnimatePresence initial={false}>
        {isOpenReproductor ? (
          <Reproductor
            setIsOpenReproductor={setIsOpenReproductor}
            cancion={cancion}
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {isOpenBuscar ? (
          <Buscar
            setIsOpenReproductor={setIsOpenReproductor}
            setIsOpenBuscar={setIsOpenBuscar}
            isOpenBuscar={isOpenBuscar}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
            listaBusqueda={listaBusqueda}
            setListaBusqueda={setListaBusqueda}
            setCancion={setCancion}
            cancion={cancion}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default App;
