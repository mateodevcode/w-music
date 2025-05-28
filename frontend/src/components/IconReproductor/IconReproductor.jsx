"use client";
import { AnimatePresence, motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import { useEffect, useState } from "react";
import { SiApplemusic } from "react-icons/si";
import Reproductor from "../reproductor/Reproductor";
import { useReproductor } from "../../context/ReproductorContext";

const IconReproductor = () => {
  const { setIsOpenReproductor, isOpenReproductor, containerRef, cancion } =
    useReproductor();

  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const saved = localStorage.getItem("icon_position");
    if (saved) {
      const { x, y } = JSON.parse(saved);
      setPosition({ x, y });
    }
  }, []);

  const handleDragEnd = (_, info) => {
    const bounds = containerRef.current?.getBoundingClientRect();
    const iconWidth = 64; // Estimado: 4rem (si usas p-4)
    const iconHeight = 64;

    // Asegurar que la posición no sea fuera del contenedor
    let x = info.point.x;
    let y = info.point.y;

    if (bounds) {
      x = Math.min(bounds.width - iconWidth, Math.max(0, x));
      y = Math.min(bounds.height - iconHeight, Math.max(0, y));
    }

    setPosition({ x, y });
    localStorage.setItem("icon_position", JSON.stringify({ x, y }));
  };

  return (
    <>
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{
          x: position.x,
          y: position.y,
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 50,
          cursor: "grab",
        }}
        onClick={() => setIsOpenReproductor(!isOpenReproductor)}
        className="active:cursor-grabbing bg-white p-[1px] border-2 border-blue-950 rounded-xl"
      >
        <div className="shadow-lg">
          <SiApplemusic className="text-green-800 text-5xl active:scale-95 transition-transform duration-200 ease-in-out" />
        </div>
      </motion.div>
      <AnimatePresence initial={false}>
        {isOpenReproductor ? <Reproductor cancion={cancion} /> : null}
      </AnimatePresence>
    </>
  );
};

export default IconReproductor;
