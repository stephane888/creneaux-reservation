<template>
  <div>
    <div class="h1 cursor-pointer"></div>
    <p class="cursor-pointer"></p>
    <span
      v-if="!location.city_on_map && !location.locality"
      class="btn option-badge mt-4 mb-3"
      @click="openPopupMap"
    >
      Ajouter une adresse
    </span>
    <div
      v-if="location.current_address !== ''"
      class="h1 cursor-pointer"
      @click="openPopupMap"
    >
      {{ location.locality }}
    </div>
    <p v-if="location.current_address !== ''" class="cursor-pointer">
      {{ location.current_address }}
    </p>
    <AppPopUpMap
      ref="apppopupmap"
      :etape-checkout="false"
      :action-after="false"
      @update_location="update_location"
    ></AppPopUpMap>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppPopUpMap from "map-google-location/src/AppPopUpMap.vue";
export default {
  name: "MapGoogle",
  components: {
    AppPopUpMap,
  },
  computed: {
    ...mapState(["location"]),
  },
  methods: {
    openPopupMap() {
      this.$refs.apppopupmap.openModal();
    },
    update_location(location) {
      console.log(" update_location : ", location);
      this.$store.dispatch("setLocation", location);
    },
  },
};
</script>
