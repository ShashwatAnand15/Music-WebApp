import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSongs } from "../state";
import { Error, Loader, SongCard } from "../components";
// import { selectGenreListId } from "../redux/features/playerSlice";
// import { useGetSongsByGenreQuery } from "../redux/services/shazamCore";
import { genres } from "../assets/constants";

const Discover = () => {
  const dispatch = useDispatch();
  const genreListId = useSelector((state) => state.genreListId);
  const activeSong = useSelector((state) => state.activeSong);
  const isPlaying = useSelector((state) => state.isPlaying);
  // const { data, isFetching, error } = useGetSongsByGenreQuery(
  //   genreListId || "POP"
  // );

  const songs = useSelector((state) => state.songs);
  const token = useSelector((state) => state.token);

  const getSongs = async () => {
    const response = await fetch("http://localhost:3001/songs", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log("Songs are :" + data);
    dispatch(setSongs({ songs: data }));
  };

  useEffect(() => {
    getSongs();
  }, []);

  // if (isFetching) return <Loader title="Loading songs..." />;

  // if (error) return <Error />;

  // const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Discover</h2>

        {/* <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || "pop"}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select> */}
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.length
          ? songs.map((song, i) => (
              <SongCard
                key={song.key}
                song={song}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={songs}
                i={i}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Discover;
