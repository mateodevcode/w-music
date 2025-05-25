const Sugerencias = ({ setIsOpenBuscar, setSearchTerm, handleSearch }) => {
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
    <div className="flex items-center overflow-auto gap-2 w-full mt-5">
      {sugerencias.map((sugerencia, index) => (
        <div
          key={index}
          onClick={(e) => {
            setSearchTerm(sugerencia);
            handleSearch(e, sugerencia);
            setIsOpenBuscar(true);
            // Aquí podrías agregar lógica para buscar la sugerencia
          }}
          className="bg-zinc-800 text-white rounded-lg p-2 mb-2 cursor-pointer hover:bg-zinc-700 transition-colors duration-200 w-auto flex-shrink-0 text-sm"
        >
          {sugerencia}
        </div>
      ))}
    </div>
  );
};

export default Sugerencias;
