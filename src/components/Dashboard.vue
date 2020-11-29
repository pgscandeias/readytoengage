<template>
  <div>
    <div class="stats" v-if="games > 0">
      HS: {{ highscore }}
      G: {{ games }}
    </div>

    <ul v-if="ship.jumps > 0">
      <li>{{ ship.jumps }} jumps</li>
      <li>{{ ship.hull }}% hull</li>
      <li>{{ ship.fuel }}t fuel</li>
    </ul>

    <div v-if="!gameover">
      <div v-if="msg">
        {{ msg }}
      </div>

      <div class="mobs" v-if="ship.jumps > 0">
        <div v-if="area.hasMobs">
          <p v-if="!area.scanned">
            Your sensors pick up a drive signature

            <a href="#" @click.prevent="scanMobs" v-if="!area.scanned">scan</a>
          </p>

          <p v-else>
            {{ area.mobs.appearance }}
            {{ area.mobs.behaviour }}

            <a href="#" @click.prevent="attackMobs">
              <span v-if="ship.fighting">
                engage the enemy
              </span>

              <span v-else>
                ambush
              </span>
            </a>
          </p>
        </div>

        <p v-else>
          No other ships in the area.
        </p>
      </div>

      <p class="jump" v-if="!ship.fighting">
        <a href="#" @click.prevent="nextArea">activate jump drive</a>
      </p>
    </div>

    <div
      class="game-over"
      v-if="gameover"
    >
      {{ gameoverReason }}
      You managed {{ ship.jumps }} jumps.
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {
      msg: null,
      ship: {
        jumps: 0,
        hull: 100,
        fuel: 10,
        fighting: false
      },
      area: {}
    }
  },
  computed: {
    gameover () {
      const over = this.ship.fuel <= 0 || this.ship.hull <= 0

      if (over && this.ship.jumps > this.highscore) {
        window.localStorage.setItem('stats.highscore', this.ship.jumps)
      }

      if (over) {
        window.localStorage.setItem('stats.games', this.games + 1)
      }

      return over
    },
    gameoverReason () {
      if (this.ship.fuel <= 0) {
        return 'Your ship ran out of fuel.'
      } else if (this.ship.hull <= 0) {
        return 'Your ship was destroyed'
      }

      return null
    },
    highscore () {
      var hs = window.localStorage.getItem('stats.highscore')
      if (!hs) {
        hs = 0
      }

      return hs
    },
    games () {
      var gs = window.localStorage.getItem('stats.games')
      if (!gs) {
        gs = 0
      }

      return parseInt(gs)
    }
  },
  methods: {
    roll (range = 100) {
      return Math.floor(Math.random() * range)
    },

    coinFlip () {
      return Math.random() >= 0.5
    },

    resetArea () {
      this.area = {
        hasMobs: false,
        mobs: {
          appearance: null,
          behaviour: null,
          strength: 0
        },
        scanned: false
      }
    },

    // Replace current area with a randomly generated one
    nextArea () {
      this.msg = null
      this.ship.jumps++
      this.ship.fuel--

      this.resetArea()

      const probability = {
        mobs: 30,
        mobType: {
          armed: 80
        }
      }

      // Roll for mobs
      this.area.hasMobs = this.roll() >= probability.mobs
      if (this.area.hasMobs) {
        // Armed?
        if (this.roll() <= probability.mobType.armed) {
          this.area.mobs.strength = this.roll()
        }
      }
    },

    scanMobs () {
      const ms = this.area.mobs.strength
      var threat = false

      if (ms === 0) {
        this.area.mobs.appearance = 'Unarmed ship detected.'
      } else if (ms < this.ship.hull / 2) {
        this.area.mobs.appearance = 'Lightly defended ship detected.'
      } else if (ms < this.ship.hull) {
        this.area.mobs.appearance = 'Well defended ship detected.'
      } else if (ms >= this.ship.hull) {
        this.area.mobs.appearance = 'Combat ship detected.'
      }

      // Armed mobs might want to fight
      if (ms > 0) {
        threat = this.coinFlip()
        if (threat) {
          this.ship.fighting = true
          this.area.mobs.behaviour = "Your scan alerted them and they're on an intercept course."
        }
      }

      if (ms <= 0 || !threat) {
        this.area.mobs.behaviour = "They don't seem to have noticed your ship."
      }

      this.area.scanned = true
    },

    attackMobs () {
      var dmg = this.roll()
      if (dmg > this.area.mobs.strength) {
        dmg = this.area.mobs.strength
      }

      this.ship.hull = this.ship.hull - dmg
      this.area.hasMobs = false
      const salvagedFuel = this.roll(10)
      this.ship.fuel = this.ship.fuel + salvagedFuel

      if (this.ship.hull > 0) {
        this.msg = 'You neutralized the enemy vessel and salvaged ' + salvagedFuel + ' tons of fuel'
        this.ship.fighting = false
      }
    }
  },

  created () {
    this.msg = 'Ready to engage'
    this.resetArea()
  }
}
</script>

<style scoped lang="scss">
.stats {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>
