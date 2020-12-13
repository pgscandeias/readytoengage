<template>
  <div class="bridge">
    <!-- Status -->
    <div class="status">
      j: {{ status.jumps }}
      f: {{ status.fuel }}
    </div>

    <!-- Ships in range -->
    <p>
      <span>
        Ships in range: {{ area.ships.length }}
      </span>
    </p>
    <ul>
      <li v-for="(s, k) in area.ships" :key="k">
        {{ s }}
      </li>
    </ul>

    <!-- Jump button -->
    <div>
      <a href="#" v-if="canJump" @click.prevent="jump">activate jump drive</a>
    </div>
  </div>
</template>

<script>
import Area from '../engine/Area'

export default {
  name: 'Bridge',

  data () {
    return {
      status: {
        jumps: 0,
        fuel: 10,
        hp: 10
      },
      area: {
        ships: []
      }
    }
  },

  computed: {
    canJump () {
      return this.status.fuel > 0
    }
  },

  methods: {
    jump () {
      this.status.jumps++

      // Logic
      const area = new Area()
      this.area.ships = area.generateShips()
    }
  },

  created () {
  }
}
</script>

<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
