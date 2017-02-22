'use strict'

function Boss() {
  this.difficulty = 1 + (randInt(-5, 5) / 10)
  this.name = "#Boss"
  this.maxHealth = 100
  this.health = this.maxHealth

  this.config = config.display.boss
  this.pos = {
    x: this.config.padding,
    y: this.config.padding,
  }
  this.size = {
    w: width - (this.config.padding * 2),
    h: this.config.height - (this.config.padding * 2)
  }

  this.damage = dmg => {
    this.health -= dmg
    this.health = Math.max(0, this.health)
  }
  this.alive = () => this.health !== 0

  this.draw = () => {
    this.rect = rect(this.pos.x,this.pos.y,
      this.size.w, this.size.h)

    // Name display
    push()
    fill(50);
    strokeWeight(0);
    textSize(16);
    textStyle(NORMAL);
    this.text = text(this.name, this.pos.x + 5, this.pos.y + 20)
    pop()

    push()
    // Health background
    fill('#700');
    this.hpRect = rect(this.pos.x, this.pos.y + this.size.h/2, this.size.w, this.size.h/2)
    // HP actual
    fill('#F00');
    var hpSize = ((this.health / this.maxHealth) * this.size.w)
    this.hpRect = rect(this.pos.x, this.pos.y + this.size.h/2, hpSize, this.size.h/2)

    pop()
  }
}
