import mongoose from "mongoose";

const songSchema = mongoose.Schema(
  {
    userId: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    artistName: {
      type: String,
    },
    picturePath: String,
    audioPath: String,
    viewCount: Number,
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Song = mongoose.model("Song", songSchema);

export default Song;
