<template>
  <div>
    <div class="h1 cursor-pointer"></div>
    <p class="cursor-pointer"></p>
    <span class="btn option-badge mt-4 mb-3" @click="openPopupMap">
      Ajouter une adresse
    </span>
    <AppPopUpMap ref="apppopupmap"></AppPopUpMap>
  </div>
</template>

<script>
export default {
  name: "MapGoogle",
  components: {
    AppPopUpMap: () => import("map-google-location/src/AppPopUpMap.vue")
  },
  methods: {
    openPopupMap() {
      console.log("this.$refs.apppopupmap : ", this.$refs.apppopupmap);
      this.$refs.apppopupmap.openModal();
    }
  }
};
</script>
