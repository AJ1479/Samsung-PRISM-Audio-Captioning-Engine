let audioStream;
let mediaRecorder;
let audioChunks = [];
let audioURL;

let startAudioRecButton = document.getElementById("startAudioRec");
let stopAudioRecButton = document.getElementById("stopAudioRec");
let playAudioRecButton = document.getElementById("playAudio");

const audioFile = document.getElementById("audioFile");

var input = document.querySelector(".search-form");
var search = document.querySelector(".caption");
var button = document.querySelector(".text-button");
var ele = document.getElementsByClassName("cap2");

async function getMetadata() {
  let meta = await musicMetadata.parseBlob(audioFile.files[0]);
  return meta;
}

document.getElementById("getInfo").onclick = async function () {
  let meta = await getMetadata();
  document.getElementById("info1").textContent = JSON.stringify(meta.format);
};

function triggerClick1() {
  $(".none").click();
}

function click3(i) {
  if ($(".click" + i).hasClass("hidden")) {
    $(".click" + i).removeClass("hidden");
  } else {
    $(".click" + i).addClass("hidden");
  }
}

$(".none").change(function () {
  $(".get-info").removeClass("hidden");
  $(".container").removeClass("hidden");
  $(".upload").addClass("hidden");
  let x = URL.createObjectURL(audioFile.files[0]);
  player.source = {
    type: "audio",
    title: "Example title",
    sources: [
      {
        src: x,
        type: "audio/mp3",
      },
    ],
  };
  npTitle = $("#npTitle");
  npTitle.text(audioFile.files[0].name);
  npAction = $("#npAction");
  player.on("pause", (event) => {
    npAction.text("Paused");
  });
  player.on("play", (event) => {
    npAction.text("Now Playing");
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
