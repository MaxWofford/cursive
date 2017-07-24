'use strict'

const chaoticness = 5
const minThickness = 0.5

function init() {
  const root = document.querySelector('.root')
  const canvas = document.createElement('canvas')
  root.appendChild(canvas)

  window.onresize = function() {
    canvas.width = root.clientWidth
    canvas.height = root.clientHeight
  }
  window.onresize()

  const pen = new Pen(10, 10, canvas)
  pen.move()

  setInterval(() => {
    // If it's off the page we should bounce back onto it
    if (pen.position.x > canvas.width ||
        pen.position.x < 0 ||
        pen.position.y > canvas.height ||
        pen.position.y < 0) {
      var centerPoint = {
        x: canvas.width / 2,
        y: canvas.height / 2
      }
      pen.rotation = Math.atan2(centerPoint.y - pen.position.y, centerPoint.x - pen.position.x)
    }

    // Every second we'll change the direction the line is heading
    pen.targetDirection = (Math.random() - 0.5) * chaoticness
  }, 1000)
  setInterval(() => {
    pen.move()
  }, 10)
}

class Pen {
  constructor(x, y, canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')

    this.position = {}
    this.position.x = x
    this.position.y = y

    this.velocity = {}
    this.velocity.x = 0
    this.velocity.y = 0
    this.amplitude = 1

    this.rotation = 0.01 // this is the amount it rotates per tick
    this.targetDirection = 0 // this is the direction it tries to aim for

    this.size = 1
  }

  move() {
    this.rotation += (this.targetDirection - this.rotation) / 100
    this.velocity.x = Math.cos(this.rotation) * this.amplitude
    this.velocity.y = Math.sin(this.rotation) * this.amplitude

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.draw()
  }

  draw() {
    this.size = Math.max(Math.abs(this.rotation), minThickness)
    this.drawCircle(this.position.x, this.position.y, this.size)
    this.drawCircle(this.position.x, this.canvas.width - this.position.y, this.size)
    this.drawCircle(this.canvas.width - this.position.x, this.position.y, this.size)
    this.drawCircle(this.canvas.width - this.position.x, this.canvas.width - this.position.y, this.size)
  }

  drawCircle(x, y, size) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, size, 0, 2 * Math.PI, true);
    this.ctx.fill();
  }
}
