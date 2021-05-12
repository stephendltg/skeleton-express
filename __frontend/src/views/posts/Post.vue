<template>
  <div class="view-post">

    <p>POST</p>
    {{ { ...this.$route.params, ...this.$route.query } }}

    <button @click="test()">TEST</button>

  </div>
</template>

<script>
import translate from '../../plugins/i18n'


export default {
  name: 'Post',
  components: {
  },
  data: () => ({
    params: {}
  }),
  methods: {
    __(text) { return translate.__(text) },
    __n(text) { return translate.__n(text) },
    test(){
      // Test authorization
      fetch('/api/json/v1/options/settings')
        .then( res => res.json())
        .then( json => console.log(json))
    }
  },
  mounted(){
  }
}
</script>
