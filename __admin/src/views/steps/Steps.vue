<template>
  <div>
      
      <main id="main" role="main" class="p-mx-2 p-pt-1">
        <div class="layout-steps p-d-flex p-jc-center" style="min-height:calc( 100vh - 4.5rem)">
          <router-view class="p-as-center"></router-view>
        </div>
      </main>

      <div class="layout-footer">
        <footer class="p-d-flex p-p-2 p-jc-center">
          <Button type="Button" icon="pi pi-power-off" class="p-mr-5 p-button-rounded p-button-lg p-button-danger" @click="$router.push('/login')"/>
          <div v-for="item in items" :key="item">
            <Button type="Button" :icon="'pi '+ item.icon" class="p-mr-5 p-button-rounded p-button-lg" :disabled="item.disabled" @click="$router.push('/steps/' + item.slug)"/>
          </div>
        </footer>
      </div>

  </div>
</template>

<style scoped>
.layout-steps{
    margin-bottom: 4.5rem;
  }
.layout-footer {
  position: fixed;
  bottom: 0;
  left:0;
  width: 100%;
  height: 4rem;
  z-index: 100;
}
</style>

<script>
import steps from '../../controller/steps.js'

export default {
  name: 'Steps',
  components: {
  },
  data: () => ({
    items: steps.items
  }),
  computed: {
  },
  methods: {
  },
  mounted(){
    window.mitt.on('steps:step', (data) =>  {
      let item = this.items.findIndex( x => x.slug == data.slug)
      if( item < 0) {
        this.$router.push('/')
        return
      }
      this.items[item].disabled = false
      if(this.items[item].command && typeof this.items[item].command === "function" ) this.items[item].command.apply(null, [data.value, this.$store.dispatch])
      this.$router.push( this.items[item].to || '/') 
    })
  },
  created(){
  },
  beforeUnmount(){
    window.mitt.off('steps:step')
  }
}
</script>
