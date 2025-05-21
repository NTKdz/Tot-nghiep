import { useEffect, useRef, useState } from "react";
import Carousels from "./components/carousel/Carousels";
import Congratulation from "./components/congratulation/Congratulation";
import Navigator from "./components/navigator/Navigator";
import Message from "./components/message/Message";

export default function App() {
  const [activeSection, setActiveSection] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showOverlay, setShowOverlay] = useState(true);

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

  const handleStartClick = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error: DOMException) => {
        console.warn("Audio playback prevented:", error);
      });
    }
    setShowOverlay(false);
  };

  return (
    <div>
      {showOverlay && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100]"
          onClick={handleStartClick}
        >
          <div className="text-white text-center p-8 bg-gray-800 rounded-lg">
            <h1 className="text-3xl mb-4">Xin chào!</h1>
            <p className="text-lg">Vui lòng chạm để bắt đầu trải nghiệm :))</p>
          </div>
        </div>
      )}

      <div
        className="w-10 h-10 fixed top-10 left-10 z-50 hover:cursor-pointer"
        onClick={() => {
          if (audioRef.current) {
            if (audioRef.current.paused) {
              audioRef.current.play().catch((error: DOMException) => {
                console.warn("Audio playback prevented by user action:", error);
              });
            } else audioRef.current.pause();
          }
        }}
      >
        <img src="dom.png" alt="Toggle Audio" />
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