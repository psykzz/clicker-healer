function Screen(message) {
  this.draw = () => {
    push()
    textAlign(CENTER, CENTER)
    textSize(32)
    fill('#fff')
    text(message, 0, 0, width, height)
    pop()
  }
}

function StartScreen() {
  this.screen = new Screen("Click to start...")
  this.type = "start"
  this.draw = () => {
    this.screen.draw()
  }
}
function WinScreen() {
  this.screen = new Screen("You won!\nRestart to play again")
  this.type = "win"
  this.draw = () => {
    this.screen.draw()
  }
}
function LoseScreen() {
  this.screen = new Screen("You died!\nRestart to try again")
  this.type = "lose"
  this.draw = () => {
    this.screen.draw()
  }
}
