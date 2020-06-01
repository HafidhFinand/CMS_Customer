<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-secondary mb-3">
        <div class="container">
            <a @click.prevent="nothing" class="navbar-brand" href=""><i class="fas fa-stethoscope ml-2"></i> Hacktiv-19</a>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a @click.prevent="goToDashboard" class="nav-link" href="#">COUNTRIES</a>
                </li>
                <li class="nav-item">
                    <a @click.prevent="goToLoginPage" class="nav-link" href="#">LOGIN</a>
                </li>
                <li class="nav-item">
                    <a @click.prevent="logout" class="nav-link" href="#">LOGOUT</a>
                </li>
            </ul>
        </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('changeLoginStatus', false)
      this.$router.push('/')
    },
    goToLoginPage () {
      this.$router.push('/login')
    }
  }
}
</script>

<style>
    ul li {
        font-size: 1rem;
    }
</style>
