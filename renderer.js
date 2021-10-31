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
      })
      .then((stream) => {
        //Without the below lines of code, the project gets confused and refuses to intake the audio inputs correctly.
        const screenVideos = document.getElementById('screenVideos')
        const video = document.createElement('video')
        screenVideos.appendChild(video)
        video.srcObject = stream
        video.onloadedmetadata = () => {
          video.play()
        }
      })
      .catch((error) => console.error(error))
    })
    const displays = electron.screen.getAllDisplays()
    displays.forEach((display) => {
      const size = display.size
      screenInfo.textContent += `${display.id} (${size.width} x ${size.height}), `
    })
  })
}

document.getElementById('captureScreens').onclick = captureScreens
