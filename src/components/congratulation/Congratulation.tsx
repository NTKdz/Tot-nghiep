import { useEffect, useState } from "react";
import "./styles.css";

export default function Congratulation() {
  const message = "Chúc mừng bạn Linh tốt nghiệp nhé";
  const [displayedText, setDisplayedText] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | waiting | deleting
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (index < message.length) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + message[index]);
          setIndex((i) => i + 1);
        }, 70);
      } else {
        // Done typing
        timeout = setTimeout(() => {
          setPhase("waiting");
        }, 1000); // wait 1 second before deleting
      }
    }

    if (phase === "waiting") {
      timeout = setTimeout(() => {
        setPhase("deleting");
      }, 3000);
    }

    if (phase === "deleting") {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
        }, 40);
      } else {
        // Finished deleting
        timeout = setTimeout(() => {
          setIndex(0);
          setPhase("typing");
        }, 2000);
      }
    }

    return () => clearTimeout(timeout);
  }, [phase, index, displayedText, message]);

  return (
    <div>
      <div className="relative h-screen w-ful overflow-hidden ">
        <img
          src="truong.jpg"
          alt="Graduation"
          className="w-full h-full object-cover opacity-75 mask-horizontal-fade"
        />

        <div className="text-center font-semibold mt-10 text-2xl md:text-4xl px-4 md:pb-3 pt-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[120px] bg-white/30 backdrop-blur-md rounded-2xl">

          <span className="hidden md:block text-ellipsis">
            {displayedText}
            <span className="animate-pulse">|</span>
          </span>

          <span className="md:hidden w-screen overflow-hidden block relative h-10">
            <span className="absolute whitespace-nowrap animate-marquee">
              {message}
            </span>
          </span>

          <div className="absolute z-50 mt-10 top-1/2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {"Khoidz".split("").map((letter, index) => (
              <span
                key={index}
                className="text-2xl md:text-4xl font-bold text-black animate-bounce"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  display: "inline-block",
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
