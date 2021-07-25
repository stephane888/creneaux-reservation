<template>
  <div>
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
            <!-- affiche les alerts -->
            <div
              class="
                rectangle
                rond-left rond-right
                mx-3 mx-md-0
                mb-3 mb-md-0
                ml-md-5
                mr-lg-5
                pt-3
                pl-3
                pr-3
                col-md-3
              "
            >
              <div class="h2 cursor-pointer">ADRESSE</div>
              <div
                class="
                  d-flex
                  justify-content-between justify-content-md-start
                  align-items-center
                "
              >
                <div class="">
                  <div class="h1 cursor-pointer"></div>
                  <p class="cursor-pointer"></p>
                  <span class="btn option-badge mt-4 mb-3">
                    Ajouter une adresse
                  </span>
                </div>
                <div class="icone-map">
                  <!-- <map-calandar-svg></map-calandar-svg> -->
                </div>
              </div>
            </div>
            <div class="col-md-7">
              <div class="row ml-md-4 h-100">
                <div
                  class="
                    rectangle
                    rond-left
                    mx-2 mx-md-0
                    mb-3 mb-md-0
                    mx-3
                    pt-4
                    pl-sm-3
                    col-md-6
                  "
                >
                  <div class="title-creneau h2">Collecte</div>
                  <div
                    class="
                      d-flex
                      justify-content-between justify-content-md-start
                      line-creneau
                      h1
                    "
                  >
                    <div>00:00</div>
                    <i class="icone-svg mb-md-1 mb-lg-2 cursor-pointer"></i>
                  </div>
                  <p class="cursor-pointer">mercredi 7 juillet</p>
                </div>
                <div
                  class="
                    rectangle
                    rond-right
                    mx-2 mx-md-0
                    mb-3 mb-md-0
                    mx-3
                    pt-4
                    pl-sm-3
                    col-md-6
                  "
                >
                  <div class="title-creneau h2">livraison</div>
                  <div
                    class="
                      d-flex
                      justify-content-between justify-content-md-start
                      line-creneau
                      h1
                    "
                  >
                    <div>00:00</div>
                    <i class="icone-svg mb-md-1 mb-lg-2 cursor-pointer"></i>
                  </div>
                  <p class="cursor-pointer">mercredi 7 juillet</p>
                </div>
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
export default {
  name: "App",
  components: { TabOption, InlineDescription, AppTitle },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
//@import "~vue-multiselect/dist/vue-multiselect.min.css";

@import "./scss/default.scss";
</style>
