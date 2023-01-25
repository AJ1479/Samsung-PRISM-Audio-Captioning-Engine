# Samsung-PRISM-Audio-Captioning-Engine

Audio Captioning Engine demonstration for Samsung PRISM worklet VI70, aimed to collect audio from multiple sources.

Source code for our paper titled ["Web Framework for Enhancing Automated Audio Captioning Performance for Domestic Environment"](https://ieeexplore.ieee.org/document/9984255).

## Tech Stack

**Client:** HTML, CSS, JS

**Server:** Node.js, Express.js

**Other libraries:** multiparty, multer, object-to-csv, browserify

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT` default: 3000

## Installation

Install dependencies with npm

```bash
  npm install
```

Build libraries for use with

```bash
  npm run build
```

Create a folder called `uploads` in the ROOT project folder

## Deployment

To deploy this project run

```bash
  npm start
```



## API Reference

#### Login

```
  GET /
```

Returns the landing page for the web app

```
  POST /file_upload
```

| Parameter | Type                  | Description                            |
| :-------- | :-------------------- | :------------------------------------- |
| `file`    | `multipart/form-data` | (optional) encoded data of file upload |
| `cap1`    | `multipart/form-data` | (optional) user caption                |
| `cap2`    | `multipart/form-data` | (optional) user caption                |
| `cap3`    | `multipart/form-data` | (optional) user caption                |
| `cap4`    | `multipart/form-data` | (optional) user caption                |
| `cap5`    | `multipart/form-data` | (optional) user caption                |

## Appendix

The project meets the following requirements -

#### Data Collection Page

- Design and development of a web app, which can be used for labelled data collection. ✅
- User can record/upload the audio, and play it back on web page. ✅
- User can write 1-5 captions for the audio, and save them. ✅
- Similar to the Clotho dataset, we restrict storage to only lossless file types. ✅

#### Demo Page

- In this web page user can record/upload the audio, and using the pre-trained model the prediction caption will be generated. (Model training in progress) ✅
- This predicted label can be shown on the web page. (In progress) ✅

## Notes

- The path separator on Windows is `\\` and on Linux is `/`
- The uploaded file details can be seen on the console

## Authors

- [@Arushi](https://github.ecodesamsung.com/arushi-jain2019)
- Navaneeth B R