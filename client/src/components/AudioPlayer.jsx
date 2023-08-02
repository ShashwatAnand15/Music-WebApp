import React, { useState, useEffect, useRef, useContext } from "react";

const AudioPlayer = () => {
  // self State
  const [statevolum, setStateVolum] = useState(0.3);
  const [dur, setDur] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  return (
    <div className="vlme">
      <span className="volum">
        <i className="fas fa-volume-down"></i>
      </span>
      <input
        value={Math.round(statevolum * 100)}
        type="range"
        name="volBar"
        id="volBar"
        onChange={(e) => handleVolume(e.target.value / 100)}
      />
    </div>
  );
};

export default AudioPlayer;
