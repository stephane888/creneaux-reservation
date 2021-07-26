<template>
  <div class="creneaux-mbt">
    <div class="container first-block">
      <div class="creneaux-mbt--block mt-5">
        <app-title></app-title>
        <div class="block-left">
          <tab-option></tab-option>
        </div>
        <div class="block-border">
          <div class="row font-weight-bold type-livraison mb-2">
            <inline-description></inline-description>
          </div>
          <div class="row d-flex justify-content-start commande-detail mb-5">
            <div
              class=" rectangle rond-left rond-right mx-3 mx-md-0 mb-3 mb-md-0  ml-md-5  mr-lg-5  pt-3  pl-3 pr-3 col-md-3 "
            >
              <div class="h2 cursor-pointer">ADRESSE</div>
              <div
                class="d-flex justify-content-between justify-content-md-start align-items-center"
              >
                <mapGoogle></mapGoogle>
                <div class="icone-map">
                  <!-- <map-calandar-svg></map-calandar-svg> -->
                </div>
              </div>
            </div>
            <div class="col-md-7">
              <div class="row ml-md-4 h-100">
                <creneau title="Collecte" type="collecte"></creneau>
                <creneau
                  title="Livraison"
                  classes="rond-right"
                  type="livraison"
                ></creneau>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppTitle from "./components/creneau/AppTitle.vue";
import InlineDescription from "./components/creneau/InlineDescription.vue";
import TabOption from "./components/creneau/TabOption.vue";
import mapGoogle from "./components/creneau/map-google.vue";
import creneau from "./components/creneau/creneau.vue";
export default {
  name: "App",
  props: {
    /**
     * Date du jour.
     */
    dateDuJour: {
      type: [String, Object],
      default() {
        return moment();
      }
    }
  },
  components: { TabOption, InlineDescription, AppTitle, mapGoogle, creneau },
  mounted() {
    this.$store.dispatch("SetDateDuJour", this.dateDuJour);
  }
};
</script>
<style lang="scss">
@import "./scss/default.scss";
</style>
