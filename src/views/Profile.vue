<template>
  <div class="dashboard">
    <v-subheader class="grey-text">
      <strong>{{currentUser.name}}</strong>
      <span class="ml-2">프로필</span>
    </v-subheader>

    <v-container class="my-5">
      <v-row>
        <v-col
          cols="12"
          md="4">
          <v-card color="light" class="ma-4 pa-4">
            <v-card-text>
              {{currentUser.username}}
            </v-card-text>
            <v-card-text>
              {{currentUser.email}} 
            </v-card-text>
            <v-card-text>
              {{currentUser.password}}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>