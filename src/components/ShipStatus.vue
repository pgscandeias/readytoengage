<template>
  <div>
    <ul class="ship-status">
      <li>{{ ship.jumps }} jumps</li>
      <li>{{ ship.hull }} hull integrity</li>
      <li>{{ ship.guns }} {{ ship.guns === 1 ? 'gun' : 'guns' }}</li>
      <li>{{ ship.fuel }}t fuel</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ShipStatus',
  props: ['ship']
}
</script>

<style scoped lang="scss">
.ship-status {
  margin-left: 0;
  padding-left: 0;

  li {
    list-style: none;
  }
}
</style>
