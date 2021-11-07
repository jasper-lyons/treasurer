let canvas, context, fft = [], duration, position

self.onmessage = function (event) {
  if (event.data.canvas) {
    canvas = event.data.canvas
    context = canvas.getContext('2d')
    self.postMessage('fft')
  } else if (event.data.fft) {
    fft = event.data.fft
    duration = event.data.duration
    position = event.data.position
    if (duration && position)
      draw()

    let image = context.getImageData(0, 0, canvas.width, canvas.height)
    self.postMessage({ image: image })
  }
}

function draw() {
  for (let i = 0; i < fft.length; i++) {
    let amplitude = fft[i]
    let x = (position / duration) * canvas.width
    let y = canvas.height - ((i / fft.length) * canvas.height)
    context.strokeStyle = `rgb(${amplitude}, ${amplitude}, ${amplitude})`
    context.fillStyle = `rgb(${amplitude}, ${amplitude}, ${amplitude})`
    context.fillRect(x, y, canvas.width / duration, canvas.height / fft.length)
  }
}
