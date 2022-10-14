<template>
  <div
    class="
      col-12
      width-100
      d-flex
      flex-wrap
      mt-3
      mb-3
      font-weight-bold
      type-livraison
    "
    v-html="activeTabOption"
  ></div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'InlineDesc',
  computed: { ...mapGetters(['activeTabOption']) }
}
</script>
