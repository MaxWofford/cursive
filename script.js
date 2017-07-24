'use strict'

const acceleration = 10

function init() {
  const root = document.querySelector('.root')
  const canvas = document.createElement('canvas')
  root.appendChild(canvas)

  window.onresize = function() {
    canvas.width = root.clientWidth
    canvas.height = root.clientHeight
  }
  window.onresize()

  const dot = new Pen(10, 10, canvas)
  dot.move()

  setInterval(() => {
    var newDirection = Math.random() - 0.5
    if (dot.position.x > canvas.width ||
        dot.position.x < 0 ||
        dot.position.y > canvas.height ||
        dot.position.y < 0) {
      var centerPoint = {
        x: canvas.width / 2,
        y: canvas.height / 2
      }
      newDirection = Math.atan2(dot.position.y - centerPoint.y, dot.position.x, centerPoint.x)
    }
    dot.setDirection(newDirection)
    console.log(dot.targetDirection)
  }, 1000)
  setInterval(() => {
    dot.move()
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

    this.rotation = Math.random() * 360
    this.direction = 0.01
    this.targetDirection = 0

    this.size = 1
  }

  setDirection(dir) {
    this.targetDirection = dir
  }

  move() {
    this.direction += (this.targetDirection - this.direction) / 100
    this.rotation += Math.random() * this.direction
    this.velocity.x = Math.cos(this.rotation) * this.amplitude
    this.velocity.y = Math.sin(this.rotation) * this.amplitude

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.draw()
  }

  draw() {
    this.ctx.fillRect(this.position.x, this.position.y, this.size, this.size)
    this.ctx.fillRect(this.position.x, this.canvas.width - this.position.y, this.size, this.size)
    this.ctx.fillRect(this.canvas.width - this.position.x, this.position.y, this.size, this.size)
    this.ctx.fillRect(this.canvas.width - this.position.x, this.canvas.width - this.position.y, this.size, this.size)
  }
}
