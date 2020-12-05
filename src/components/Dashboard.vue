<template>
  <div>
    <div v-if="!gameover">

      <ShipStatus :ship="ship"  v-if="ship.jumps > 1"/>

      <div v-if="msg">
        {{ msg }}
      </div>

      <div class="mobs" v-if="ship.jumps > 0">
        <div v-if="area.hasMobs">
          <p v-if="!area.scanned">
            Your sensors picked up a drive signature

            <br />
            <a href="#" @click.prevent="scanMobs" v-if="!area.scanned">scan</a>
          </p>

          <p v-else>
            {{ area.mobs.appearance }}
            {{ area.mobs.behaviour }}

            <br />

            <a href="#" @click.prevent="attackMobs">
              <span v-if="ship.fighting">
                battle stations
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

    <div class="game-over" v-if="gameover">
      {{ gameoverReason }}
      You managed {{ ship.jumps }} jumps.
    </div>

    <div class="stats" v-if="stats.games > 0">
      HS:{{ stats.highscore }} G:{{ stats.games }} K:{{ stats.kills }}
    </div>
  </div>
</template>

<script>
import ShipStatus from './ShipStatus'
import shipTypes from './shipTypes'

export default {
  name: 'Dashboard',
  components: { ShipStatus },
  data () {
    return {
      msg: null,
      ship: {
        jumps: 0,
        hull: 100,
        fuel: 10,
        fighting: false,
        guns: 1
      },
      area: {},
      stats: {
        highscore: 0,
        games: 0,
        kills: 0
      }
    }
  },
  computed: {
    gameover () {
      return this.ship.fuel <= 0 || this.ship.hull <= 0
    },
    gameoverReason () {
      if (this.ship.fuel <= 0) {
        return "You ran out of fuel. It's only a matter of time until they find you now."
      } else if (this.ship.hull <= 0) {
        return "Your ship was destroyed. At least they can't catch you anymore."
      }

      return null
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
        mob: {},
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
      if (this.gameover) {
        this.endTurn()
        return
      }
      this.resetArea()

      // Special story points
      switch (this.ship.jumps) {
        case 1:
          this.msg = `
            The orbital shipyards disappear from view as you step out of the
            space-time continuum and materialize elsewhere.
            Jumping away bought you some time.
          `
          break

        default:
          break
      }

      // Roll for mobs?
      if (this.ship.jumps <= 2) {
        return
      }

      // Must roll this number or higher to get this kind of mob.
      // But if the roll is higher than the next tier, then gets that tier.
      const mobOdds = {
        freighter: 20,
        gunboat: 50,
        transport: 80
      }

      // Pick mob type
      const r = this.roll()
      var mobType = null
      console.log('rolled a ' + r)
      for (const mt in mobOdds) {
        if (r >= mobOdds[mt]) {
          mobType = mt
        }
      }
      if (mobType) {
        this.area.hasMobs = true
        this.area.mob = {
          type: mobType,
          name: shipTypes[mobType].name,
          guns: shipTypes[mobType].guns
        }
      }
      console.log(mobType + ' present')
      console.log(this.area.mob)
    },

    scanMobs () {
      this.area.mobs.appearance = this.area.mob.name + ' detected.'
      this.area.scanned = true
    },

    attackMobs () {
      var dmg = this.roll()
      if (dmg > this.area.mobs.strength) {
        dmg = this.area.mobs.strength
      }

      this.ship.hull = this.ship.hull - dmg
      this.area.hasMobs = false

      if (this.ship.hull > 0) {
        const salvagedFuel = this.roll(10)
        this.ship.fuel = this.ship.fuel + salvagedFuel

        this.msg =
          'You neutralized the enemy vessel and salvaged ' +
          salvagedFuel +
          ' tons of fuel'
        this.ship.fighting = false

        this.stats.kills++
      }

      this.endTurn()
    },

    endTurn () {
      if (this.gameover) {
        if (this.ship.jumps > this.stats.highscore) {
          this.stats.highscore = this.ship.jumps
        }

        this.stats.games++

        console.log('Game over', this.stats)

        window.localStorage.setItem('stats', JSON.stringify(this.stats))
      }
    }
  },

  created () {
    this.msg = 'Ready to engage'
    this.resetArea()

    const lsStats = window.localStorage.getItem('stats')
    if (lsStats) {
      const savedStats = JSON.parse(lsStats)
      this.stats = {
        highscore: parseInt(savedStats.highscore),
        games: parseInt(savedStats.games),
        kills: parseInt(savedStats.kills)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.stats {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  color: #999;
}
</style>
