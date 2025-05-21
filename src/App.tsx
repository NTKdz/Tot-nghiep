import { useEffect, useRef, useState } from "react";
import Carousels from "./components/carousel/Carousels";
import Congratulation from "./components/congratulation/Congratulation";
import Navigator from "./components/navigator/Navigator";
import Message from "./components/message/Message";

export default function App() {
  const [activeSection, setActiveSection] = useState("");
  const audioRef = useRef(null);

  useEffect(() => {
    const sections = document.querySelectorAll("div[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const startAudioOnInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.warn("Audio playback prevented:", error);
        });
      }

      document.removeEventListener("click", startAudioOnInteraction);
      document.removeEventListener("touchend", startAudioOnInteraction);
    };

    document.addEventListener("click", startAudioOnInteraction);
    document.addEventListener("touchend", startAudioOnInteraction);

    return () => {
      document.removeEventListener("click", startAudioOnInteraction);
      document.removeEventListener("touchend", startAudioOnInteraction);
    };
  }, []);

  return (
    <div>
      <div
        className="w-10 h-10 fixed top-10 left-10 z-50 hover:cursor-pointer"
        onClick={() => {
          if (audioRef.current) {
            if (audioRef.current.paused) {
              audioRef.current.play().catch((error) => {
                console.warn("Audio playback prevented:", error);
              });
            } else audioRef.current.pause();
          }
        }}
      >
        <img src="dom.png" alt="" />
      </div>

      <audio loop ref={audioRef} preload="auto">
        <source src="/test1.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <Navigator activeSection={activeSection} />

      <div id="home" className="min-h-screen">
        <Congratulation />
      </div>

      <div id="album">
        <Carousels />
      </div>

      <div id="message" className="min-h-screen">
        <Message />
      </div>
    </div>
  );
}
