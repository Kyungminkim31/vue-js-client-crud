<template>
  <v-row>
    <v-col align="center" mb="12" class="mt-16">
      <v-card max-width="400px" class="p-4">
        <v-responsive :aspect-ratio="4/3">
          <v-card-title class="justify-center text-uppercase">
            <span class="light-blue--text text--lighten-2">Vision</span>
            <span class="light-blue--text text--darken-4">Connect</span>
          </v-card-title>
          <v-card-text class="">
            <v-form ref="form">
              <v-text-field
                autocomplete=""
                label="사용자 이름"
                v-model="user.name"
                name="name"
                :rules="nameRules"
                required></v-text-field>
              <v-text-field
                autocomplete="email"
                label="이메일"
                v-model="user.email"
                name="email"
                :rules="emailRules"></v-text-field>
              <v-select
                :items="roles"
                item-text="text"
                item-value="code"
                v-model="user.role"
                label="권한"
                dense
              ></v-select>
              <v-text-field
              autocomplete="new-password"
              :append-icon=" doShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="()=>(doShowPassword = !doShowPassword)"
              :type="doShowPassword ? 'text' : 'password'"
              label="암호"
              v-model="user.password"
              :rules="passwordRules"></v-text-field>
              <v-text-field
              autocomplete="current-password"
              :append-icon=" doShowConfirmed ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="()=>(doShowConfirmed = !doShowConfirmed)"
              :type="doShowConfirmed ? 'text' : 'password'"
              label="암호 확인"
              v-model="confirmedPassword"
              :rules="confirmedPwRules"></v-text-field>
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
              @click="registerUser" 
              :loading="loading"
            >
              사용자 등록하기
            </v-btn>
          </v-card-text>  
      </v-responsive>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', '', ''),
      roles: [
        {'code':'AA01', 'text':'시스템 관리자'}, 
        {'code':'BB01', 'text': '관리자'},
        {'code':'CC01', 'text': '직원'}
      ],
      nameRules:[
        v=> !!v || "이름을 입력해 주세요.",
        v=> /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|A-z|\s]{3,16}$/.test(v) || "유효한 이름이 아닙니다."
      ],
      emailRules:[
        v => !!v || "이메일을 입력해 주세요.",
        v => /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/.test(v) || "유효한 이메일 값이 아닙니다."
      ],
      passwordRules:[
        v => !!v || "암호를 입력해 주세요.",
        v => /^[a-z0-9_-]{6,18}$/.test(v) || "유효한 암호(6-18자 영문 숫자 조합) 값이 아닙니다."
      ],
      confirmedPwRules:[
        v => !!v || "암호 확인을 입력해 주세요.",
        v => v == this.user.password || "암호와 동일한 값을 입력해 주세요."
      ],
      confirmedPassword: '',
      loading: false,
      message: '',
      doShowPassword: false,
      doShowConfirmed: false,
      alert: false,
    }
  },
  methods:{
    registerUser(){
      if(this.user.password != this.confirmedPassword){
        this.alert = true;
        this.message = "입력하신 두 암호 값이 다릅니다."
        setTimeout(()=>{
          this.alert=false
        },4000);
      } else {
        this.alert = false;
        this.message = ""
        this.loading = true;
        if( this.user.email &&
            this.user.password &&
            this.user.name &&
            this.user.role){
          this.$store.dispatch('auth/register', this.user).then(
            ()=>{
              this.$router.push('/profile');
            },
            ()=>{
              this.loading = false;
              this.message = "데이터 처리중 오류가 발생하였습니다.";
              this.alert = true;
              setTimeout(()=>{
                this.alert=false
              },4000);
            }
          );
        }
      }
    },
  }
};
</script>