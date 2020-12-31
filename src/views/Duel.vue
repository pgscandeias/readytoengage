<template>
  <div class="duel">
    <div class="card player">
      <p>Player</p>
      <p>
        {{ player.name }}
      </p>
    </div>

    <div class="card mob">
      <p>Mob</p>
      <p>
        {{ mob.name }}
      </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ships from '@/engine/data/ships'
import { uuidv4 } from '@/engine/uuidv4'
import Ship from '@/engine/Ship'

export default {
  name: 'Duel',
  components: {
  },
  data () {
    return {
      player: {},
      mob: {}
    }
  },
  created () {
    console.log(ships.transport.model)
    console.log(uuidv4())

    this.player = Ship.create()
  }
}
</script>

<style scoped lang="scss">
.duel {
  padding: 1rem;
  display: inline-block;

  .card {
    display: block;
    float: left;
    padding: 0 1rem;
    margin-right: 1rem;
  }
  .card:last-child {
    margin-right: 0;
  }
}
</style>
