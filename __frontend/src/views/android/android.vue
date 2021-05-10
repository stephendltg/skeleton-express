<template>
  <div class="view-android">

    <p>ANDROID</p>
    {{ { ...this.$route.params, ...this.$route.query } }}
    {{terminals}}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import translate from '../../plugins/i18n'
import {getBrokerCustomer} from '../../api'


export default {
  name: 'Android',
  components: {
  },
  data: () => ({
    terminals: []
  }),
  computed: {
    ...mapGetters({
      token: 'auth/token'
    })
  },
  methods: {
    __(text) { return translate.__(text) },
    __n(text) { return translate.__n(text) }
  },
  mounted(){
    getBrokerCustomer( this.token, (res) => {
        if( !res.error )
            this.terminals = res.data.filter( item => item.clientid.search('android') !== -1 )
    })
  }
}
</script>
