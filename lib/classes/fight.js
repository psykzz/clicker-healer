'use strict'

function Fight(playerCount) {
  playerCount = Math.min(playerCount, config.game.maxPlayers)

  this.selectedPlayer = null

  this.players = []
  this.boss = new Boss()

  for(var i = 0; i < playerCount; i++) {
    this.players.push(new Player(i))
  }

  this.draw = () => {

    var alivePlayers = this.players.filter(p => p.alive())
    if(alivePlayers.length === 0) {
      activeScreen = new LoseScreen()
      return; //GAME OVER
    }
    if(!this.boss.alive()) {
      activeScreen = new WinScreen()
      return
    }

    // players do dmg first
    alivePlayers.forEach(player => {
      if(randInt(0, 100) > 1) {
        return;
      }

      var dmg = randInt(0, 2)
      this.boss.damage(dmg + dmg * ((this.boss.difficulty - 1) * -1))
    })

    // Calculate dmg
    if(randInt(0, 100) < 10) {
      alivePlayers.forEach(player => {
        if(randInt(0, 100) < 15) {
          player.damage(randInt(5, 15))
        }
      })
    }
    flatten([this.players, this.boss]).forEach(drawable => drawable.draw())
  }
}
