module.exports = {
  "devServer": {
    "port": 8081
  },
  "configureWebpack": {
    "resolve": {
      "alias": {
        "vue$": "vue/dist/vue.esm.js"
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}