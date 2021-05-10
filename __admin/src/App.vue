<template>
  <div class="app-container">
    <router-view/>
    <Toast position="top-right"/>
  </div>
</template>

<style lang="scss">

  /* Import animate */
  @import './assets/sass/plugins/animate.scss';

  :root {
    --surface-a: #ffffff;
    --surface-b: #fafafa;
    --surface-c: rgba(0,0,0,0.4);
    --surface-d: rgba(0,0,0,0.12);
    --surface-e: #ffffff;
    --surface-f: #ffffff;
    --text-color: rgba(0, 0, 0, 0.87);
    --text-color-secondary: textSecondaryColor;
    --primary-color: #3F51B5;
    --primary-color-text: #ffffff;
    --font-family: Roboto, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;

    /* Layout */
    --header-color: #2196F3;
    --aside-color: #4d505b;
    --aside-menu-color: #646774;
  }

  body{
    /* Scaling UI*/
    font-size: 18px;
    margin:0;
    padding:0;
    /* Darkmode */
    /*background-color: #1e1e1e;*/
    background-color: var(--surface-a, #fff);
    scroll-behavior: smooth;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--text-color,#2c3e50);
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .app-container{
    min-height: calc( 100vh - 5em);
  }

</style>

<script>

export default {
  name: 'App',
  components: {
  },
  data: () => ({
    isSidebar: window.innerWidth > 1024
  }),
  methods: {
    __(text) { return translate.__(text) },
    __n(text) { return translate.__n(text) }
  },
  mounted(){
  }
}
</script>



