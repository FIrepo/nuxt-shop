<template>
    <div class="app flex-row align-items-center">
        <div class="login-container">
            <div class="card-group">
                <div class="card p-4">
                    <div class="card-body"><h1>Login</h1>
                        <p class="text-muted">Sign In to your account</p>
                        <div role="group" class="input-group mb-3">
                            <div class="input-group-prepend"><span class="input-group-text"><i
                                    class="fa fa-envelope-o"></i></span></div>
                            <input type="text" placeholder="Email" class="form-control" v-model="email"></div>
                        <div role="group" class="input-group mb-4">
                            <div class="input-group-prepend"><span class="input-group-text"><i
                                    class="fa fa-lock"></i></span></div>
                            <input type="password" placeholder="Password" class="form-control" v-model="password"></div>
                        <div class="row">
                            <div class="col-6">
                                <button type="button" class="btn px-4 btn-primary" @click="login">Login</button>
                            </div>
                            <div class="text-right col-6">
                                <button type="button" class="btn px-0 btn-link">Forgot password?</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'login',
    head () {
      return {
        title: 'Login'
      }
    },
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      async login () {
        const response = await this.$axios.$post('auth/login', {
          email: this.email,
          password: this.password
        })
        if (response.messageCode === 'success') {
          let userData = response.data
          this.$store.dispatch('setUser', userData)
          this.$nuxt.$router.replace({path: '/admin'})
        }
      }
    }
  }
</script>

<style scoped>
    .app {
        height: 100vh;
        background: #7f828b;
    }

    .login-container {
        position: relative;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        max-width: 400px;
        margin: 0 auto;
        text-align: center;
    }
</style>