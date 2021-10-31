// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const electron = require('electron')
const { desktopCapturer } = require('electron')
const $ = require('jquery')

var captureScreens = () => {
  desktopCapturer.getSources({
    types: ['screen', 'window'],
    thumbnailSize: {
      width: 320,
      height: 240
    }}, (error, sources) => {
    if (error) console.error(error)

    sources.forEach((source) => {
      navigator.mediaDevices.getUserMedia({
        audio: {
          mandatory: {
            chromeMediaSource: 'desktop'
          }
        },
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            minWidth: 640,
            maxWidth: 640,
            minHeight: 320,
            maxHeight: 320
          }
        }
      }).catch((error) => console.error(error))
    })
  })
}

document.getElementById('captureScreens').onclick = captureScreens
