'use strict'

// Game state
var activeScreen, fight, ui
var timeDelta = 1 / config.game.frameRate
function setup() {
  config.screen.width = windowWidth
  config.screen.height = windowHeight
  createCanvas(windowWidth, windowHeight)

  background(0)
  frameRate(config.game.frameRate)

  activeScreen = new StartScreen()

}
function windowResized() {
  config.screen.width = windowWidth
  config.screen.height = windowHeight
  resizeCanvas(windowWidth, windowHeight)
}

function mousePressed() {
  if(activeScreen && activeScreen.type === 'start') {
    // var fs = fullscreen();
    // fullscreen(!fs);
    activeScreen = null
    fight = new Fight(4)
    ui = new UI()
  }
}

function draw() {
  background(0)

  var fps = Math.round(getFrameRate())
  fill('#fff')
  text(`FPS: ${fps}`, width - 50 , height - 10)

  if(activeScreen) {
    activeScreen.draw()
  }
  else {
    fight.draw()
    ui.draw()
  }


}
