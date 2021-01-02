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
// import ships from '@/engine/data/ships'
// import { uuidv4 } from '@/engine/uuidv4'
// import Ship from '@/engine/Ship'

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
    class Ship {
      name = null

      // Armor reduces damage received
      armor = 0

      static create (data) {
        const s = new Ship()
        s.name = data.name
        s.armor = data.armor

        return s
      }

      // Receive damage
      handleDamage (weapon) {
        // Factor in the armor
        let dmg = weapon.damage - this.armor
        dmg = dmg >= 0 ? dmg : 0

        console.log(`Receiving ${dmg} damage from ${weapon.name}`)
      }
    }

    class Weapon {
      name = null
      damage = 1

      static create (data) {
        const w = new Weapon()
        w.name = data.name
        w.damage = data.damage

        return w
      }

      // Fire on a target and have it handle damage
      fire (target) {
        target.handleDamage(this)
      }
    }

    const s = Ship.create({
      name: 'Adamastor',
      armor: 1
    })

    const w = Weapon.create({
      name: 'Light Kinetic Gun',
      damage: 1
    })

    w.fire(s)
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
