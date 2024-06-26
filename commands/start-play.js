const fs = require("fs");
const PlayerQueue = require("../player-queue");
const { getMp3FromMusicFolder } = require("../mp3.utils");

function startPlayCommand(message) {
  if (message.member.id !== process.env.OWNER_ID)
    return message.reply("Only owner can do this (for now) ");
  const files = getMp3FromMusicFolder().sort(() => 0.5 - Math.random());

  files.forEach((mp3File) => {
    PlayerQueue.enqueue(mp3File);
  });
  console.log(files, "aha");

  if (files.length === 0) {
    return message.reply("No music files found in the /music folder.");
  }

  const channel = message.member.voice.channel;
  if (!channel) {
    return message.reply("You need to join a voice channel first!");
  }

  PlayerQueue.setConnection(channel).then(() => {
    PlayerQueue.start(message);
  });
}
module.exports = { startPlayCommand };
