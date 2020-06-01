<template>
  <div class=" container homepage">
      <img src="../assets/Login Image.png" alt="" class="ml-3">
      <div @submit.prevent="submitLogin" class="form-container">
        <h2 class="text-center mt-1"><i class="fas fa-dice-d20 ml-2"></i> LOGIN</h2>
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
          this.$router.push('/dashboard')
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
  .form-container {
    width: 350px;
    margin: auto;
    margin-left: 150px;
    border: solid black 1px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .homepage {
    display: flex;
    margin-top: 100px;
    margin-bottom: 70px;
  }
  h2 {
    font-family: 'Oswald';
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
  }
</style>
