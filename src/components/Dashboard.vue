<template>
  <div class="hello">
    <ul v-if="ship.jumps > 0">
      <li>Jumps {{ ship.jumps }}</li>
      <li>Hull {{ ship.hull }}</li>
      <li>Fuel {{ ship.fuel }}</li>
    </ul>

    <div
      class="game-over"
      v-if="gameover"
    >
      {{ gameoverReason }}
    </div>

    <div v-else>
      <div v-if="msg">
        {{ msg }}
      </div>

      <div class="mobs" v-if="ship.jumps > 0">
        <p v-if="area.mobs">
          Your sensors detect other ships in the area.
          <a href="#" @click.prevent="scanMobs" v-if="!area.scanned">scan</a>
          &nbsp;
          <a href="#" @click.prevent="attackMobs">
            <span v-if="ship.fighting">
              engage the enemy
            </span>

            <span v-else>
              ambush
            </span>
          </a>
        </p>
        <p v-else>
          No other ships in the scanners.
        </p>
      </div>

      <p v-if="!ship.fighting">
        <a href="#" @click.prevent="nextArea">activate jump drive</a>
      </p>

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
      return this.ship.fuel <= 0 || this.ship.hull <= 0
    },
    gameoverReason () {
      if (this.ship.fuel <= 0) {
        return 'Your ship ran out of fuel.'
      } else if (this.ship.hull <= 0) {
        return 'Your ship was destroyed'
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
        mobs: false,
        mobStrength: 0,
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
        mobs: 50,
        mobType: {
          unarmed: 30,
          armed: 70
        }
      }

      // Roll for mobs
      this.area.mobs = this.roll() >= probability.mobs
      if (this.area.mobs) {
        // Armed?
        if (this.roll() >= probability.mobType.armed) {
          this.area.mobStrength = this.roll()
        }
      }
    },

    scanMobs () {
      const ms = this.area.mobStrength

      if (ms === 0) {
        this.msg = 'Unarmed ship detected.'
      } else if (ms < this.ship.hull / 2) {
        this.msg = 'Lightly defended ship detected.'
      } else if (ms < this.ship.hull) {
        this.msg = 'Well defended ship detected.'
      } else if (ms >= this.ship.hull) {
        this.msg = 'Combat ship detected.'
      }

      // Armed mobs might want to fight
      if (ms > 0) {
        const threat = this.coinFlip()
        console.log(threat)
        if (threat) {
          this.ship.fighting = true
          this.msg = this.msg + " Your scan alerted them and they're on an intercept course."
        }
      }

      this.area.scanned = true
    },

    attackMobs () {
      var dmg = this.roll()
      if (dmg > this.area.mobStrength) {
        dmg = this.area.mobStrength
      }

      this.ship.hull = this.ship.hull - dmg
      this.area.mobs = false
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
</style>
