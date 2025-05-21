import { useEffect, useState } from "react";
import Carousels from "./components/carousel/Carousels";
import Congratulation from "./components/congratulation/Congratulation";
import Navigator from "./components/navigator/Navigator";
import Message from "./components/message/Message";

export default function App() {
  const [activeSection, setActiveSection] = useState("");

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
      { threshold: 0.6 } // section must be at least 60% visible
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <Navigator activeSection={activeSection} />

      <div id="home" className="min-h-screen">
        <Congratulation />
      </div>

      <div id="album" className="min-h-screen">
        <Carousels />
      </div>

       <div id="message" className="min-h-screen">
        <Message />
      </div>
    </div>
  );
}
