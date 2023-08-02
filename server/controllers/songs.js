import Song from "../models/Song.js";
import User from "../models/User.js";

/* CREATE */
export const createSong = async (req, res) => {
  try {
    const { userId, name, audioPath, picturePath } = req.body;
    console.log(audioPath);
    const user = await User.findById(userId);
    const newSong = new Song({
      userId,
      name: name,
      artistName: user.firstName + " " + user.lastName,
      picturePath: picturePath,
      audioPath: audioPath,
      viewCount: 0,
      likes: {},
    });
    await newSong.save();

    //const song = await Song.find();
    res.status(201).json(newSong);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedSongs = async (req, res) => {
  try {
    const song = await Song.find().sort({ createdAt: -1 });

    res.status(200).json(song);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserSongs = async (req, res) => {
  try {
    const { userId } = req.params;
    const song = await Song.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(song);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likeSong = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const song = await Song.findById(id);
    const isLiked = song.likes.get(userId);

    if (isLiked) {
      song.likes.delete(userId);
    } else {
      song.likes.set(userId, true);
    }

    const updatedSong = await Song.findByIdAndUpdate(
      id,
      { likes: song.likes },
      { new: true }
    );

    res.status(200).json(updatedSong);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
