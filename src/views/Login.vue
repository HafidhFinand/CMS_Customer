<template>
  <div>
    <a @click.prevent="goToHome" href="" class="nav-link">
      <i class="fas fa-arrow-alt-circle-left ml-2 mt-2 fa-3x"></i>
    </a>
    <h2 class="text-center text-primary"> TOKO MURAH</h2>
    <div class=" container homepage">
      <img src="../assets/web shopping.png" alt="" class="ml-3">
      <div @submit.prevent="submitLogin" class="form-container">
        <h2 class="text-center "> LOGIN</h2>
        <form action="" class="mt-4">
            <div class="form-group">
                <input type="text" name="email" placeholder="email" class="form-control" v-model="email">
            </div>
            <div class="form-group">
                <input type="password" name="password" placeholder="password" class="form-control" v-model="password">
                <div v-html="feedback"></div>
            </div>
            <div class="btn-login">
              <button type="submit" class="btn btn-danger">Submit</button>
            </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {
      email: '',
      password: '',
      feedback: ''
    }
  },
  methods: {
    goToHome () {
      this.$router.push('/')
    },
    submitLogin () {
      axios.post('http://localhost:3000/users/login', {
        email: this.email,
        password: this.password
      })
        .then(response => {
          const { data } = response
          const token = data.Token
          localStorage.setItem('token', token)
          this.$store.commit('changeLoginStatus', true)
          this.$router.push('/')
        })
        .catch(err => {
          err = err.response
          const { data } = err
          const error = data.message
          this.feedback = `<p>${error}</p>`
        })
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Piedra&display=swap');
  h2 {
    font-family: 'Piedra', cursive;
    font-size: 4rem !important;
  }
  .form-container {
    width: 350px;
    margin: auto;
    margin-left: 150px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .homepage {
    display: flex;
    margin-top: 100px;
    margin-bottom: 70px;
  }
  .homepage h2 {
    font-family: 'Oswald';
    font-size: 2rem !important;
  }
  .btn-login {
    display: flex;
    justify-content: center;
  }
  .btn-login .btn {
    width: 100vw;
    border-radius: 20px;
  }
  img {
    margin-left: 200px;
    width: 500px;
    height: 420px;
  }
</style>
