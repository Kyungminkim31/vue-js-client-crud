<template>
<v-row>
  <v-col align="center" mb="12" class="mt-16">
    <v-card max-width="480px">
      <v-card-text class="grey--text--darken3">
        <h4>Log In To VisionConnect</h4>
      </v-card-text>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field
            label="email"
            v-model="user.email"
            name="username" ></v-text-field>
          <v-text-field
            autocomplete="current-password"
            :append-icon=" doShow ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="()=>(doShow = !doShow)"
            :type="doShow ? 'text' : 'password'"
            label="password"
            v-model="user.password" ></v-text-field>
        </v-form>
        <v-btn class="success" @click="handleLogin" :loading="loading">
          로그인 하기
        </v-btn>
      </v-card-text>
    </v-card>
  </v-col>
</v-row>
</template>

<script>
import User from '../models/user';

export default {
  name:'Login',
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: '',
      doShow: false
    };
  },
  computed: {
    loggedIn(){
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if(this.loggedIn){
      this.$router.push('/profile');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if(!isValid){
          this.loading = false;
          return;
        }

        if(this.user.email && this.user.password){
          this.$store.dispatch('auth/login', this.user).then(
            ()=>{
              this.$router.push('/profile');
            },
            error => {
              this.loading = false;
              this.message = 
                (error.response && error.response.date) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    }
  }
};
</script>