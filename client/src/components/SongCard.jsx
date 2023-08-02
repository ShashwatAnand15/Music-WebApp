import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PlayPause from "./PlayPause";
import state, { playPause, setActiveSong } from "../state";

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();
  const currentSongs = useSelector((state) => state.currentSongs);
  let startTime;
  var endTime;
  const handlePauseClick = () => {
    endTime = new Date().getTime();
    var distance = endTime - startTime;
    console.log("Start Time :" + startTime + " End Time:" + endTime);
    console.log(distance);
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    
    startTime = new Date().getTime();
    console.log(startTime);
    //console.log("here  to play");
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.name === song.name
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img
          alt={song.picturePath}
          src={`http://localhost:3001/assets/${song.picturePath}`}
          className="w-full h-full rounded-lg"
        />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.key}`}>{song.name}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link
            to={
              song.artists
                ? `/artists/${song?.artists[0]?.adamid}`
                : "/top-artists"
            }
          >
            {song.artistName}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
