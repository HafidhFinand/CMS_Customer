<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    checkLoginStatus () {
      if (localStorage.token) {
        this.$store.commit('changeLoginStatus', true)
      }
    }
  },
  created () {
    this.$store.dispatch('fetchListProducts')
    this.checkLoginStatus()
  }
}
</script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  body {
    font-family: 'Roboto', sans-serif;
  }
</style>
