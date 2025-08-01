import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.2;

    const tryPlay = () => {
      audio.play().catch((err) => {
        console.warn("Không phát được audio:", err);
      });
      window.removeEventListener("click", tryPlay);
    };

    window.addEventListener("click", tryPlay);

    return () => {
      window.removeEventListener("click", tryPlay);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/audio/background.mp3"
      loop
      preload="auto"
      style={{ display: "none" }}
    />
  );
}
