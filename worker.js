let canvas, context, fft = [], duration, position

self.onmessage = function (event) {
  if (event.data.canvas) {
    canvas = event.data.canvas
    context = canvas.getContext('2d')
    setup()
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

let edge = 5
let gap = 7
let dimension = 0
let radius = 0

function setup() {
  dimension = Math.min(canvas.width, canvas.height)

  context.fillStyle = 'rgb(0,0,0)'
  context.fillRect(0,0,canvas.width, canvas.height)

  context.translate(canvas.width/2, canvas.height/2)

  context.strokeStyle = 'rgb(255,255,255)'
  context.lineWidth = edge
  context.beginPath()
  context.arc(0, 0, (dimension/2) - (edge/2), 0, Math.PI * 2)
  context.stroke();

  radius = (dimension/2) - (edge/2) - gap
}

function map(value, start, end, newStart, newEnd) {
  return newStart + ((value - start) * (newEnd - newStart)) / (end - start)
}

function draw() {
  context.translate(canvas.width/2, canvas.height/2)

  context.rotate((2 * Math.PI) * (position / duration))

  for (let i = 0; i < fft.length; i++) {
    let amplitude = (255 - fft[i])
    let x = radius - (radius * (i / fft.length))
    context.fillStyle = `rgba(${amplitude}, ${amplitude}, ${amplitude}, 0.5)`
    context.beginPath()
    context.arc(x, 0, map(x, 0, radius, .2, 1), 0, Math.PI * 2)
    context.fill()
  }

  context.setTransform(1,0,0,1,0,0)
}
