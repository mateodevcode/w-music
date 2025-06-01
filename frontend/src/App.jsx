"use client";

import Buscar from "./components/buscar/Buscar";
import ListaReciente from "./components/ListaReciente/ListaReciente";
import Navbar from "./components/navbar/Navbar";
import Sugerencias from "./components/sugerencias/Sugerencias";
import { AnimatePresence } from "motion/react";
import IconReproductor from "./components/IconReproductor/IconReproductor";
import { useReproductor } from "./context/ReproductorContext";
import BackGround from "./components/background/BackGround";

const App = () => {
  const { isOpenBuscar, containerRef } = useReproductor();

  return (
    <div
      ref={containerRef}
      className="w-full h-screen flex flex-col items-center justify-start bg-[#07358a] relative overflow-hidden"
    >
      <BackGround />
      <div className="w-11/12 flex flex-col">
        <Navbar />
        <Sugerencias />
        <ListaReciente />
      </div>
      <AnimatePresence initial={false}>
        {isOpenBuscar ? <Buscar /> : null}
      </AnimatePresence>
      <IconReproductor />
    </div>
  );
};

export default App;
