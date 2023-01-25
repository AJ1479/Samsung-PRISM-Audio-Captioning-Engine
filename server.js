require("dotenv").config();

const express = require("express");
const multer = require("multer");
const fs = require("fs");
const multiparty = require("multiparty");
const ObjectsToCsv = require("objects-to-csv");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

async function appendToCsv(text1, text2, text3, text4, text5, fileName) {
  if (!text1) {
    return;
  }

  if(fileName.endsWith(".mp3")){
    fileName = fileName.slice(0,fileName.length - 4)
  }
  const object1 = [
    {
      fileName: fileName,
      Caption1: text1[0],
      Caption2: text2[0],
      Caption3: text3[0],
      Caption4: text4[0],
      Caption5: text5[0],
    },
  ];
  const csv = new ObjectsToCsv(object1);
  await csv.toDisk("./list.csv", { append: true });
}

var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    let fileName = file.originalname;

    if (fileName.includes("blob")) {
      fileName = fileName + ".wav";
    }
    callback(null, fileName);
  },
});

var upload = multer({
  storage: Storage,
}).array("file", 1); //Field name and max count

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index1.html");
});

app.post("/file_upload", function (req, res) {
  var form = new multiparty.Form();
  let newFileName;

  form.parse(req, function (err, fields, files) {
    console.log(files)
    newFileName = files.file[0].originalFilename;
    if (files.file[0].originalFilename === "blob") {
      newFileName = files.file[0].path.split("\\")[6];
      fs.copyFileSync(
        files.file[0].path,
        `${__dirname}\\uploads\\${newFileName}.wav`
      );
    }

    appendToCsv(
      fields.cap1,
      fields.cap2,
      fields.cap3,
      fields.cap4,
      fields.cap5,
      newFileName
    );
  });
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.send("Something went wrong!");
    }
    return res.send("ok");
  });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
