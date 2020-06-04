<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-secondary mb-3">
        <div class="container">
            <a @click.prevent="nothing" class="navbar-brand" href=""><i class="fas fa-shopping-basket ml-2"></i>  TOKO MURAH</a>
            <ul class="navbar-nav">
                <li v-show="isLogin" class="nav-item">
                    <a @click.prevent="goToHome" class="nav-link" href="#">HOME</a>
                </li>
                <li v-show="isLogin" class="nav-item">
                    <a @click.prevent="goToMyCart" class="nav-link" href="#">MY CART</a>
                </li>
                <li v-show="isLogin" class="nav-item">
                  <a @click.prevent="goToMyTransaction" class="nav-link" href="#">MY TRANSACTION</a>
                </li>
                <li v-show="!isLogin" class="nav-item">
                  <a @click.prevent="goToRegisterPage" class="nav-link" href="#">REGISTER</a>
                </li>
                <li v-show="!isLogin" class="nav-item">
                    <a @click.prevent="goToLoginPage" class="nav-link" href="#">LOGIN</a>
                </li>
                <li v-show="isLogin" class="nav-item">
                    <a @click.prevent="logout" class="nav-link" href="#">LOGOUT</a>
                </li>
            </ul>
        </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('changeLoginStatus', false)
      this.$router.push('/')
    },
    goToLoginPage () {
      this.$router.push('/login')
    },
    goToMyCart () {
      this.$router.push('/mycart')
    },
    goToHome () {
      this.$router.push('/')
    },
    goToRegisterPage () {
      this.$router.push('/register')
    },
    goToMyTransaction () {
      this.$router.push('/mytransaction')
    }
  }
}
</script>

<style>
  ul li {
    font-size: 1rem;
  }
</style>
