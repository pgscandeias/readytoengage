<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  margin: 1rem;
  background: #111;
  color: #ccc;
  font-family: Verdana, Arial, sans-serif;
  font-size: 16px;
}
a {
  color: #fff;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.nav {
  margin-bottom: 2rem;

  a {
    margin-right: 1rem;
    color: #999;
    font-size: 0.8rem;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
}
</style>
