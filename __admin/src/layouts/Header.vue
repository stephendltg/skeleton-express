<template>
  <div class="layout-topbar" :style="toggle ? 'left:250px' : 'left:0'">
    <header class="view-header">
      <div class="p-d-flex p-p-2 card">
        <Button type="Button" icon="pi pi-bars" class="p-mr-2 p-button-rounded Zp-button-outlined p-button-lg p-button-info" @click="onMenuToggle"/>
        <Button class="p-d-none p-d-md-inline-flex p-button-link p-button-lg" type="link" :label="app_name.toUpperCase()" style="color:#fff"/>
        <Button type="Button" icon="pi pi-cog" class="p-d-none p-d-md-inline-flex p-ml-auto p-button-rounded p-button-lg p-button-info"/>
      </div>
    </header>
  </div>
</template>

<style scoped>
.layout-topbar {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
  background-color: var(--header-color,#3F51B5);
}

</style>

<script>
import translate from '../plugins/i18n'
import { mapGetters } from 'vuex'
import SETTINGS from '../settings'


export default {
  name: 'Home',
  components: {
  },
  data: () => ({
    toggle: window.innerWidth > 1024,
    app_name: SETTINGS.APP_NAME
  }),
  computed: {
  },
  methods: {
    __(text) { return translate.__(text) },
    __n(text) { return translate.__n(text) },
    onMenuToggle(event) {
      window.mitt.emit('menu-toggle', !this.toggle )
    }
  },
  mounted(){
    window.mitt.on('menu-toggle-status', (data) =>  this.toggle = data)
  },
  created(){
  },
  beforeUnmount(){
    window.mitt.off('menu-toggle-status')
  }
}
</script>
