<template>
  <div class="view-article">

    <p>ARTICLE</p>

  </div>
</template>
<script>
import translate from '../../plugins/i18n'


export default {
  name: 'Article',
  components: {
  },
  methods: {
    __(text) { return translate.__(text) },
    __n(text) { return translate.__n(text) }
  },
  mounted(){
  }
}
</script>
