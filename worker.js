let canvas, scale, context, fft = [], duration, position

self.onmessage = function (event) {
  if (event.data.canvas) {
    canvas = event.data.canvas
    scale = event.data.scale
    context = canvas.getContext('2d')
    setup()
    self.postMessage('fft')
  } else if (event.data.fft) {
    fft = event.data.fft
    duration = event.data.duration
    position = event.data.position
    if (duration && position && duration > position)
      draw()

    let image = context.getImageData(0, 0, canvas.width, canvas.height)
    self.postMessage({ image: image })
  }
}

let padding = 40
let edge = 10
let gap = 20
let dimension = 0
let radius = 0

function setup() {
  dimension = Math.min(canvas.width, canvas.height)

  context.fillStyle = 'rgba(0,0,0,0)'
  context.fillRect(0,0,canvas.width, canvas.height)

  context.translate(canvas.width/2, canvas.height/2)

  radius = (dimension/2) - (edge/2) - gap - padding
  context.setTransform(1,0,0,1,0,0)
}

function map(value, start, end, newStart, newEnd) {
  return newStart + ((value - start) * (newEnd - newStart)) / (end - start)
}

let prevPosition = 0

function draw() {
  let drawTime = position - prevPosition
  prevPosition = position

  context.translate(canvas.width/2, canvas.height/2)
  context.rotate((2 * Math.PI) * (position / duration) - (Math.PI/2))

  let fftLength = (2 * fft.length) / 3
  for (let i = 0; i < fftLength; i++) {
    let amplitude = (255 - fft[i])
    let x = radius - (radius * (i / fftLength))

    let currentCircumference = 2 * Math.PI * x
    let segmentLength = currentCircumference / (duration * 1000)
    context.fillStyle = `rgba(${amplitude}, ${amplitude}, ${amplitude}, ${0.8})`

    context.beginPath()
    context.arc(x, 0, Math.max(2, segmentLength), 0, Math.PI * 2)
    context.fill()
  }

  context.setTransform(1,0,0,1,0,0)
}
