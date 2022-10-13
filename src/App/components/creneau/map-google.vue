<template>
  <div>
    <div class="h1 cursor-pointer"></div>
    <p class="cursor-pointer"></p>
    <span
      class="btn option-badge mt-4 mb-3"
      @click="openPopupMap"
      v-if="!location.city_on_map && !location.locality"
    >
      Ajouter une adresse
    </span>
    <div
      class="h1 cursor-pointer"
      @click="openPopupMap"
      v-if="location.current_address !== ''"
    >
      {{ location.locality }}
    </div>
    <p class="cursor-pointer" v-if="location.current_address !== ''">
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
import { mapState } from 'vuex'
import AppPopUpMap from 'map-google-location/src/AppPopUpMap.vue'
export default {
  name: 'MapGoogle',
  components: {
    AppPopUpMap
  },
  computed: {
    ...mapState(['location'])
  },
  methods: {
    openPopupMap () {
      this.$refs.apppopupmap.openModal()
    },
    update_location (location) {
      console.log(' update_location : ', location)
      this.$store.dispatch('setLocation', location)
    }
  }
}
</script>
