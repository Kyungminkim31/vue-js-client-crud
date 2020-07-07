<template>
  <v-card >
    <v-card-title >
      <h3>사용자 등록</h3>
    </v-card-title>
    <v-card-text>
      <v-form class="px-3" ref="form">
        <v-text-field
          label="username"
          v-model="user.name"
          name="username"></v-text-field>
        <v-text-field
          label="email"
          v-model="user.email"
          name="email"></v-text-field>
        <v-text-field
            autocomplete="current-password"
            :append-icon=" doShow ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="()=>(doShow = !doShow)"
            :type="doShow ? 'text' : 'password'"
            label="password"
            v-model="user.password" ></v-text-field>
      </v-form>
      <v-btn class="success" @click="handleRegister" :loading="loading">
          사용자 등록
          </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import User from '../models/user';
export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', ''),
      loading: false,
      message: '',
      doShow: false
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if(this.loggedIn){
      this.$router.push('/profile');
    }
  },
  methods: {
   handleRegister() {
      this.message = '';
      this.loading = true;
      this.$validator.validate().then( isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              console.log(data);
              this.message = data.message;
              this.loading= false;
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.loading = false;
            }
          );
        }
      });
    }
  }
}
</script>

