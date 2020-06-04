<template>
  <div>
    <a @click.prevent="goToHome" href="" class="nav-link">
      <i class="fas fa-arrow-alt-circle-left ml-2 mt-2 fa-3x"></i>
    </a>
    <h2 class="text-center mt-2 text-primary"> TOKO MURAH</h2>
    <div class="homepage container">
      <img src="../assets/Shopping Cart.png" alt="" class="ml-3">
      <div @submit.prevent="submitLogin" class="form-container">
        <h2 class="text-center mt-1"> REGISTER</h2>
        <form action="" class="mt-4">
            <div class="form-group">
                <input type="text" name="email" placeholder="email" class="form-control" v-model="email">
            </div>
            <div class="form-group">
                <input type="password" name="password" placeholder="password" class="form-control" v-model="password">
                <div clas="mt-2" v-html="feedback"></div>
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
import Swal from 'sweetalert2'
export default {
  name: 'Home',
  data () {
    return {
      email: '',
      password: '',
      feedback: null
    }
  },
  methods: {
    goToHome () {
      this.$router.push('/')
    },
    submitLogin () {
      axios.post('http://localhost:3000/users/register', {
        email: this.email,
        password: this.password
      })
        .then(response => {
          Swal.fire(
            'Good job!',
            'Succsessfully Register!',
            'success'
          )
          this.$router.push('/login')
        })
        .catch(err => {
          err = err.response
          const { data } = err
          if (typeof data.message === 'object') {
            const error = data.message
            this.feedback = []
            for (let i = 0; i < error.length; i++) {
              const temp = `<p>${error[i].message}</p>`
              this.feedback.push(temp)
            }
          } else {
            console.log('hehe')
            const error = data.message
            this.feedback = `<p>${error}</p>`
          }
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
