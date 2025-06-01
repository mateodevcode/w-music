from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from ytmusicapi import YTMusic
import yt_dlp
import os
import uvicorn
from pathlib import Path

app = FastAPI()
ytmusic = YTMusic()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# Rutas API
@app.get("/search")
def search(query: str):
    results = ytmusic.search(query, filter="songs")
    filtered = []
    for item in results:
        if "videoId" in item and "thumbnails" in item:
            filtered.append(
                {
                    "title": item.get("title"),
                    "artist": (
                        item["artists"][0]["name"] if item.get("artists") else "Unknown"
                    ),
                    "thumbnail": item["thumbnails"][-1]["url"],
                    "videoId": item["videoId"],
                    "duration": item.get("duration", "0:00"),
                    "views": item.get("views", 0),
                }
            )
    return filtered


@app.get("/stream/{video_id}")
def get_audio_url(video_id: str):
    try:
        url = f"https://www.youtube.com/watch?v={video_id}"
        ydl_opts = {
            "quiet": True,
            "format": "bestaudio/best",
            "skip_download": True,
        }
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            audio_url = info["url"]
        return {"audio_url": audio_url}
    except Exception as e:
        return {"error": str(e)}


# Servir frontend Vite (dist)
frontend_dist_path = Path(__file__).resolve().parent.parent / "frontend" / "dist"
app.mount("/", StaticFiles(directory=frontend_dist_path, html=True), name="static")


@app.get("/")
def serve_index():
    return FileResponse(os.path.join(frontend_dist_path, "index.html"))


if __name__ == "__main__":
    import uvicorn
    import os

    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
