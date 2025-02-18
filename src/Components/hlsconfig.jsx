const hlsConfig = {
  debug: false, // Set to true for debugging
  autoStartLoad: true, // Automatically start loading the video
  capLevelOnFPSDrop: false, // Disable automatic quality level switching on FPS drop
  capLevelToPlayerSize: false, // Disable capping quality levels based on player size
  maxBufferSize: 1 * 1000 * 1000, // Maximum buffer size (30 MB in this example)
  maxBufferLength: 10, // Maximum buffer length (in seconds)
  controls: [
    "play-large",
    "play",
    "progress",
    "current-time",
    "mute",
    "volume",
    "captions",
    "settings",
    "airplay",
    "fullscreen",
  ],
  clickToPlay: true,
  hideControls: true,
  keyboard: { focused: true, global: true },
  tooltips: { controls: true, seek: true },
  storage: { enabled: true, key: "plyr" },
  buffered:0,
  // autoplay: true,
  autopause: true,
 
};

export default hlsConfig;
