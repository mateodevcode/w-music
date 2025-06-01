"use client";

import { useReproductor } from "../../context/ReproductorContext";

const Sugerencias = () => {
  const { setIsOpenBuscar, setSearchTerm, handleSearch } = useReproductor();

  const sugerencias = [
    "Salsa",
    "Vallenato",
    "Reggaeton",
    "Rock",
    "Pop",
    "Hip Hop",
    "Jazz",
    "Blues",
    "Country",
    "Electrónica",
    "Clásica",
  ];

  return (
    <div className="flex items-center overflow-auto gap-2 w-full mt-5 z-10">
      {sugerencias.map((sugerencia, index) => (
        <div
          key={index}
          onClick={(e) => {
            setSearchTerm(sugerencia);
            handleSearch(e, sugerencia);
            setIsOpenBuscar(true);
          }}
          className="bg-[#67c312] text-[#07358a] rounded-lg p-2 hover:bg-[#67c312]/50 w-auto flex-shrink-0 text-sm font-semibold active:scale-95 transition-transform duration-75 cursor-pointer select-none shadow-lg hover:shadow-md active:shadow-sm flex items-center justify-center mb-3"
        >
          {sugerencia}
        </div>
      ))}
    </div>
  );
};

export default Sugerencias;
