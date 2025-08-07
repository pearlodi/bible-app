import { useEffect, useState } from "react";

const TypewriterText = () => {
  const messages = [
    "Welcome to open heavens online",
    "What would you like to do today?",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < messages[currentMessageIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + messages[currentMessageIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      if (currentMessageIndex === 0) {
        const clearTimeoutId = setTimeout(() => {
          setDisplayedText("");
          setCharIndex(0);
          setCurrentMessageIndex(1);
        }, 1500); 
        return () => clearTimeout(clearTimeoutId);
      }
    }
  }, [charIndex, currentMessageIndex, messages]);

  return (
    <h1 style={{ fontFamily: "monospace", whiteSpace: "pre" }}>
      {displayedText}
      <span className="blinking-cursor">|</span>
    </h1>
  );
};

export default TypewriterText;
