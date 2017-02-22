'use strict'

function Player(position) {
  this.name = `Player #${position}`
  this.maxHealth = 100
  this.health = this.maxHealth

  // They can attack once per second
  this.lastAttack = 1

  this.config = config.display.player

  var maxPerLine = Math.floor(config.screen.width / (this.config.width + this.config.hPadding * 2))

  var xOffset = this.config.hPadding * (position % maxPerLine)
  var yOffset = this.config.height * ((position < maxPerLine) ? 0 : Math.floor(position / maxPerLine))

  this.pos = {
    x: this.config.hPadding + (this.config.width * (position % maxPerLine)) + xOffset,
    y: this.config.startX + (this.config.vPadding * Math.floor(position / maxPerLine)) + yOffset
  }
  this.size = {w: this.config.width, h: this.config.height}

  this.selected = false

  this.damage = dmg => {
    if(this.lastAttack !== 0) {
      return
    }
    this.health -= dmg
    this.health = Math.max(0, this.health)
  }
  this.heal = dmg => {
    if(this.health === 0) {
      return; // unable to heal someoen dead.
    }
    this.health += dmg
    this.health = Math.min(this.maxHealth, this.health)
  }
  this.alive = () => this.health !== 0

  this.collides = (x, y) => {
    return (x > this.pos.x && x < this.pos.x + this.size.w &&
      y > this.pos.y && y < this.pos.y + this.size.h)
  }
  this.draw = () => {
    // Handle timers
    this.lastAttack = Math.max(0, this.lastAttack - timeDelta)


    push()
    ;(this.selected) ? stroke('#fff') : noStroke()
    fill('#999')
    this.rect = rect(this.pos.x, this.pos.y, this.size.w, this.size.h)
    pop()

    push()
    // Name display
    fill(200);
    strokeWeight(0);
    textSize(11);
    textStyle(NORMAL);
    this.text = text(this.name, this.pos.x, this.pos.y - 3)
    pop()

    push()
    // HEalth background
    fill('#700');
    this.hpRect = rect(this.pos.x, this.pos.y + this.size.h/2, this.size.w, this.size.h/2)
    // HP actual
    fill('#F00');
    var hpSize = ((this.health / this.maxHealth) * this.size.w)
    this.hpRect = rect(this.pos.x, this.pos.y + this.size.h/2, hpSize, this.size.h/2)

    pop()
  }
}
