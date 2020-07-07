<template>
  <nav>
    <v-app-bar flat app>
      <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer">
      </v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Vision</span>
        <span>Connect</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{on, attrs}">
          <v-btn text slot="activator" color="grey" v-bind="attrs" v-on="on">
            <v-icon left>mdi-expand-all</v-icon>
            <span>menu</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item 
            v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-item-title>{{link.text}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn text color="grey">
        <span>Sign Out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" class="grey pa-3">
      <v-col align="center" class="mt-5" v-if="signed">
        <v-avatar size="100" class="grey lighten-1">
          <img src="/avatar-5.png">
        </v-avatar>
        <p class="white--text mt-1">
          김경민 <!-- 사용자 이름 -->
        </p>
      </v-col>
      <v-list nav v-if="signed">
        <v-list-item-group v-model="link" color="primary">
          <v-list-item
            v-for="(link, i) in links"
            :key="i"
            :to="link.route" link 
          >
            <v-list-item-icon class="mr-3">
              <v-icon v-text="link.icon" class="white--text"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="link.text" class="white--text">
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-col v-else>
        <p class="white--text" align="center"> 로그인 후 이용하실 수 있습니다. </p>
      </v-col>
    </v-navigation-drawer>
  </nav>
</template>

<script>

export default {
  data() {
    return {
      drawer: false,
      signed: false,
      links: [
        { icon: 'mdi-view-dashboard', text:'Dashboard', route:'/'},
        { icon: 'mdi-folder', text: 'My Projects', route: '/projects'},
        { icon: 'mdi-account', text: 'Team', route: '/team' },
      ],
    }
  }
};
</script>
