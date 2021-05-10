<template>
  <div class="view-post">

    <p>POST</p>
    {{ { ...this.$route.params, ...this.$route.query } }}

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
    __n(text) { return translate.__n(text) }
  },
  mounted(){
  }
}
</script>
