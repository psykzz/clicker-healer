'use strict'

function Skill(position, parentRect, skillInfo) {
  this.skillInfo = skillInfo
  this.config = config.display.ui.skill
  this.cooldown = 0
  this.globalCooldown = 0

  var leftOverSpace = parentRect.w - ((this.config.width * 4) + (this.config.padding * 6))
  this.pos = {
    x: (leftOverSpace / 2) + ((this.config.width + (this.config.padding * 2)) * position),
    y: (parentRect.y + parentRect.h - this.config.height) - this.config.padding,
    w: this.config.width,
    h: this.config.height
  }

  this.collides = (x, y) => {
    return (x > this.pos.x && x < this.pos.x + this.pos.w &&
      y > this.pos.y && y < this.pos.y + this.pos.h)
  }

  this.cast = () => {
    this.cooldown = this.skillInfo.cooldown
    ui.skills.map(skill => skill.globalCooldown = 1)
    ui.drawText(this.skillInfo.name)

    fight.players.forEach(player => {
      if(!this.skillInfo.aoe && !player.selected) {
        return;
      }
      player.heal(this.skillInfo.heal)
    })
  }

  this.draw = () => {
    this.globalCooldown = Math.max(0, this.globalCooldown - timeDelta)
    this.cooldown = Math.max(0, this.cooldown - timeDelta)
    if(this.cooldown == 0 && this.globalCooldown == 0 && mouseIsPressed) {
      if (this.collides(mouseX, mouseY)) {
        this.cast();
      }
    }

    rect(this.pos.x, this.pos.y, this.pos.w, this.pos.h)
    push()
    if(this.globalCooldown > 0) {
      tint(255, 128)
    }
    if(this.cooldown > 0) {
      tint(0, 64)
    }
    image(this.skillInfo.icon, this.pos.x, this.pos.y, this.pos.w, this.pos.h)
    pop()
  }
}
