<template>
<v-row>
  <v-col align="center" mb="12" class="mt-16">
    <v-card max-width="400px">
      <v-card-title class="justify-center text-uppercase">
        <span class="light-blue--text text--lighten-2">Vision</span>
        <span class="light-blue--text text--darken-4">Connect</span>
      </v-card-title>
      <v-card-subtitle class="mt-1">
        <span 
          class="grey--text"
        > 
            이메일과 암호를 입력하여 로그인 하세요.
        </span>
      </v-card-subtitle>
      <v-card-text class="">
        <v-form ref="form">
          <v-text-field
            label="이메일"
            v-model="user.email"
            name="username" ></v-text-field>
          <v-text-field
            autocomplete="current-password"
            :append-icon=" doShow ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="()=>(doShow = !doShow)"
            :type="doShow ? 'text' : 'password'"
            label="암호"
            v-model="user.password" ></v-text-field>
        </v-form>
        <v-alert 
          :value="alert"
          dense
          outlined
          type="error"
          transition="fade-transition"
        >
          {{this.message}}
        </v-alert>        
        <v-btn
          block
          color="primary"
          @click="handleLogin" 
          :loading="loading"
        >
          로그인하기
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
      user: new User('', '', ''),
      loading: false,
      message: '',
      doShow: false,
      alert: false
    };
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
            ()=>{ // success
              this.$router.push('/profile');
            },
            () => { // error
              this.loading = false;
              this.message = "입력하신 이메일과 암호가 맞지 않습니다.";
              this.alert = true;
              setTimeout(()=>{
                this.alert=false
              },4000);
            }
          );
        }
      });
    }
  }
};
</script>