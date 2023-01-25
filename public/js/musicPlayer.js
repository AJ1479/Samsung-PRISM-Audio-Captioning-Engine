var player;
jQuery(function ($) {
  "use strict";
  var supportsAudio = !!document.createElement("audio").canPlayType;
  if (supportsAudio) {
    // initialize plyr
    player = new Plyr("#audio1", {
      controls: [
        "restart",
        "play",
        "progress",
        "current-time",
        "duration",
        "mute",
        "volume",
        "download",
      ],
    });
    // initialize playlist and controls
    var index = 0,
      playing = false,
      npAction = $("#npAction"),
      npTitle = $("#npTitle"),
      audio = $("#audio1")
        .on("play", function () {
          playing = true;
          npAction.text("Now Playing...");
        })
        .on("pause", function () {
          playing = false;
          npAction.text("Paused...");
        })
        .on("ended", function () {
          npAction.text("Paused...");
          if (index + 1 < trackCount) {
            index++;
            loadTrack(index);
            audio.play();
          } else {
            audio.pause();
            index = 0;
            loadTrack(index);
          }
        })
        .get(0),
      loadTrack = function (id) {
        $(".plSel").removeClass("plSel");
        $("#plList li:eq(" + id + ")").addClass("plSel");
        // npTitle.text(tracks[id].name);
        index = id;
        updateDownload(id, audio.src);
      },
      updateDownload = function (id, source) {
        player.on("loadedmetadata", function () {
          $('a[data-plyr="download"]').attr("href", audioURL);
        });
      };
    loadTrack(index);
  } else {
    // no audio support
    $(".column").addClass("hidden");
    var noSupport = $("#audio1").text();
    $(".container").append('<p class="no-support">' + noSupport + "</p>");
  }
});
