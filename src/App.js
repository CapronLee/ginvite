// App.js
import { useState } from "react";
import "./App.css";
import BackgroundMusic from "./components/BackgroundMusic";
import GraduationContent from "./components/GraduationContent";
import NameInputPage from "./components/NameInputPage";

function App() {
  const [name, setName] = useState("");
  const [joined, setJoined] = useState(false);

  const handleEnter = () => {
    if (name.trim()) setJoined(true);
  };

  return (
    <>
      {joined ? (
        <GraduationContent name={name} />
      ) : (
        <NameInputPage name={name} setName={setName} onSubmit={handleEnter} />
      )}
      <BackgroundMusic />
    </>
  );
}

export default App;
