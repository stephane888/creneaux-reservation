<template>
  <div class="creneaux-mbt">
    <div class="container first-block" :currentCreneauType="currentCreneauType">
      <div class="creneaux-mbt--block mt-5">
        <app-title></app-title>
        <div
          class="alert alert-danger"
          v-if="alert_message && alert_message != ''"
        >
          {{ alert_message }}
        </div>
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
import AppTitle from './components/creneau/AppTitle.vue'
import InlineDescription from './components/creneau/InlineDescription.vue'
import TabOption from './components/creneau/TabOption.vue'
import mapGoogle from './components/creneau/map-google.vue'
import creneau from './components/creneau/creneau.vue'
import { mapState } from 'vuex'
import shopifyCart from './js/shopifyCart'
import moment from 'moment'
export default {
  name: 'App',
  props: {
    /**
     * Date du jour.
     */
    dateDuJour: {
      type: [String, Object, Date],
      required: true
    }
  },
  components: { TabOption, InlineDescription, AppTitle, mapGoogle, creneau },
  data () {
    return {
      CreneauTypeProductId: null, // permet de reduire l'execution que si un nouveau elment est choisit.
      initAuto: true // permet de differentier le comportement auto et le click de l'utilisateur.(true => action auto ).
    }
  },
  mounted () {
    // const d = moment("4-08-2021 18:00:00", "DD-MM-YYYY HH:mm:ss");
    const d = moment(this.dateDuJour, 'DD-MM-YYYY HH:mm:ss')
    // const d = moment();
    if (d._isValid) this.$store.dispatch('SetDateDuJour', d)
  },
  /**
   * Date affiché.
   */

  computed: {
    ...mapState(['creneauType', 'activeType', 'alert_message']),
    appDateDisplay: {
      get () {
        if (this.type === 'livraison' && this.creneauLivraison.date_string) {
          return moment(this.creneauLivraison.date_string, 'YYYY-MM-DD')
            .locale('fr')
            .format('dddd Do MMMM')
        } else if (
          this.type === 'collecte' &&
          this.creneauCollecte.date_string
        ) {
          return moment(this.creneauCollecte.date_string, 'YYYY-MM-DD')
            .locale('fr')
            .format('dddd Do MMMM')
        }
        return ''
      }
    },
    /**
     * -
     */
    currentCreneauType () {
      this.initManageCart(this.creneauType[this.activeType])
      return this.creneauType[this.activeType]
    }
  },
  methods: {
    async initManageCart (currentCreneauType) {
      if (this.CreneauTypeProductId !== currentCreneauType.id) {
        this.CreneauTypeProductId = currentCreneauType.id
        shopifyCart.TypeLivraison = currentCreneauType
        await shopifyCart.initcreneau(this.initAuto)
        this.initAuto = false
      }
    }
  }
}
</script>
<style lang="scss">
@import "./scss/default.scss";
</style>
