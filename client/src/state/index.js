import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  address: "",
  token: null,
  songs: [],
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setSongs: (state, action) => {
      state.songs = action.payload.songs;
    },
    setSong: (state, action) => {
      const updatedSongs = state.songs.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.songs = updatedSongs;
    },
    addSong: (state, action) => {
      state.songs = [action.payload.songs, ...state.songs];
    },
    setActiveSong: (state, action) => {
      if (state.activeSong.name === action.payload.song.name) {
        console.log("Same Song");
      }
      state.activeSong = action.payload.song;
      state.isActive = true;

      // if (action.payload?.data?.tracks?.hits) {
      //   state.currentSongs = action.payload.data.tracks.hits;
      // } else if (action.payload?.data?.properties) {
      //   state.currentSongs = action.payload?.data?.tracks;
      // } else {
      state.currentSongs = action.payload.data;
      // }

      state.currentIndex = action.payload.i;
    },

    nextSong: (state, action) => {
      if (state.currentSongs[action.payload]?.song) {
        state.activeSong = state.currentSongs[action.payload]?.song;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      if (state.currentSongs[action.payload]?.song) {
        state.activeSong = state.currentSongs[action.payload]?.song;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

export const {
  setMode,
  setAddress,
  setLogin,
  setLogout,
  setFriends,
  setSongs,
  setSong,
  addSong,
  setActiveSong,
  nextSong,
  prevSong,
  playPause,
  selectGenreListId,
} = authSlice.actions;

export default authSlice.reducer;
