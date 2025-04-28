import { useState, useRef, useEffect } from "react"; 
import { Volume2, VolumeX } from "lucide-react";
import "./Music.scss";
import music from './music/Abdulhamid.mp3'; 

export default function Music() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [color, setColor] = useState("red");
  const audioRef = useRef(null);
  useEffect(() => {
    const savedIsPlaying = localStorage.getItem('isPlaying');
    if (savedIsPlaying === 'true' && audioRef.current) {
      audioRef.current.play().catch(err => console.error("Play error:", err));
      setIsPlaying(true);
      setColor("#00695c");
    }
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      localStorage.setItem('isPlaying', 'false');
    } else {
      audioRef.current.play().catch(err => console.error("Play error:", err));
      localStorage.setItem('isPlaying', 'true');
    }
    setIsPlaying(!isPlaying);
    setColor(!isPlaying ? "#00695c" : "red");
  };

  return (
    <div className="w-360 m-auto">
      <audio ref={audioRef} src={music} loop />
      <button onClick={toggleMusic} className="music-toggle" style={{ backgroundColor: color }}>
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
    </div>
  );
}
