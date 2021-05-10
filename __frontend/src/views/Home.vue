<template>
  <div>

    <Header/>

    <Sidebar v-if="isSidebar"/>

    <div :style="isSidebar ? 'margin-left:250px' : 'margin-left:0'">
      
      <main id="main" role="main" class="p-mx-2 p-pt-1" @click="onMenuToggle()">
        <div class="layout-main">
        <router-view></router-view>
        <router-view name="helper"></router-view>
        </div>
      </main>

      <Footer/>
    </div>

  </div>
</template>

<style scoped>

  .layout-main{
    margin-top: 3.8em;
    min-height: calc( 100vh - 5em - 4.5rem);
    margin-bottom: 4.5rem;
  }
</style>

<script>
import translate from '../plugins/i18n'
import { mapGetters } from 'vuex'
import Header from '../layouts/Header.vue'
import Sidebar from '../layouts/Sidebar.vue'
import Footer from '../layouts/Footer.vue'

export default {
  name: 'Home',
  components: {
    Header, Sidebar, Footer
  },
  data: () => ({
    isSidebar: window.innerWidth > 1024
  }),
  computed: {
    ...mapGetters({
      account: 'auth/account',
    })
  },
  methods: {
    __(text) { return translate.__(text) },
    __n(text) { return translate.__n(text) },
    onMenuToggle() {
      if(window.innerWidth > 768) return;
      window.mitt.emit('menu-toggle-status', false )
      window.mitt.emit('menu-toggle', false )
    }
  },
  mounted(){
    window.mitt.on('menu-toggle', (data) =>  {
      this.isSidebar = data
      window.mitt.emit('menu-toggle-status', data )
    })
  },
  created(){
  },
  beforeUnmount(){
    window.mitt.off('menu-toggle')
  }
}
</script>
