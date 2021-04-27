<template>
  <div class="block-left">
    <div v-if="show_title">
      <h3 class="title" v-html="titre"></h3>
    </div>
    <!-- Les titres de types de livraisons -->
    <div class="first-row justify-content-start d-flex text-center">
      <div
        v-for="(type, index) in blocks_type_livraisons"
        class="option d-flex btn align-items-center"
        :class="[
          index == 0 ? 'option--tl-radius' : 'option--bdr-right',
          type.active ? 'badge-primary' : ''
        ]"
        :key="index"
        @click="select_type_tab(index)"
      >
        <div class="mx-auto h2 titre-tab">
          {{ type.titre }}
          <span v-if="index > 0" class="small small-text d-block">
            {{ type.montant }}€
          </span>
        </div>
      </div>
    </div>

    <div class="block-border">
      <!-- Les textes de descriptions du type de contenu actifs. -->
      <div
        class=" row list-inline mt-3 ml-md-4 font-weight-bold type-livraison"
      >
        <div class="list-inline-item col-md-8" v-html="active_type_body"></div>
        <div
          class="list-inline-item col-md-4"
          v-if="active_type && active_type.montant"
        >
          <p>
            <span> {{ formatString(active_type.montant_libele) }} </span>
          </p>
        </div>
      </div>
      <div class="row  d-flex justify-content-start commande-detail mb-5 ">
        <!-- affiche les alerts -->
        <slot name="alert"> </slot>
        <!-- Les adresses. -->
        <div
          class="rectangle rond-left rond-right mx-3 mx-md-0 mb-3 mb-md-0 ml-md-5 mr-lg-5 pt-3 pl-3 pr-3 col-md-3 "
        >
          <div class="h2 cursor-pointer" @click="open_map">ADRESSE</div>
          <div
            class="d-flex justify-content-between justify-content-md-start align-items-center "
          >
            <div class="">
              <div
                class="h1 cursor-pointer"
                @click="open_map"
                v-if="city_on_map != ''"
                v-html="city_on_map"
              ></div>
              <p
                class="cursor-pointer"
                v-if="current_address != ''"
                v-html="current_address"
                @click="open_map"
              ></p>
              <span
                class="btn btn-primary mt-4 mb-3"
                v-if="current_address == ''"
                @click="open_map"
              >
                Ajouter une adresse
              </span>
            </div>
            <div class="icone-map">
              <map-calandar-svg></map-calandar-svg>
            </div>
          </div>
        </div>
        <!-- Selection des creneaux. -->
        <slot> </slot>
      </div>
    </div>
  </div>
</template>

<script>
import MapCalandarSvg from "../assets/MapCalandarSvg.vue";
var $;
if (window.jQuery) {
  $ = window.jQuery;
} else if (window.$) {
  $ = window.$;
}

export default {
  name: "TypeLivraison",
  props: {
    datas: [Object, Array, String, Number],
    id_html: {
      type: String,
      default: ""
    },

    /**
     * Contient un array avec les differentes valeurs de livraisons.
     */
    blocks_type_livraisons: {
      type: Array
    },
    show_title: {
      type: Boolean,
      default: false
    }
  },
  components: {
    "map-calandar-svg": MapCalandarSvg
  },
  data: function() {
    return {
      titre: "Types de livraison",
      show_adresse: false,
      /**
       * Le type de livraison actif.
       */
      active_type: [],
      //
      city_on_map: "",
      current_address: "",
      wbu_locality: "",
      wbu_route: ""
    };
  },
  mounted: function() {
    /**
     * On definie la valeur de selection par defaut
     */
    this.select_default_type();
    //
    //
    this.getValuesAdress();
    /**
     * on execute la function getValuesAdress() pendant 5 mn.
     */
    this.setEvent();
  },
  methods: {
    /*
    remplace(texte, index = 0) {
      var rep = "";
      if (index == 0) {
        rep = this.active_type.creneau;
      } else if (index == 1) {
        rep = this.active_type.delai_override * 24;
      }
      this.active_type;
      return texte.replace("XXXX", rep);
    },
    /**/
    open_map() {
      //trigger open map
      console.log("Trigger open map");
      $("#trigger-simple-map3map-google-field").trigger("click");
    },
    getValuesAdress() {
      this.current_address = "";
      this.city_on_map = "";
      var wbu_localisation_map = localStorage.getItem("wbu_localisation_map");
      var wbu_localisation_city = localStorage.getItem("wbu_localisation_city");
      //
      if (wbu_localisation_map) {
        this.current_address = JSON.parse(wbu_localisation_map);
      }
      //
      if (wbu_localisation_city) {
        this.city_on_map = JSON.parse(wbu_localisation_city);
      }
      //
      this.wbu_locality = localStorage.getItem("wbu_locality");
      this.wbu_route = localStorage.getItem("wbu_route");
      if (this.wbu_locality != "") {
        this.city_on_map = this.wbu_locality;
      } else if (this.wbu_route != "") {
        this.city_on_map = this.wbu_route;
      }
    },
    select_type_tab: function(index) {
      var self = this;
      if (this.blocks_type_livraisons[index]) {
        // on redefinitle type par defaut.
        this.active_type = this.blocks_type_livraisons[index];
        //on desactive tout.
        for (const i in this.blocks_type_livraisons) {
          this.blocks_type_livraisons[i].active = false;
        }
        // on active le bon elment:
        this.blocks_type_livraisons[index].active = true;
        self.$emit("ev_change_type_livraison", self.active_type);
      } else {
        console.log("error");
      }
    },
    display_prise: function(price) {
      if (price == 0) {
        return "+0€";
      } else {
        return "+" + price + "€";
      }
    },
    select_default_type() {
      for (const i in this.blocks_type_livraisons) {
        if (this.blocks_type_livraisons[i].active) {
          this.active_type = this.blocks_type_livraisons[i];
          this.$emit("ev_change_type_livraison", this.active_type);
          break;
        }
      }
    },
    setEvent() {
      var self = this;
      //console.log("init setEvent");
      $(document).on("adresseUpdate", function() {
        self.getValuesAdress();
      });
    },
    formatString(str) {
      var regex = /\{\{(.*?)\}\}/g;
      let found;
      var int = 0;
      while ((found = regex.exec(str)) !== null && int < 10) {
        int++;
        var attr = found[1].trim(" ");
        str = str.replace(
          found[0],
          this.active_type[attr] ? this.active_type[attr] : "..."
        );
      }
      return str;
    }
  },
  computed: {
    /**
     * Retourne le texte du bloc actif.
     */
    active_type_body: {
      get() {
        if (this.active_type && this.active_type.body) {
          return this.formatString(this.active_type.body);
        } else {
          return "";
        }
      }
    }
  }
};
</script>
