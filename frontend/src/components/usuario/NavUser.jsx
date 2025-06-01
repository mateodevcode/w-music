import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";

export const NavUser = () => {
  return (
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
            <MdKeyboardArrowLeft className="text-zinc-300 text-4xl font-semibold border-[1px] border-zinc-500 rounded-full p-1 opacity-50 hover:bg-white/10 hover:text-white transition-colors duration-200 cursor-pointer" />
          </span>
          <span>
            <MdKeyboardArrowRight className="text-zinc-300 text-4xl font-semibold border-[1px] border-zinc-500 rounded-full p-1 hover:bg-white/10 hover:text-white transition-colors duration-200 cursor-pointer" />
          </span>
        </div>
      </div>
    </div>
  );
};
