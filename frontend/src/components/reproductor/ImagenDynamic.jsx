import { useRef, useEffect, useState } from "react";

const ImagenDynamic = ({ src, setBackground }) => {
  const imgRef = useRef(null);
  const [bgStyle, setBgStyle] = useState({});

  useEffect(() => {
    const image = imgRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    image.onload = () => {
      // Tamaño original
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      ctx.drawImage(image, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      // Analizar los bordes
      const colors = [];

      const getPixel = (x, y) => {
        const index = (y * canvas.width + x) * 4;
        return {
          r: imgData[index],
          g: imgData[index + 1],
          b: imgData[index + 2],
        };
      };

      // Extraer píxeles de los bordes
      for (let i = 0; i < canvas.width; i += 10) {
        colors.push(getPixel(i, 0)); // top
        colors.push(getPixel(i, canvas.height - 1)); // bottom
      }

      for (let j = 0; j < canvas.height; j += 10) {
        colors.push(getPixel(0, j)); // left
        colors.push(getPixel(canvas.width - 1, j)); // right
      }

      // Promedio de color
      const avg = colors.reduce(
        (acc, c) => {
          acc.r += c.r;
          acc.g += c.g;
          acc.b += c.b;
          return acc;
        },
        { r: 0, g: 0, b: 0 }
      );

      const total = colors.length;
      const r = Math.round(avg.r / total);
      const g = Math.round(avg.g / total);
      const b = Math.round(avg.b / total);

      const background = `rgba(${r}, ${g}, ${b}, 0.3)`;
      setBackground(background);

      setBgStyle({
        backgroundColor: background,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      });
    };
  }, [src]);

  return (
    <div
      className="w-full h-[300px] md:h-[500px] flex items-center justify-center rounded-md"
      style={{
        ...bgStyle,
      }}
    >
      <img
        ref={imgRef}
        src={src}
        alt="preview"
        className="w-[150px] h-[150px] rounded-md"
        crossOrigin="anonymous" // necesario si es una imagen de otro dominio
      />
    </div>
  );
};

export default ImagenDynamic;
