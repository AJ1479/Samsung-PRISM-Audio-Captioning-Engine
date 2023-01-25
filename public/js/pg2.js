function captureUserMedia(mediaConstraints, successCallback, errorCallback) {
  navigator.mediaDevices
    .getUserMedia(mediaConstraints)
    .then(successCallback)
    .catch(errorCallback);
}

var mediaConstraints = {
  audio: true,
};
document.querySelector("#save-recording").onclick = function () {
  this.disabled = true;
  mediaRecorder.save();
};

function startRecording(idx) {
  $("#start-recording").disabled = true;
  audiosContainer = document.getElementById("audios-container");
  var f = document.getElementById("clicks");
  setInterval(function () {
    f.style.display = f.style.display == "none" ? "" : "none";
  }, 1000);

  captureUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
}

function stopRecording() {
  $("#stop-recording").disabled = true;

  var f = document.getElementById("clicks");
  setInterval(function () {
    f.style.display = f.style.display == "none" ? "" : "none";
  }, 1000);
  mediaRecorder.stop();
  mediaRecorder.stream.stop();

  $(".start-recording").disabled = false;
}

//Falvo Il file
function saveRecording() {
  mediaRecorder.save();
}

var blob_path;
var recordingBlob;

function onMediaSuccess(stream) {
  mediaRecorder = new MediaStreamRecorder(stream);
  mediaRecorder.stream = stream;
  mediaRecorder.mimeType = "audio/wav";
  //mediaRecorder.mimeType = 'audio/webm';
  mediaRecorder.audioChannels = 1;
  mediaRecorder.ondataavailable = async function (blob) {
    document.getElementById("getInfo").onclick = async function () {
      let meta = await getMetadata();
      document.getElementById("info1").textContent = JSON.stringify(
        meta.format
      );
    };

    async function getMetadata() {
      let meta = await musicMetadata.parseBlob(blob);
      return meta;
    }
    recordingBlob = blob;

    blob_path = URL.createObjectURL(blob);
    $(".container1").removeClass("hidden");
    $(".get-info").removeClass("hidden");
    $(".upload").addClass("hidden");
    // $('#record-audio').html("<audio controls=''><source src=" + URL.createObjectURL(blob) + "></source></audio>");
    player.source = {
      type: "audio",
      title: "Example title",
      sources: [
        {
          src: URL.createObjectURL(blob),
          type: "audio/mp3",
        },
      ],
    };
    npTitle = $("#npTitle");
    npTitle.text("Microphone Recording");
    npAction = $("#npAction");
    player.on("pause", (event) => {
      npAction.text("Paused");
    });
    player.on("play", (event) => {
      npAction.text("Now Playing");
    });
  };

  var timeInterval = 360 * 1000;

  mediaRecorder.start(timeInterval);

  $("#stop-recording").disabled = false;
}

function onMediaError(e) {
  console.error("media error", e);
}

function bytesToSize(bytes) {
  var k = 1000;
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Bytes";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
  return (bytes / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
}

function getTimeLength(milliseconds) {
  var data = new Date(milliseconds);
  return (
    data.getUTCHours() +
    " hours, " +
    data.getUTCMinutes() +
    " minutes and " +
    data.getUTCSeconds() +
    " second(s)"
  );
}

window.onbeforeunload = function () {
  $("#start-recording").disabled = false;
};

$(document).on("click", 'input[name="audio_record-icon"]', function () {
  var checked = $("#audio_record-icon").prop("checked");
  if (checked == true) {
    startRecording();
  } else {
    stopRecording();
  }
});

$(".option").click(function () {
  $(".option").removeClass("active");
  $(this).addClass("active");

  $(".visible").each(function () {
    if ($(this).parent().hasClass("active")) {
      if ($(this).hasClass("invisible")) {
        $(this).removeClass("invisible");
      }
    } else {
      $(this).addClass("invisible");
    }
  });
});

const fields = document.getElementsByClassName("search-form");
for (let field of fields) {
  let mySearch = field.children[0];
  let myButton = field.children[1];

  myButton.addEventListener("click", function (e) {
    e.preventDefault();
    field.classList.toggle("activeSearch");
  });

  mySearch.addEventListener("focus", function (e) {
    field.classList.add("focus");
  });

  mySearch.addEventListener("blur", function () {
    search.value.length != 0
      ? input.classList.add("focus")
      : input.classList.remove("focus");
  });
}

function click3(i) {
  if ($(".click" + i).hasClass("hidden")) {
    $(".click" + i).removeClass("hidden");
  } else {
    $(".click" + i).addClass("hidden");
  }
}

let recordingHasStartedCount = 0;
let audioURL;
let audioBlob;
let recordButton = document.getElementById("int_screen_rec_button");
recordButton.addEventListener("click", function (e) {
  recordingHasStartedCount++;

  if (recordingHasStartedCount === 2) {
    recordingHasStarted = true;
    onBtnRecordClicked();
  } else if (recordingHasStartedCount === 4) {
    onBtnStopClicked();

    recordingHasStartedCount = 0;
    setTimeout(() => {
      let downloadLink = document.querySelector("#audio0 > div > div > a");
      downloadLink.setAttribute("name", "audio.wav");
      downloadLink.setAttribute("download", "audio.wav");
    }, 500);
  }
});

async function getMetadata() {
  let meta = await musicMetadata.parseBlob(audioBlob);
  return meta;
}

document.getElementById("getInfo").onclick = async function () {
  let meta = await getMetadata();
  document.getElementById("info1").textContent = JSON.stringify(meta.format);
};

function sendRequest() {
  var data = new FormData();

  data.append("file", recordingBlob);

  if (!document.getElementsByClassName("cap1")[0]) {
    jQuery.ajax({
      url: "/file_upload",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      method: "POST",
      type: "POST", // For jQuery < 1.9
      success: function (data) {
        alert(data);
      },
      error: function (error) {
        console.log(error);
      },
    });
    return;
  }

  for (let i = 1; i <= 5; i++) {
    let val = document.getElementsByClassName("cap" + i)[0].value;
    if (val == "") {
      alert("Please fill in caption" + i);
      return;
    }
    data.append("cap" + i, val);
  }

  jQuery.ajax({
    url: "/file_upload",
    data: data,
    cache: false,
    contentType: false,
    processData: false,
    method: "POST",
    type: "POST", // For jQuery < 1.9
    success: function (data) {
      alert(data);
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function uploadData() {
  if (!audioURL) {
    alert("Please provide audio file!");
    return;
  }
  sendRequest();
}
