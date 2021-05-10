<template>
  <div class="view-step">
    
    <form @submit="submit()" action="javascript:void(0);">
        <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
                <i class="pi" :class="icon" style="fontSize: 1.5rem"></i>
            </span>
            <span class="p-float-label">
                <InputText id="step" type="text" v-model="value" :pattern="pattern"/>
                <label for="step">{{__(this.$route.params.Slug)}}</label>
            </span>
        </div>
    </form>

    <p class="p-text-center p-mt-6">
        <i v-if="spinner" class="pi pi-spin pi-spinner" style="fontSize: 2rem" :style="'color:'+spinner"></i>
        <i v-else class="pi pi-times-circle" style="fontSize: 2rem" :style="'color:red'"></i>
    </p>

  </div>
</template>
<script>
import {__, putFocus} from '../../plugins/i18n'
import steps from '../../controller/steps.js'

export default {
  name: 'Step',
  components: {
  },
  data: () => ({
    value: '',
    spinner: 'transparent',
    icon: 'pi-arrow-right',
    pattern: null
  }),
  watch: {
    $route(to, from){
      let id = steps.items.findIndex( x => x.slug == to.params.Slug )
      if( id >= 0 ){
        this.icon    = steps.items[id].icon
        this.pattern = steps.items[id].pattern || null
        this.value   = steps.items[id].value || ''
        if( steps.items[id].mount && typeof steps.items[id].mount === "function" )
          steps.items[id].mount.apply(null, [this.value, this.$store.state])
      }
      putFocus('step')
    }
  },
  methods: {
    __(text) { return __(text) },
    __n(text) { return __n(text) },
    submit(){
      // Hook action submit
      let id = steps.items.findIndex( x => x.slug == this.$route.params.Slug )
      if( id >= 0 && steps.items[id].submit && typeof steps.items[id].submit === "function" ){
        steps.items[id].submit.apply(null, [this.value])
      } else {
        window.mitt.emit('steps:step', {
          slug: this.$route.params.Slug,
          value: this.value
        })
      }
      this.value = ''
    }
  },
  mounted(){
    putFocus('step')

    window.mitt.on('steps:spinner', (data) =>  this.spinner = data)
    window.mitt.on('steps:value', (data) =>  this.value = data)

    // Hook action mounted
    if( !this.$route.params.Slug ) this.$route.params.Slug = 'terminal'
    let id = steps.items.findIndex( x => x.slug == this.$route.params.Slug )
    if( id >= 0 ){
      this.icon    = steps.items[id].icon
      this.pattern = steps.items[id].pattern || null
      this.value   = steps.items[id].value || ''
      if( steps.items[id].mount && typeof steps.items[id].mount === "function" )
        steps.items[id].mount.apply(null, [this.value, this.$store.state])
    } 

  },
  created(){
    window.mitt.off('steps:spinner')
    window.mitt.off('steps:value')
  }
}
</script>
