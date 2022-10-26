<template>
  <div class="first-row">
    <div
      v-for="(item, index) in creneauType"
      :key="index"
      class="option btn"
      :class="item.active ? 'option-badge' : ''"
      @click="SelectTypeTab(index)"
    >
      <div class="mx-auto h2 titre-tab">
        {{ item.titre }}
        <span v-if="index > 0" class="small small-text d-block">
          {{ item.montant }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SelectionHoraire",

  computed: {
    ...mapState(["creneauType"]),
  },
  methods: {
    SelectTypeTab(index) {
      this.$store.dispatch("SelectTypeTab", index);
    },
  },
};
</script>
