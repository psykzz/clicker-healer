'use strict'

function UI() {
  this.config = config.display.ui
  this.skillData = [
    {
      name: "Heal",
      icon: loadImage("assets/skill0.jpg"),
      cooldown: 1,
      heal: 30,
      mana: 10,
    },
    {
      name: "Large heal",
      icon: loadImage("assets/skill1.jpg"),
      cooldown: 3,
      heal: 50,
      mana: 50,
    },
    {
      name: "Cure epidemic",
      icon: loadImage("assets/skill2.jpg"),
      cooldown: 6,
      heal: 50,
      mana: 50,
      aoe: true
    },
    {
      name: "Fortify - noop",
      icon: loadImage("assets/skill3.jpg"),
      cooldown: 0,
      heal: 0,
      mana: 0,
    }
  ]

  this.text = {
    enabled: false,
    message: '',
    size: '',
    color: '',
  }

  this.rect = {
    x: this.config.padding,
    y: height - (this.config.height + (this.config.padding * 3)),
    w: width - (this.config.padding * 2),
    h: this.config.height,
  }

  this.skills = []

  for(var i=0; i < 4; i++) {
    this.skills.push(new Skill(i, this.rect, this.skillData[i]))
  }

  this._drawText = () => {
    if(this.text.enabled) {
      push()
      textAlign(CENTER)
      textSize(this.text.size)
      fill(this.text.color)
      var a = text(this.text.message,
        this.rect.x + this.config.padding, this.rect.y + this.config.padding,
        this.rect.w - this.config.padding, 50)
      pop()
    }
  }
  this._resetText = () => {
    this.text.enabled = false
  }

  this.drawText = (message, timeout, color, size) => {
    timeout = timeout || 1000
    color = color || '#7A6'
    size = size || 32

    if(this.text.enabled) {
      return false;
    }
    this.text.enabled = true
    this.text.size = size
    this.text.color = color
    this.text.message = message

    this._drawText()
    setTimeout(() => {
      this._resetText()
    }, timeout)
  }

  this.draw = () => {
    var alivePlayers = fight.players.filter(p => p.alive())

    // handle selecting player
    if(mouseIsPressed) {
      alivePlayers.forEach(player => {
        if(player.collides(mouseX, mouseY)) {
          if(this.selectedPlayer) {
            this.selectedPlayer.selected = false
          }
          this.selectedPlayer = player
          this.selectedPlayer.selected = true
        }
      })
    }



    fill('#fff')
    rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h)

    this.skills.forEach(skill => skill.draw())
    this._drawText()
  }
}
