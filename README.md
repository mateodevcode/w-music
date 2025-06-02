# w-music
[![image](https://github.com/user-attachments/assets/6d05effe-cc91-4b59-86bf-70d8117f5046)](https://w-music.onrender.com)

## Deploy on Render
Para visualizar la pagina desplegada en Render puedes dar click en el siguiente enlace. [Ir a la App Web](https://w-music.onrender.com)

**🎬🍿 ¡Descubre W-Music! Tu Destino Gratis para escuchar musica 🍿🎬** ¡Hola a todos! 😄 Estoy súper emocionado de presentarles **W-Music**, una App web diseñada para que disfrutes de tu Musica favorita totalmente gratis. 🎉 He creado esta plataforma utilizando **Python + FastAPI**, **Vite  + React** y **TailwindCSS**, combinando tecnología moderna con una experiencia de usuario increíble. 🚀

[![image](https://github.com/user-attachments/assets/96526c89-f4d0-4b74-8b21-f52ddce86cb8)](https://w-music.onrender.com)


- 🔍 Buscar canciones usando la API no oficial de **YouTube Music**.
- 🎧 Obtener el **streaming de audio** directamente desde YouTube
- 🌐 Servir un frontend moderno hecho en **Vite/React**.
- 🚀 Usar todo desde un solo backend gracias a FastAPI.


---

## 🧩 Tecnologías utilizadas

| Tecnología     | Descripción                                       |
|----------------|---------------------------------------------------|
| **FastAPI**    | Backend rápido y moderno para APIs REST           |
| **YTMusicAPI** | Búsquedas en YouTube Music                        |
| **yt-dlp**     | Extraer el audio directo desde YouTube            |
| **Vite + React** | Interfaz moderna y rápida                      |
| **Uvicorn**    | Servidor ASGI para ejecutar FastAPI               |
| **CORS**       | Permitir peticiones entre frontend y backend      |

---

## <li>Backend</li>
[![My Skills](https://skillicons.dev/icons?i=python,fastapi,)](https://skillicons.dev)

## <li>Frontend</li>
[![My Skills](https://skillicons.dev/icons?i=react,vite,tailwind,)](https://skillicons.dev)


## 📌 ¿Qué es este proyecto?

`YouTube Music Audio Streamer` es una app de streaming de música que:

1. Utiliza `ytmusicapi` para buscar canciones en YouTube Music.
2. Usa `yt-dlp` para extraer el enlace directo del audio del video.
3. Expone una API REST con FastAPI.
4. Sirve un frontend hecho con React/Vite para buscar y escuchar canciones fácilmente.

## 🎥 Demostración rápida
[Ir a la App Web](https://w-music.onrender.com)

   
## 🚀 Instalación paso a paso

### 1. Clonar el proyecto

```bash
git clone https://github.com/tu_usuario/tu_repositorio.git
cd w-music
```

## 2. Instalar dependencias del backend

```bash
pip install -r requirements.txt
```
⚠️ Requiere tener ffmpeg instalado para que yt-dlp funcione correctamente.


## 3. Construir el frontend

```bash
cd frontend
npm install
npm run build
```
Esto genera la carpeta dist/ que FastAPI sirve como frontend.

## 4. Ejecutar el servidor

```bash
cd ..
uvicorn backend.main:app --reload
```

# 🌐 Endpoints disponibles
## 🔎 Buscar canciones
GET /search?query={nombre}
### Ejemplo:
```bash
GET /search?query=Linkin Park
```
### Respuesta:
```bash
[
  {
    "title": "Numb",
    "artist": "Linkin Park",
    "thumbnail": "https://...",
    "videoId": "abcd123",
    "duration": "3:05",
    "views": "98M"
  }
]
```

## 🎧 Obtener URL de audio
GET /stream/{video_id}
### Ejemplo:
```bash
GET /stream/abcd123
```
### Respuesta:
```bash
{
  "audio_url": "https://rr3---sn-....googlevideo.com/videoplayback?..."
}
```

# 🖥️ Frontend (interfaz)
Una vez ejecutado el servidor y compilado el frontend, visita:
```bash
http://localhost:8000/
```

Allí podrás:
- Escribir el nombre de una canción
- Ver resultados con miniaturas
- Reproducir el audio sin abrir YouTube

# 🛡️ CORS
El backend permite peticiones desde cualquier origen para facilitar la integración con frontends externos.

## 📁 Estructura del proyecto
```bash
📦 w-music/
│
├── 📁 backend/           # Python + FastAPI
│   └── main.py/          # API con FastAPI
├── 📁 frontend/          # Proyecto Vite + React
│   └── dist/             # Archivos generados para producción
│   └── env/              # Env para el front
├── main.py               # API con FastAPI
├── requirements.txt      # Dependencias del backend
└── README.md             
```

# 📸 Capturas de pantalla
[![image](https://github.com/user-attachments/assets/0688ce3c-ffa9-4f8d-a869-1a7dc4006d5e)](https://w-music.onrender.com)

## 🙌 Autor
Desarrollado por [Mateo Lizcano Noriega](https://www.linkedin.com/in/mateo-lizcano-noriega)
¿Te fue útil este proyecto? ¡Dale una estrella ⭐ y compártelo!

## License
[MIT](https://choosealicense.com/licenses/mit/)


## 🌐 ¡Visita W-music y empieza a disfrutar de tu musica favorita hoy mismo! 🎉🍿

[👉 w-music](https://w-music.onrender.com)

¡Espero que disfrutes usando W-music tanto como yo disfruté creándola! 🎬✨
