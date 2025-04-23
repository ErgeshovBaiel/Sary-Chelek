import { useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import "./music.scss";
import music from './music/gulzhigit-satybekov-sary-chelek_(kmuzon.com).mp3'; 

export default function Music() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [color, setColor] = useState("red");
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.error("Play error:", err));
    }
    setIsPlaying(!isPlaying);
    setColor(!isPlaying ? "#00695c" : "red");
  };

  return (
    <div>
      <audio ref={audioRef} src={music} loop />
      <button onClick={toggleMusic} className="music-toggle" style={{ backgroundColor: color }}>
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
    </div>
  );
}
