import Hls from "hls.js";
import { duration } from "moment/moment";
import Plyr from "plyr";
import React, { useEffect, useRef, useState } from "react";
import "./StyleHLS/Hls.css";
import hlsConfig from "./hlsconfig";
import config from "../../config";

const HlsPlayer = ({ source, duration, handleTimeUpdate, poster }) => {
  const videoRef = useRef();
  const defaultOptions = {
    ...hlsConfig,
  };

  function updateQuality(newQuality) {
    if (newQuality === 0) {
      window.hls.currentLevel = -1; //Enable AUTO quality if option.value = 0
    } else {
      window.hls.levels.forEach((level, levelIndex) => {
        if (level.height === newQuality) {
          //console.log("Found quality match with " + newQuality);
          window.hls.currentLevel = levelIndex;
        }
      });
    }
  }

  useEffect(() => {
    const video = videoRef.current;

    if (!Hls.isSupported()) {
      video.src = source;
      var player = new Plyr(video, defaultOptions);
    } else {
      // For more Hls.js options, see https://github.com/dailymotion/hls.js
      const hls = new Hls();
      (hls.config.maxBufferSize = 1 * 1000 * 1000), // Maximum buffer size (1 MB in this example)
        (hls.config.maxBufferLength = 5), // Maximum buffer length (in seconds)
        hls.loadSource(source);

      // / Listen for events to track metadata loading
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("HLS manifest parsed - Metadata is loaded");
      });

      hls.on(Hls.Events.FRAG_LOADED, () => {
        console.log("HLS fragment loaded - Data is being loaded");
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.log(
                "A network error occurred while loading the manifest"
              );
              // Handle the error appropriately
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.log("A media error occurred while parsing the manifest");
              // Handle the error appropriately
              break;
            default:
              // Handle other types of errors
              break;
          }
        }
      });

      hls.on(Hls.Events.BUFFER_APPENDED, () => {
        // Handle appended buffer
      });

      hls.on(Hls.Events.BUFFER_FLUSHED, () => {
        // Handle flushed buffer
      });

      hls.on(Hls.Events.BUFFER_CODECS, () => {
        // Handle codecs related buffer event
      });
      // From the m3u8 playlist, hls parses the manifest and returns
      // all available video qualities. This is important, in this approach,
      // we will have one source on the Plyr player.
      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        // Transform available levels into an array of integers (height values).
        const availableQualities = hls.levels.map((l) => l.height);
        availableQualities.unshift(0); //prepend 0 to quality array

        // Add new qualities to option
        defaultOptions.quality = {
          default: 0, //Default - AUTO
          options: availableQualities,
          forced: true,
          onChange: (e) => updateQuality(e),
        };
        // Add Auto Label
        defaultOptions.i18n = {
          qualityLabel: {
            0: "Auto",
          },
        };

        hls.on(Hls.Events.LEVEL_SWITCHED, function (event, data) {
          var span = document.querySelector(
            ".plyr_menu_container [data-plyr='quality'][value='0'] span"
          );
          if (hls.autoLevelEnabled) {
            span.innerHTML = AUTO(`${hls.levels[data.level].height}p`);
          } else {
            span.innerHTML = AUTO;
          }
        });

        // Initialize new Plyr player with quality options
        var player = new Plyr(video, defaultOptions);
        // Set the current time to 30 seconds
        videoRef.current.currentTime = parseInt(duration);

        // Add event listener for time update

        player.on("timeupdate", handleTimeUpdate);
        player.on("error", (event) => {
          if (event.detail.code === 4) {
            document.getElementById("custom-message").style.display = "block";
            // You can customize the message or redirect the user to another page here
          }
        });
      });

      hls.attachMedia(video);

      window.hls = hls;
    }

    //console.log("config.aws}/${singleVideo?.vide",source)
  }, [source]);

  return (
    <>
      <div id="custom-message">Video not found</div>

      <video
        className="player"
        ref={videoRef}
        poster={poster}

        // allow="autoplay"
      ></video>
    </>
  );
};

export default HlsPlayer;
