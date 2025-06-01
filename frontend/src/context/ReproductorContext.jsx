import { createContext, useContext, useState, useRef, useEffect } from "react";

const ReproductorContext = createContext();

export const useReproductor = () => useContext(ReproductorContext);

export const ReproductorProvider = ({ children }) => {
  const containerRef = useRef(null); // <- NUEVO
  const [isOpenReproductor, setIsOpenReproductor] = useState(false);
  const [isOpenBuscar, setIsOpenBuscar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [listaBusqueda, setListaBusqueda] = useState([]);
  const [ListaRecomendada, setListaRecomendada] = useState(() => {
    const listaRecomendada =
      JSON.parse(localStorage.getItem("lista_recomendada")) || [];
    return listaRecomendada;
  });
  const [cancion, setCancion] = useState(() => {
    const cancion = JSON.parse(localStorage.getItem("cancion")) || null;
    return cancion;
  });
  const [audioSrc, setAudioSrc] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    localStorage.setItem("cancion", JSON.stringify(cancion));
  }, [cancion]);

  useEffect(() => {
    localStorage.setItem("lista_recomendada", JSON.stringify(ListaRecomendada));
  }, [ListaRecomendada]);

  const handleSearch = async (e, searchTerm) => {
    e.preventDefault();
    const res = await fetch(`/search?query=${encodeURIComponent(searchTerm)}`);
    const data = await res.json();
    setListaBusqueda(data); // Clear previous search result
  };
  //

  useEffect(() => {
    if (!cancion?.videoId) return;
    const fetchAudioUrl = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/stream/${cancion.videoId}`
        );
        // const res = await fetch(
        //   `https://w-music.onrender.com/stream/${cancion.videoId}`
        // );
        const data = await res.json();
        if (data.audio_url) setAudioSrc(data.audio_url);
      } catch (error) {
        console.error("Error fetching audio stream:", error);
      }
    };
    fetchAudioUrl();
  }, [cancion?.videoId]);

  // Reproducir cuando cambie `audioSrc`
  useEffect(() => {
    if (!audioSrc) return;

    const currentAudio = audioRef.current;
    currentAudio.src = audioSrc;

    const playPromise = currentAudio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => setIsPlaying(false));
    }

    const updateTime = () => {
      setProgress(currentAudio.currentTime);
      setDuration(currentAudio.duration);
    };

    currentAudio.addEventListener("timeupdate", updateTime);

    return () => {
      currentAudio.pause();
      currentAudio.src = "";
      currentAudio.removeEventListener("timeupdate", updateTime);
    };
  }, [audioSrc]);

  // Manejar errores
  useEffect(() => {
    const handleError = () =>
      console.error("Error cargando audio", audioRef.current.error);
    audioRef.current.addEventListener("error", handleError);
    return () => audioRef.current.removeEventListener("error", handleError);
  }, []);

  const handlePlayPause = () => {
    const currentAudio = audioRef.current;
    if (isPlaying) {
      currentAudio.pause();
    } else {
      const playPromise = currentAudio.play();
      if (playPromise !== undefined) playPromise.catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <ReproductorContext.Provider
      value={{
        cancion,
        isPlaying,
        setCancion,
        setIsPlaying,
        audioRef,
        isOpenReproductor,
        setIsOpenReproductor,
        isOpenBuscar,
        setIsOpenBuscar,
        searchTerm,
        setSearchTerm,
        listaBusqueda,
        setListaBusqueda,
        ListaRecomendada,
        setListaRecomendada,
        handleSearch,
        containerRef,
        audioSrc, // <- NUEVO
        handlePlayPause,
        duration,
        setDuration,
        progress,
        setProgress,
      }}
    >
      {children}
    </ReproductorContext.Provider>
  );
};
