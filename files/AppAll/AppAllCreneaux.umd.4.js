((typeof self !== 'undefined' ? self : this)["webpackJsonpAppAllCreneaux"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpAppAllCreneaux"] || []).push([[4],{

/***/ "1161":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5da2cd20-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Creneaux.vue?vue&type=template&id=f1a7a56c&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('creneau',{staticClass:"container first-block ",attrs:{"blocks_type_livraisons":_vm.blocks_type_livraisons,"app_env_prod":_vm.app_env_prod,"titre_module":_vm.titre_module,"nombre_res_creneau":_vm.nombre_res_creneau,"collecte_current_date":_vm.collecte_current_date,"livraison_current_date":_vm.livraison_current_date,"nombre_semaine":_vm.nombre_semaine,"plage_heures_valide":_vm.plage_heures_valide,"collecte_jour_desactivee":_vm.collecte_jour_desactivee,"livraison_jour_desactivee":_vm.livraison_jour_desactivee,"collecte_date_desactivee":_vm.collecte_date_desactivee,"livraison_date_desactivee":_vm.livraison_date_desactivee,"disable_heureday":_vm.disable_heureday,"disable_heuredate":_vm.disable_heuredate,"url_get_creneau":_vm.url_get_creneau,"url_save_creneau":_vm.url_save_creneau,"collecte_delai_jour":_vm.collecte_delai_jour,"collecte_interval":_vm.collecte_interval,"livraison_delai_jour":_vm.livraison_delai_jour,"livraison_interval":_vm.livraison_interval,"collecte_deccalage_creneau_depart":_vm.collecte_deccalage_creneau_depart,"filters":_vm.filters}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/Creneaux.vue?vue&type=template&id=f1a7a56c&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

// CONCATENATED MODULE: ./src/App/config.js



/**
 *recupere les données du jours en function de l'indice du jour.
 */
var getDayData = function getDayData(i) {
  var daysDatas = window.creneau_configs.days;

  for (var t in daysDatas) {
    if (daysDatas[t] && daysDatas[t].indice === i) {
      return daysDatas[t];
    }
  }
};

function DisableHeuredate() {
  // Plage d'heure desactivée en function d'une date.
  var disable_heuredate = [];

  if (window.creneau_heures && window.creneau_heures.heuredate.length > 0) {
    disable_heuredate = window.creneau_heures.heuredate;
  }

  return disable_heuredate;
}
/**
 * Plage d'heure desactivée en function du jour
 * @depreciate.
 */


function DisableHeureday() {
  var disable_heureday = [];

  if (window.creneau_heures && window.creneau_heures.heureday.length > 0) {
    disable_heureday = window.creneau_heures.heureday;
  }

  return disable_heureday;
} // date desactivée


function DateDesactivee() {
  var date_desactivee = [];

  if (window.creneau_configs && window.creneau_configs.date_desactivee && window.creneau_configs.date_desactivee.length) {
    date_desactivee = window.creneau_configs.date_desactivee;
  }

  return date_desactivee;
}

function GetTitleApp() {
  if (window.creneau_configs && window.creneau_configs.title) {
    return window.creneau_configs.title;
  }

  return "Finaliser la commande";
}
/**
 * Permet de desactivée certains jours de la semaine.
 * (Par defaut tous les jours sont activées.)
 * ok:
 */


function JourDesactivee() {
  var jour_desactivee = [0, 6];

  if (window.creneau_configs && window.creneau_configs.days) {
    jour_desactivee = [];
    /**
     * On parcourt les jours, de 0 à 6, (dimanche à samedi);
     */

    for (var i = 0; i <= 6; i++) {
      var daysDatas = getDayData(i);

      if (daysDatas.value === 0) {
        jour_desactivee.push(i);
      }
    }
  }

  return jour_desactivee;
}
/**
 * Definie les plages d'heuress valide avec en indice le jour.
 * l'heure de debut et de fin.
 * ok:
 */


function PlageHeuresValide() {
  var results = [];
  /**
   * On parcourt les jours, de 0 à 6, (dimanche à samedi);
   */

  if (window.creneau_configs && window.creneau_configs.days && window.creneau_configs.days.length) {
    for (var i = 0; i <= 6; i++) {
      var daysDatas = getDayData(i);
      results.push({
        debut: daysDatas.debut,
        fin: daysDatas.fin
      });
    }
  }

  return results;
}
/**
 * definie le nombre de semaine afficher sur le calendrier.
 * ok:
 */


function NombreSemaine() {
  return window.creneau_configs && window.creneau_configs.nombre_semaine ? parseInt(window.creneau_configs.nombre_semaine) : 4;
} // Date courante.


function CurrentDate() {
  return window.wbu_current_date ? window.moment(window.wbu_current_date, "DD-MM-YYYY HH:mm:ss") : window.moment();
} // Type de livraison.


function BlocksTypeLivraisons() {
  var blocks_type_livraisons = []; //

  if (window.creneau_types && window.creneau_types.typelivraison) {
    blocks_type_livraisons = window.creneau_types.typelivraison;
  }

  return blocks_type_livraisons;
}
/**
 * Determine le nombre de reservation par creneaux.
 * ok:
 */


function NombreResCreneau() {
  return window.creneau_configs && window.creneau_configs.nombre_res_creneau ? parseInt(window.creneau_configs.nombre_res_creneau) : 2;
}

function IsProdEnvir() {
  if (window.location.host.includes(".kksa") || window.location.host.includes("localhost")) {
    return false;
  } else {
    return true;
  }
}

function UrlSaveCreneau() {
  // url de sauvegarde des creneaux.
  var url_save_creneau = "https://www.habeuk.online/api/shopify/creneaux/add.js";

  if (IsProdEnvir()) {
    url_save_creneau = "http://habeuk.kksa/api/shopify/creneaux/add.js";
  }

  return url_save_creneau;
}

function UrlGetCreneau() {
  // url de sauvegarde des creneaux.
  var url_get_creneau = "https://www.habeuk.online/api/shopify/creneaux/checks.js";

  if (IsProdEnvir()) {
    url_get_creneau = "http://habeuk.kksa/api/shopify/creneaux/checks.js";
  }

  return url_get_creneau;
}

function DeccalageCreneauDepart() {
  return window.creneau_configs && window.creneau_configs.deccalage_creneau_depart > 0 ? window.creneau_configs.deccalage_creneau_depart : 0;
}

var configApp = {
  IsProduction: IsProdEnvir(),
  appTitle: GetTitleApp(),
  nombre_res_creneau: NombreResCreneau(),
  blocks_type_livraisons: BlocksTypeLivraisons(),
  current_date: CurrentDate(),
  nombre_semaine: NombreSemaine(),
  plage_heures_valide: PlageHeuresValide(),
  jour_desactivee: JourDesactivee(),
  date_desactivee: DateDesactivee(),
  disable_heureday: DisableHeureday(),
  disable_heuredate: DisableHeuredate(),
  url_save_creneau: UrlSaveCreneau(),
  url_get_creneau: UrlGetCreneau(),
  deccalage_creneau_depart: DeccalageCreneauDepart(),
  filters: window.creneau_filters && window.creneau_filters.length ? window.creneau_filters : []
};
/* harmony default export */ var config = (configApp);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5da2cd20-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App/index.vue?vue&type=template&id=4e558af1&
var Appvue_type_template_id_4e558af1_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('transition',{attrs:{"name":"fade","mode":"out-in"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],staticClass:"creneaux-mbt--block mt-5"},[_c('div',[_c('h1',{staticClass:"text-left font-weight-bold",domProps:{"innerHTML":_vm._s(_vm.titre_module)}})]),_c('type-livraison',{ref:"typelivraison",attrs:{"blocks_type_livraisons":_vm.blocks_type_livraisons,"price_shipping":_vm.newpriceshipping},on:{"ev_change_type_livraison":_vm.ev_change_type_livraison},scopedSlots:_vm._u([{key:"alert",fn:function(){return [_c('div',{staticClass:"col-md-12 "},[_c('alert',{attrs:{"show_alert":_vm.show_alert,"alert_message":_vm.alert_message,"alert_attribut_class":_vm.alert_attribut_class},on:{"ev_alert_close":_vm.alert_close}})],1)]},proxy:true}])},[[_c('div',{staticClass:"col-md-7"},[_c('selectionhoraire',{ref:"selectionhoraire",attrs:{"collecte_delai_jour":_vm.collecte_delai_jour,"collecte_jour_desactivee":_vm.collecte_jour_desactivee,"collecte_date_desactivee":_vm.collecte_date_desactivee,"collecte_interval":_vm.collecte_interval,"collecte_configs":_vm.collecte_configs,"collecte_current_date":_vm.collecte_current_date,"collecte_deccalage_creneau_depart":_vm.collecte_deccalage_creneau_depart,"livraison_delai_jour":_vm.livraison_delai_jour,"livraison_jour_desactivee":_vm.livraison_jour_desactivee,"livraison_date_desactivee":_vm.livraison_date_desactivee,"livraison_interval":_vm.livraison_interval,"livraison_configs":_vm.TypeLivraison,"livraison_current_date":_vm.livraison_current_date,"nombre_semaine":_vm.nombre_semaine,"nombre_res_creneau":_vm.nombre_res_creneau,"plage_heures_valide":_vm.plage_heures_valide,"disable_heureday":_vm.disable_heureday,"disable_heuredate":_vm.disable_heuredate,"url_get_creneau":_vm.url_get_creneau,"filters":_vm.filters},on:{"ev_creneau_collecte":_vm.ev_creneau_collecte,"ev_creneau_livraison":_vm.ev_creneau_livraison}})],1)]],2),(_vm.show && _vm.show_cover)?_c('div',{staticClass:"londing-cover dynamique d-flex"},[_c('VueLoading',{attrs:{"type":"bars","color":"#00a3dd","size":{ width: '90px', height: '50px' }}})],1):_vm._e()],1)])],1)}
var Appvue_type_template_id_4e558af1_staticRenderFns = []


// CONCATENATED MODULE: ./src/App/index.vue?vue&type=template&id=4e558af1&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__("e260");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.to-fixed.js
var es_number_to_fixed = __webpack_require__("b680");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__("e6cf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.match.js
var es_string_match = __webpack_require__("466d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__("1276");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5da2cd20-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App/TypeLivraison.vue?vue&type=template&id=59b308c1&
var TypeLivraisonvue_type_template_id_59b308c1_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"block-left"},[(_vm.show_title)?_c('div',[_c('h3',{staticClass:"title",domProps:{"innerHTML":_vm._s(_vm.titre)}})]):_vm._e(),_c('div',{staticClass:"first-row justify-content-start d-flex text-center"},_vm._l((_vm.blocks_type_livraisons),function(type,index){return _c('div',{key:index,staticClass:"option d-flex btn align-items-center",class:[
        index == 0 ? 'option--tl-radius' : 'option--bdr-right',
        type.active ? 'badge-primary' : ''
      ],on:{"click":function($event){return _vm.select_type_tab(index)}}},[_c('div',{staticClass:"mx-auto h2 titre-tab"},[_vm._v(" "+_vm._s(type.titre)+" "),(index > 0)?_c('span',{staticClass:"small small-text d-block"},[_vm._v(" "+_vm._s(type.montant)+"€ ")]):_vm._e()])])}),0),_c('div',{staticClass:"block-border"},[_c('div',{staticClass:" row list-inline mt-3 ml-md-4 font-weight-bold type-livraison"},[_c('div',{staticClass:"list-inline-item col-md-8",domProps:{"innerHTML":_vm._s(_vm.active_type_body)}}),(_vm.active_type && _vm.active_type.montant)?_c('div',{staticClass:"list-inline-item col-md-4"},[_c('p',[_c('span',[_vm._v(" "+_vm._s(_vm.formatString(_vm.active_type.montant_libele))+" ")])])]):_vm._e()]),_c('div',{staticClass:"row  d-flex justify-content-start commande-detail mb-5 "},[_vm._t("alert"),_c('div',{staticClass:"rectangle rond-left rond-right mx-3 mx-md-0 mb-3 mb-md-0 ml-md-5 mr-lg-5 pt-3 pl-3 pr-3 col-md-3 "},[_c('div',{staticClass:"h2 cursor-pointer",on:{"click":_vm.open_map}},[_vm._v("ADRESSE")]),_c('div',{staticClass:"d-flex justify-content-between justify-content-md-start align-items-center "},[_c('div',{},[(_vm.city_on_map != '')?_c('div',{staticClass:"h1 cursor-pointer",domProps:{"innerHTML":_vm._s(_vm.city_on_map)},on:{"click":_vm.open_map}}):_vm._e(),(_vm.current_address != '')?_c('p',{staticClass:"cursor-pointer",domProps:{"innerHTML":_vm._s(_vm.current_address)},on:{"click":_vm.open_map}}):_vm._e(),(_vm.current_address == '')?_c('span',{staticClass:"btn btn-primary mt-4 mb-3",on:{"click":_vm.open_map}},[_vm._v(" Ajouter une adresse ")]):_vm._e()]),_c('div',{staticClass:"icone-map"},[_c('map-calandar-svg')],1)])]),_vm._t("default")],2)])])}
var TypeLivraisonvue_type_template_id_59b308c1_staticRenderFns = []


// CONCATENATED MODULE: ./src/App/TypeLivraison.vue?vue&type=template&id=59b308c1&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__("498a");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5da2cd20-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/assets/MapCalandarSvg.vue?vue&type=template&id=5f9ca9b8&
var MapCalandarSvgvue_type_template_id_5f9ca9b8_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('svg',{staticStyle:{"enable-background":"new 0 0 512.053 512.053"},attrs:{"version":"1.1","id":"Capa_1","xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","x":"0px","y":"0px","viewBox":"0 0 512.053 512.053","xml:space":"preserve"}},[_c('g',[_c('g',[_c('path',{staticStyle:{"fill":"#010002"},attrs:{"d":"M365.027,44.5c-30-29.667-66.333-44.5-109-44.5s-79,14.833-109,44.5s-45,65.5-45,107.5\n\t\t\tc0,25.333,12.833,67.667,38.5,127c25.667,59.334,51.333,113.334,77,162s38.5,72.334,38.5,71c4-7.334,9.5-17.334,16.5-30\n\t\t\ts19.333-36.5,37-71.5s33.167-67.166,46.5-96.5c13.334-29.332,25.667-59.667,37-91s17-55,17-71\n\t\t\tC410.027,110,395.027,74.167,365.027,44.5z M289.027,184c-9.333,9.333-20.5,14-33.5,14c-13,0-24.167-4.667-33.5-14\n\t\t\ts-14-20.5-14-33.5s4.667-24,14-33s20.5-13.5,33.5-13.5c13,0,24.167,4.5,33.5,13.5s14,20,14,33S298.36,174.667,289.027,184z"}})])]),_c('g'),_c('g'),_c('g'),_c('g'),_c('g'),_c('g'),_c('g'),_c('g'),_c('g'),_c('g'),_c('g'),_c('g'),_c('g'),_c('g'),_c('g')])])}
var MapCalandarSvgvue_type_template_id_5f9ca9b8_staticRenderFns = []


// CONCATENATED MODULE: ./src/assets/MapCalandarSvg.vue?vue&type=template&id=5f9ca9b8&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/assets/MapCalandarSvg.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var MapCalandarSvgvue_type_script_lang_js_ = ({
  name: "SvgCalandar"
});
// CONCATENATED MODULE: ./src/assets/MapCalandarSvg.vue?vue&type=script&lang=js&
 /* harmony default export */ var assets_MapCalandarSvgvue_type_script_lang_js_ = (MapCalandarSvgvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/assets/MapCalandarSvg.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  assets_MapCalandarSvgvue_type_script_lang_js_,
  MapCalandarSvgvue_type_template_id_5f9ca9b8_render,
  MapCalandarSvgvue_type_template_id_5f9ca9b8_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var MapCalandarSvg = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App/TypeLivraison.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var $;

if (window.jQuery) {
  $ = window.jQuery;
} else if (window.$) {
  $ = window.$;
}

/* harmony default export */ var TypeLivraisonvue_type_script_lang_js_ = ({
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
  data: function data() {
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
  mounted: function mounted() {
    /**
     * On definie la valeur de selection par defaut
     */
    this.select_default_type(); //
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
    open_map: function open_map() {
      //trigger open map
      console.log("Trigger open map");
      $("#trigger-simple-map3map-google-field").trigger("click");
    },
    getValuesAdress: function getValuesAdress() {
      this.current_address = "";
      this.city_on_map = "";
      var wbu_localisation_map = localStorage.getItem("wbu_localisation_map");
      var wbu_localisation_city = localStorage.getItem("wbu_localisation_city"); //

      if (wbu_localisation_map) {
        this.current_address = JSON.parse(wbu_localisation_map);
      } //


      if (wbu_localisation_city) {
        this.city_on_map = JSON.parse(wbu_localisation_city);
      } //


      this.wbu_locality = localStorage.getItem("wbu_locality");
      this.wbu_route = localStorage.getItem("wbu_route");

      if (this.wbu_locality != "") {
        this.city_on_map = this.wbu_locality;
      } else if (this.wbu_route != "") {
        this.city_on_map = this.wbu_route;
      }
    },
    select_type_tab: function select_type_tab(index) {
      var self = this;

      if (this.blocks_type_livraisons[index]) {
        // on redefinitle type par defaut.
        this.active_type = this.blocks_type_livraisons[index]; //on desactive tout.

        for (var i in this.blocks_type_livraisons) {
          this.blocks_type_livraisons[i].active = false;
        } // on active le bon elment:


        this.blocks_type_livraisons[index].active = true;
        self.$emit("ev_change_type_livraison", self.active_type);
      } else {
        console.log("error");
      }
    },
    display_prise: function display_prise(price) {
      if (price == 0) {
        return "+0€";
      } else {
        return "+" + price + "€";
      }
    },
    select_default_type: function select_default_type() {
      for (var i in this.blocks_type_livraisons) {
        if (this.blocks_type_livraisons[i].active) {
          this.active_type = this.blocks_type_livraisons[i];
          this.$emit("ev_change_type_livraison", this.active_type);
          break;
        }
      }
    },
    setEvent: function setEvent() {
      var self = this; //console.log("init setEvent");

      $(document).on("adresseUpdate", function () {
        self.getValuesAdress();
      });
    },
    formatString: function formatString(str) {
      var regex = /\{\{(.*?)\}\}/g;
      var found;
      var int = 0;

      while ((found = regex.exec(str)) !== null && int < 10) {
        int++;
        var attr = found[1].trim(" ");
        str = str.replace(found[0], this.active_type[attr] ? this.active_type[attr] : "...");
      }

      return str;
    }
  },
  computed: {
    /**
     * Retourne le texte du bloc actif.
     */
    active_type_body: {
      get: function get() {
        if (this.active_type && this.active_type.body) {
          return this.formatString(this.active_type.body);
        } else {
          return "";
        }
      }
    }
  }
});
// CONCATENATED MODULE: ./src/App/TypeLivraison.vue?vue&type=script&lang=js&
 /* harmony default export */ var App_TypeLivraisonvue_type_script_lang_js_ = (TypeLivraisonvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/App/TypeLivraison.vue





/* normalize component */

var TypeLivraison_component = Object(componentNormalizer["a" /* default */])(
  App_TypeLivraisonvue_type_script_lang_js_,
  TypeLivraisonvue_type_template_id_59b308c1_render,
  TypeLivraisonvue_type_template_id_59b308c1_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var TypeLivraison = (TypeLivraison_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5da2cd20-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App/SelectionCreneau.vue?vue&type=template&id=9cbebd20&
var SelectionCreneauvue_type_template_id_9cbebd20_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row ml-md-4"},[_c('creneau',{ref:"collecte",attrs:{"title":_vm.collecte_title,"classes":_vm.collecte_livraison,"delai_jour":_vm.collecte_delai_jour,"jour_desactivee":_vm.collecte_jour_desactivee,"date_desactivee":_vm.collecte_date_desactivee,"interval":_vm.collecte_interval,"configs":_vm.collecte_configs,"current_date":_vm.collecte_current_date,"nombre_semaine":_vm.nombre_semaine,"nombre_res_creneau":_vm.nombre_res_creneau,"plage_heures_valide":_vm.plage_heures_valide,"disable_heureday":_vm.disable_heureday,"disable_heuredate":_vm.disable_heuredate,"url_get_creneau":_vm.url_get_creneau,"type_creneau":'collecte',"deccalage_creneau_depart":_vm.collecte_deccalage_creneau_depart,"filters":_vm.filters},on:{"ev_select_current_creneau":_vm.ev_select_current_creneau_collecte}}),_c('creneau',{ref:"livraison",attrs:{"title":_vm.title_livraison,"classes":_vm.classes_livraison,"delai_jour":_vm.livraison_delai_jour,"jour_desactivee":_vm.livraison_jour_desactivee,"date_desactivee":_vm.livraison_date_desactivee,"interval":_vm.livraison_interval,"configs":_vm.livraison_configs,"current_date":_vm.livraison_current_date,"nombre_semaine":_vm.nombre_semaine,"nombre_res_creneau":_vm.nombre_res_creneau,"plage_heures_valide":_vm.plage_heures_valide,"disable_heureday":_vm.disable_heureday,"disable_heuredate":_vm.disable_heuredate,"url_get_creneau":_vm.url_get_creneau,"type_creneau":'livraison',"filters":_vm.filters},on:{"ev_select_current_creneau":_vm.ev_select_current_creneau_livraison}})],1)}
var SelectionCreneauvue_type_template_id_9cbebd20_staticRenderFns = []


// CONCATENATED MODULE: ./src/App/SelectionCreneau.vue?vue&type=template&id=9cbebd20&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5da2cd20-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App/Creneau.vue?vue&type=template&id=77598d80&
var Creneauvue_type_template_id_77598d80_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.classes},[_c('div',{staticClass:"title-creneau h2",domProps:{"innerHTML":_vm._s(_vm.title)}}),_c('div',{staticClass:"d-flex justify-content-between justify-content-md-start line-creneau h1"},[_c('Hours',{attrs:{"app_date_utilisable_string_hour":_vm.date_string_generate_by_calendar,"h_debut":_vm.h_debut,"m_debut":_vm.m_debut,"h_fin":_vm.h_fin,"m_fin":_vm.m_fin,"plage_heures_valide":_vm.plage_heures_valide,"filters":_vm.filters,"configs":_vm.configs,"type_creneau":_vm.type_creneau,"deccalage_creneau_depart":_vm.deccalage_creneau_depart},on:{"select_creneau":_vm.select_creneau,"select_next_day":_vm.select_next_day}}),_c('i',{staticClass:"icone-svg mb-md-1 mb-lg-2 cursor-pointer",on:{"click":_vm.display_hide_calandar}},[_c('svg-calandear')],1)],1),_c('p',{staticClass:"cursor-pointer",on:{"click":_vm.display_hide_calandar}},[_vm._v(" "+_vm._s(_vm.app_date_display)+" ")]),(_vm.show_calandar)?_c('div',{staticClass:"over-container-date",on:{"click":_vm.display_hide_calandar}}):_vm._e(),_c('calendar',{directives:[{name:"show",rawName:"v-show",value:(_vm.show_calandar),expression:"show_calandar"}],ref:"calendar",attrs:{"app_date_utilisable_string_hour":_vm.app_date_utilisable_string_hour,"filters":_vm.filters,"jour_desactivee":_vm.jour_desactivee,"nombre_semaine":_vm.nombre_semaine,"type_creneau":_vm.type_creneau,"rebuild_creneau":_vm.rebuild_creneau},on:{"select_date":_vm.select_date_calendar,"close_calendar":function($event){_vm.show_calandar = false}}})],1)}
var Creneauvue_type_template_id_77598d80_staticRenderFns = []


// CONCATENATED MODULE: ./src/App/Creneau.vue?vue&type=template&id=77598d80&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5da2cd20-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App/SvgCalandar.vue?vue&type=template&id=66c27226&
var SvgCalandarvue_type_template_id_66c27226_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('svg',{staticStyle:{"enable-background":"new 0 0 122.88 122.88"},attrs:{"version":"1.1","id":"Layer_1","xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","x":"0px","y":"0px","viewBox":"0 0 122.88 122.88","xml:space":"preserve"}},[_c('g',[_c('path',{attrs:{"d":"M81.61,4.73c0-2.61,2.58-4.73,5.77-4.73c3.19,0,5.77,2.12,5.77,4.73v20.72c0,2.61-2.58,4.73-5.77,4.73 c-3.19,0-5.77-2.12-5.77-4.73V4.73L81.61,4.73z M66.11,103.81c-0.34,0-0.61-1.43-0.61-3.2c0-1.77,0.27-3.2,0.61-3.2H81.9 c0.34,0,0.61,1.43,0.61,3.2c0,1.77-0.27,3.2-0.61,3.2H66.11L66.11,103.81z M15.85,67.09c-0.34,0-0.61-1.43-0.61-3.2 c0-1.77,0.27-3.2,0.61-3.2h15.79c0.34,0,0.61,1.43,0.61,3.2c0,1.77-0.27,3.2-0.61,3.2H15.85L15.85,67.09z M40.98,67.09 c-0.34,0-0.61-1.43-0.61-3.2c0-1.77,0.27-3.2,0.61-3.2h15.79c0.34,0,0.61,1.43,0.61,3.2c0,1.77-0.27,3.2-0.61,3.2H40.98 L40.98,67.09z M66.11,67.09c-0.34,0-0.61-1.43-0.61-3.2c0-1.77,0.27-3.2,0.61-3.2H81.9c0.34,0,0.61,1.43,0.61,3.2 c0,1.77-0.27,3.2-0.61,3.2H66.11L66.11,67.09z M91.25,67.09c-0.34,0-0.61-1.43-0.61-3.2c0-1.77,0.27-3.2,0.61-3.2h15.79 c0.34,0,0.61,1.43,0.61,3.2c0,1.77-0.27,3.2-0.61,3.2H91.25L91.25,67.09z M15.85,85.45c-0.34,0-0.61-1.43-0.61-3.2 c0-1.77,0.27-3.2,0.61-3.2h15.79c0.34,0,0.61,1.43,0.61,3.2c0,1.77-0.27,3.2-0.61,3.2H15.85L15.85,85.45z M40.98,85.45 c-0.34,0-0.61-1.43-0.61-3.2c0-1.77,0.27-3.2,0.61-3.2h15.79c0.34,0,0.61,1.43,0.61,3.2c0,1.77-0.27,3.2-0.61,3.2H40.98 L40.98,85.45z M66.11,85.45c-0.34,0-0.61-1.43-0.61-3.2c0-1.77,0.27-3.2,0.61-3.2H81.9c0.34,0,0.61,1.43,0.61,3.2 c0,1.77-0.27,3.2-0.61,3.2H66.11L66.11,85.45z M91.25,85.45c-0.34,0-0.61-1.43-0.61-3.2c0-1.77,0.27-3.2,0.61-3.2h15.79 c0.34,0,0.61,1.43,0.61,3.2c0,1.77-0.27,3.2-0.61,3.2H91.25L91.25,85.45z M15.85,103.81c-0.34,0-0.61-1.43-0.61-3.2 c0-1.77,0.27-3.2,0.61-3.2h15.79c0.34,0,0.61,1.43,0.61,3.2c0,1.77-0.27,3.2-0.61,3.2H15.85L15.85,103.81z M40.98,103.81 c-0.34,0-0.61-1.43-0.61-3.2c0-1.77,0.27-3.2,0.61-3.2h15.79c0.34,0,0.61,1.43,0.61,3.2c0,1.77-0.27,3.2-0.61,3.2H40.98 L40.98,103.81z M29.61,4.73c0-2.61,2.58-4.73,5.77-4.73s5.77,2.12,5.77,4.73v20.72c0,2.61-2.58,4.73-5.77,4.73 s-5.77-2.12-5.77-4.73V4.73L29.61,4.73z M6.4,45.32h110.07V21.47c0-0.8-0.33-1.53-0.86-2.07c-0.53-0.53-1.26-0.86-2.07-0.86H103 c-1.77,0-3.2-1.43-3.2-3.2c0-1.77,1.43-3.2,3.2-3.2h10.55c2.57,0,4.9,1.05,6.59,2.74c1.69,1.69,2.74,4.02,2.74,6.59v27.06v65.03 c0,2.57-1.05,4.9-2.74,6.59c-1.69,1.69-4.02,2.74-6.59,2.74H9.33c-2.57,0-4.9-1.05-6.59-2.74C1.05,118.45,0,116.12,0,113.55V48.52 V21.47c0-2.57,1.05-4.9,2.74-6.59c1.69-1.69,4.02-2.74,6.59-2.74H20.6c1.77,0,3.2,1.43,3.2,3.2c0,1.77-1.43,3.2-3.2,3.2H9.33 c-0.8,0-1.53,0.33-2.07,0.86c-0.53,0.53-0.86,1.26-0.86,2.07V45.32L6.4,45.32z M116.48,51.73H6.4v61.82c0,0.8,0.33,1.53,0.86,2.07 c0.53,0.53,1.26,0.86,2.07,0.86h104.22c0.8,0,1.53-0.33,2.07-0.86c0.53-0.53,0.86-1.26,0.86-2.07V51.73L116.48,51.73z M50.43,18.54 c-1.77,0-3.2-1.43-3.2-3.2c0-1.77,1.43-3.2,3.2-3.2h21.49c1.77,0,3.2,1.43,3.2,3.2c0,1.77-1.43,3.2-3.2,3.2H50.43L50.43,18.54z"}})])])])}
var SvgCalandarvue_type_template_id_66c27226_staticRenderFns = []


// CONCATENATED MODULE: ./src/App/SvgCalandar.vue?vue&type=template&id=66c27226&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App/SvgCalandar.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var SvgCalandarvue_type_script_lang_js_ = ({
  name: "SvgCalandar"
});
// CONCATENATED MODULE: ./src/App/SvgCalandar.vue?vue&type=script&lang=js&
 /* harmony default export */ var App_SvgCalandarvue_type_script_lang_js_ = (SvgCalandarvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/App/SvgCalandar.vue





/* normalize component */

var SvgCalandar_component = Object(componentNormalizer["a" /* default */])(
  App_SvgCalandarvue_type_script_lang_js_,
  SvgCalandarvue_type_template_id_66c27226_render,
  SvgCalandarvue_type_template_id_66c27226_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SvgCalandar = (SvgCalandar_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5da2cd20-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App/calendar.vue?vue&type=template&id=117b6b43&
var calendarvue_type_template_id_117b6b43_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container-date flat cercle"},[_c('div',{staticClass:"single-date-picker__calendar-month-header"},[_c('div',{staticClass:"single-date-picker__arrow left",on:{"click":function($event){return _vm.toggleMonth(-1)}}}),(_vm.calandar_title != '')?_c('div',{staticClass:"single-date-picker__year",domProps:{"innerHTML":_vm._s(_vm.calandar_title)}}):_vm._e(),_c('div',{staticClass:"single-date-picker__arrow right",on:{"click":function($event){return _vm.toggleMonth(1)}}})]),_c('ul',{staticClass:"d-flex flex-wrap justify-content-center"},[(_vm.show_day_label)?_c('div',{staticClass:"d-flex flex-wrap justify-content-center w-100"},[_c('li',{staticClass:"date day"},[_vm._v(" Lun ")]),_c('li',{staticClass:"date day"},[_vm._v(" Mar ")]),_c('li',{staticClass:"date day"},[_vm._v(" Mer ")]),_c('li',{staticClass:"date day"},[_vm._v(" Jeu ")]),_c('li',{staticClass:"date day"},[_vm._v(" Ven ")]),_c('li',{staticClass:"date day"},[_vm._v(" Sam ")]),_c('li',{staticClass:"date day"},[_vm._v(" Dim ")])]):_vm._e(),_vm._l((_vm.list_calander_days),function(date,i){return _c('li',{key:i,class:[
        'date',
        date.status ? 'disable' : 'actif',
        date.custom_class,
        date.select ? 'selected' : ''
      ],on:{"click":function($event){return _vm.select_date(date)}}},[(_vm.show_month_in_date)?_c('span',{domProps:{"innerHTML":_vm._s(date.day_french)}}):_vm._e(),(!_vm.show_month_in_date)?_c('span',{domProps:{"innerHTML":_vm._s(date.date_month)}}):_vm._e()])})],2)])}
var calendarvue_type_template_id_117b6b43_staticRenderFns = []


// CONCATENATED MODULE: ./src/App/calendar.vue?vue&type=template&id=117b6b43&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("d4ec");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__("bee2");

// CONCATENATED MODULE: ./src/App/Filtres.js





if (window.moment) {
  var moment = window.moment;
}

var Filters = {
  /**
   * Elle permet de determiner le prochain jour disponible, en passant par la function
   * getDayUtilisable.
   * si sa valeur est à 1, on applique le delai
   */
  apply__app_delai_jour: true,

  /**
   * Permet de reduire le temps d'execution des creneaux.
   * contient les dates desactivés due à filter.date_desactivee
   */
  filter_date_desactivee: {},

  /**
   * Permet de reduire le temps d'execution des creneaux.
   * contient les dates desactivés due à filter.periode_desactivee
   */
  filter_periode_desactivee: {},
  attri_filters: ["jours_select", "date_desactivee", "periode_desactivee"],

  /**
   * Permet de verifier si la plage d'heure selectionne est inclus ou partielment inclut dans le creneau.
   * cette function est utilisé uniquement lors du passage des creneaux.
   * tests:
   * il faut desactiver, une plage inferieur au creneau, à l'intervalle entre deux creneau.
   * egal ------
   * superieur ------
   * NB:il manque une 4 condition.
   * L'execution est importante.
   */
  HourIntervalContain: function HourIntervalContain(heure_begin_disable, heure_end_disable, creneaux_heure_begin, creneaux_heure_end, date_min_string) {
    var h_d = heure_begin_disable.split(":");
    var date_min = moment(date_min_string, "DD-MM-YYYY HH:mm:ss");
    date_min.hours(h_d[0]);
    date_min.minutes(h_d[1]); //

    var h_f = heure_end_disable.split(":");
    var date_max = moment(date_min_string, "DD-MM-YYYY HH:mm:ss");
    date_max.hours(h_f[0]);
    date_max.minutes(h_f[1]); //

    var time_H_B_min = creneaux_heure_begin.diff(date_min, "minutes");
    var time_H_B_max = creneaux_heure_begin.diff(date_max, "minutes");
    var time_H_E_min = creneaux_heure_end.diff(date_min, "minutes");
    var time_H_E_max = creneaux_heure_end.diff(date_max, "minutes"); //console.log("time_H_B_min : ", time_H_B_min);
    //console.log("time_H_E_max : ", time_H_E_max);

    if (time_H_B_min >= 0 && time_H_B_max < 0 || time_H_E_min > 0 && time_H_E_max <= 0 || time_H_B_min < 0 && time_H_E_max >= 0) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * On verifie que un ou plusieurs sont selectionnées.
   * si nous sommes un jour inclut dans la liste on retourne true,
   * si non on retourne false,
   * si le tableau est vide, on retourne true.
   * @return true si la date ou le creneau doivent etre desactiver et false sinon.
   * NB: jours_select ne doit pas etre vide.
   */
  JourSelect: function JourSelect(jours_select, app_date_current_indice) {
    return new Promise(function (resolv) {
      for (var i in jours_select) {
        if (jours_select[i] === app_date_current_indice) {
          resolv(true);
          return;
        }

        var ii = parseInt(i) + 1;

        if (jours_select.length === ii) {
          resolv(false);
          return;
        }
      }
    });
  },

  /**
   * Permet de filtrer en function de la date.
   * ( il faudra verifier que l'attribut filter.dates_disable nest plus definit )
   * Pour les dates, le scenario est peu different, car si on ne trouve pas une date
   * = à la date encour et que filter.periode_desactivee n'est pas definit on doit verifier
   * le niveau inferieur qui doit etre absolument filter.periode_desactive.
   * @return true si la date ou le creneau doivent etre desactiver et false sinon.
   */
  DateDesactivee: function DateDesactivee(i, date_desactivee, app_date_current_string_en) {
    var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "date";
    var self = this;
    return new Promise(function (resolv) {
      var CheckDateDesactivee = function CheckDateDesactivee() {
        return new Promise(function (resolv2) {
          for (var _i in date_desactivee) {
            if (date_desactivee[_i].date === app_date_current_string_en) {
              resolv2(true);
              return;
            }

            var ii = parseInt(_i) + 1;

            if (date_desactivee.length === ii) {
              resolv2(false);
              return;
            }
          }
        });
      };

      if (type === "date") {
        CheckDateDesactivee().then(function (status) {
          resolv(status);
        });
      } else {
        if (self.filter_date_desactivee[i] && self.filter_date_desactivee[i][app_date_current_string_en]) {
          resolv(self.filter_date_desactivee[i][app_date_current_string_en].status);
          return;
        } else {
          CheckDateDesactivee().then(function (status) {
            if (!self.filter_date_desactivee[i]) {
              self.filter_date_desactivee[i] = {};
            }

            self.filter_date_desactivee[i][app_date_current_string_en] = {
              status: status
            };
            console.log("DateDesactivee +++");
            resolv(status);
          });
        }
      }
    });
  },

  /**
   * Permet de filtrer en function de la periode.
   * un remarque importante, on a pas besoin de tester pour tous les creneaux. 1 seul suffit,
   * on chosit de sauvegarder, le status du test dans l'object filter.periode_desactivee
   * On utilise self.app_date_current pour verifier la periode, or cette date contient l'heure,mm, ce qui va entrainer un deccalage.
   * donc, pour combler ce deccalage, on utilisera < 1 ou > 1
   * @param i index loop
   * @param periode_desactivee Array
   * @param app_date_current moment() format "YYYY-MM-DD";
   * @param app_date_current_string_en String format "YYYY-MM-DD"
   * @param type String
   */
  PeriodeDesactivee: function PeriodeDesactivee(i, periode_desactivee, app_date_current, app_date_current_string_en) {
    var type = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "date";
    var self = this;
    return new Promise(function (resolv) {
      var CheckPeriodeDesactivee = function CheckPeriodeDesactivee() {
        return new Promise(function (resolv2) {
          for (var _i2 in periode_desactivee) {
            var periode = periode_desactivee[_i2];
            var date_min = moment(periode.debut, "YYYY-MM-DD");
            var date_max = moment(periode.fin, "YYYY-MM-DD");

            if (app_date_current.diff(date_min, "days") >= 0 && app_date_current.diff(date_max, "days") <= 0) {
              resolv2(true);
              return;
            }

            var ii = parseInt(_i2) + 1;

            if (periode_desactivee.length === ii) {
              resolv2(false);
              return;
            }
          }
        });
      };

      if (type === "date") {
        CheckPeriodeDesactivee().then(function (status) {
          resolv(status);
        });
      } else {
        if (self.filter_periode_desactivee[i] && self.filter_periode_desactivee[i][app_date_current_string_en]) {
          resolv(self.filter_periode_desactivee[i][app_date_current_string_en].status);
          return;
        } else {
          CheckPeriodeDesactivee().then(function (status) {
            if (!self.filter_periode_desactivee[i]) {
              self.filter_periode_desactivee[i] = {};
            }

            self.filter_periode_desactivee[i][app_date_current_string_en] = {
              status: status
            };
            resolv(status);
          });
        }
      }
    });
  },

  /**
   * on attend la fin de boucle filter, pour faire une sauvegarde tempon.
   */
  saveData: function saveData(result, i, app_date_current_string_en) {
    var self = this;

    if (result.verificateur === "date_desactivee") {
      if (!self.filter_date_desactivee[i]) {
        self.filter_date_desactivee[i] = {};
      }

      self.filter_date_desactivee[i][app_date_current_string_en] = {
        status: result.status
      };
    } else if (result.verificateur === "periode_desactivee") {
      if (self.filter_periode_desactivee[i]) {
        self.filter_periode_desactivee[i] = {};
      }

      self.filter_periode_desactivee[i][app_date_current_string_en] = {
        status: result.status
      };
    }
  },
  loopAttribFilter: function loopAttribFilter(i, filter, app_date_current_en, app_date_current_string_en, index_day, typefilter) {
    var _this = this;

    var attri_index = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var status = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
    return new Promise(function (resolv) {
      if (filter[_this.attri_filters[attri_index]].length) {
        switch (_this.attri_filters[attri_index]) {
          case "jours_select":
            _this.JourSelect(filter.jours_select, index_day).then(function (stateJourSelect) {
              if (!stateJourSelect) {
                resolv({
                  status: stateJourSelect,
                  i: i,
                  verificateur: "jours_select"
                });
                return;
              } else {
                var ii = attri_index + 1;

                if (ii < _this.attri_filters.length) {
                  resolv(_this.loopAttribFilter(i, filter, app_date_current_en, app_date_current_string_en, index_day, typefilter, ii, stateJourSelect));
                } else {
                  resolv({
                    status: stateJourSelect,
                    i: i,
                    verificateur: _this.attri_filters[attri_index]
                  });
                }
              }
            });

            break;

          case "date_desactivee":
            _this.DateDesactivee(i, filter.date_desactivee, app_date_current_string_en, typefilter).then(function (stateDateDesactivee) {
              // Si la valeur est true, => la date doit etre desactiver.
              if (stateDateDesactivee) {
                resolv({
                  status: stateDateDesactivee,
                  i: i,
                  verificateur: "date_desactivee"
                });
                return;
              } else {
                var ii = attri_index + 1;

                if (ii < _this.attri_filters.length) {
                  resolv(_this.loopAttribFilter(i, filter, app_date_current_en, app_date_current_string_en, index_day, typefilter, ii, stateDateDesactivee));
                } else {
                  resolv({
                    status: stateDateDesactivee,
                    i: i,
                    verificateur: _this.attri_filters[attri_index]
                  });
                }
              }
            });

            break;

          case "periode_desactivee":
            _this.PeriodeDesactivee(i, filter.periode_desactivee, app_date_current_en, app_date_current_string_en, typefilter).then(function (statePeriodeDesactivee) {
              if (statePeriodeDesactivee) {
                resolv({
                  status: statePeriodeDesactivee,
                  i: i,
                  verificateur: "periode_desactivee"
                });
                return;
              } else {
                var ii = attri_index + 1;

                if (ii < _this.attri_filters.length) {
                  resolv(_this.loopAttribFilter(i, filter, app_date_current_en, app_date_current_string_en, index_day, typefilter, ii, statePeriodeDesactivee));
                } else {
                  resolv({
                    status: statePeriodeDesactivee,
                    i: i,
                    verificateur: _this.attri_filters[attri_index]
                  });
                }
              }
            });

            break;

          default:
            resolv({
              status: status,
              i: i,
              verificateur: "non definit"
            });
        }
      } else {
        var ii = attri_index + 1;

        if (ii < _this.attri_filters.length) {
          resolv(_this.loopAttribFilter(i, filter, app_date_current_en, app_date_current_string_en, index_day, typefilter, ii, status));
        } else {
          resolv({
            status: status,
            i: i,
            verificateur: "non definit END"
          });
        }
      }
    });
  }
};
/* harmony default export */ var Filtres = (Filters);
// CONCATENATED MODULE: ./src/App/AppResoucesBuildCreneaux.js








 //import FFilter from "./FonctionFiltre";

if (window.moment) {
  var AppResoucesBuildCreneaux_moment = window.moment;
}

var AppResoucesBuildCreneaux_BuildCreneaux = /*#__PURE__*/function () {
  function BuildCreneaux(app_date_utilisable_string, app_date_utilisable_string_hour, h_debut, m_debut, h_fin, m_fin, plage_heures_valide, app_interval, app_delai_next_creneau, filters, deccalage_creneau_depart) {
    Object(classCallCheck["a" /* default */])(this, BuildCreneaux);

    this.app_date_utilisable_string = app_date_utilisable_string;
    this.app_date_utilisable_string_hour = app_date_utilisable_string_hour;
    this.h_debut = h_debut;
    this.m_debut = m_debut;
    this.h_fin = h_fin;
    this.m_fin = m_fin;
    this.plage_heures_valide = plage_heures_valide;
    this.app_interval = app_interval;
    this.app_delai_next_creneau = app_delai_next_creneau;
    this.filters = filters;
    this.deccalage_creneau_depart = deccalage_creneau_depart; //

    this.date_max = null;
    this.data_min = null;
    this.list_creneaux = [];
    this.test_creneau = 0;
    this.current_creneau = null;
    /**
     * Permet de limiter le nombre de passage auto vers la prochaine date.
     * à l'initialisation on definit une valeur et on decremente.
     */

    this.test_auto_select_next_day = 99;
    this.app_date_utilisable = AppResoucesBuildCreneaux_moment(app_date_utilisable_string, "DD-MM-YYYY");
    this.app_date_utilisable_hour = AppResoucesBuildCreneaux_moment(app_date_utilisable_string_hour, "DD-MM-YYYY HH:mm:ss");
    this.checkIsApplay = false;
  }
  /**
   * Action : construit les creneaux à partir de la date definit ou choist par l'utilisateur.
   * Creer les dates min et max du jour utilisable par l'application.
   * La paramettre date doit etre un object moment.
   */


  Object(createClass["a" /* default */])(BuildCreneaux, [{
    key: "dateBorne",
    value: function () {
      var _dateBorne = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var h_debut, m_debut, h_fin, m_fin, day_indice, h_d, h_f;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // On ne pas utiliser directement la valeur de date pour crrer la valeur de min et max date, car vuejs concerve
                // la meme valeur entre les variables la MAJ d'une mettra automatiquement la suivante.
                this.data_min = AppResoucesBuildCreneaux_moment(this.app_date_utilisable_string, "DD-MM-YYYY");
                this.date_max = AppResoucesBuildCreneaux_moment(this.app_date_utilisable_string, "DD-MM-YYYY");

                if (this.date_max.isValid()) {
                  h_debut = this.h_debut;
                  m_debut = this.m_debut;
                  h_fin = this.h_fin;
                  m_fin = this.m_fin;
                  day_indice = this.date_max.day(); //surcharge la valeur par defaut avec celle definit en configuration

                  if (this.plage_heures_valide.length > 0) {
                    if (this.plage_heures_valide[day_indice]) {
                      h_d = this.plage_heures_valide[day_indice].debut.split(":");
                      h_debut = parseInt(h_d[0]);
                      m_debut = parseInt(h_d[1]);
                      h_f = this.plage_heures_valide[day_indice].fin.split(":");
                      h_fin = parseInt(h_f[0]);
                      m_fin = parseInt(h_f[1]);
                    }
                  }

                  this.data_min.hours(h_debut);
                  this.data_min.minutes(m_debut);
                  this.data_min.seconds(0); //

                  this.date_max.hours(h_fin);
                  this.date_max.minutes(m_fin);
                  this.date_max.seconds(0);
                }

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function dateBorne() {
        return _dateBorne.apply(this, arguments);
      }

      return dateBorne;
    }()
    /**
     * Contruit les plages d'heures.
     * on vide le creneau
     * Parametres : h_debut( heure de debut), h_fin (heure de fin, ), interval.
     * @public
     */

  }, {
    key: "buildHour",
    value: function () {
      var _buildHour = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.data_min) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return this.getIntervalUtilisable(this.data_min);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function buildHour() {
        return _buildHour.apply(this, arguments);
      }

      return buildHour;
    }()
    /**
     * date_min_strin est un string.
     * @private
     */

  }, {
    key: "getIntervalUtilisable",
    value: function getIntervalUtilisable(date_min_string) {
      var self = this;
      return new Promise(function (resolve, reject) {
        self.test_creneau++;

        if (self.test_creneau > 99) {
          alert("Probleme de configuration : Creneau");
          reject(false);
          return false;
        }

        var bloc_date = {};
        var date_time = AppResoucesBuildCreneaux_moment(date_min_string, "DD-MM-YYYY HH:mm:ss");
        var date_time_end = AppResoucesBuildCreneaux_moment(date_min_string, "DD-MM-YYYY HH:mm:ss").add(self.app_interval, "minutes");
        var date_time_next_creneau = AppResoucesBuildCreneaux_moment(date_min_string, "DD-MM-YYYY HH:mm:ss").add(self.app_delai_next_creneau, "minutes");
        bloc_date.begin = date_time.format("HH:mm"); //

        self.checkIsCreneauValide(date_time, date_time_end, date_min_string).then( /*#__PURE__*/function () {
          var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(valeur) {
            var filter;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    bloc_date.$isDisabled = false;
                    bloc_date.checkstatus = "none"; // la date est desactivé.

                    if (!valeur.status) {
                      _context3.next = 7;
                      break;
                    }

                    bloc_date.$isDisabled = true;
                    bloc_date.checkstatus = valeur.verificateur;
                    _context3.next = 11;
                    break;

                  case 7:
                    _context3.next = 9;
                    return self.ApplyFilters(date_time, date_time_end, date_min_string);

                  case 9:
                    filter = _context3.sent;

                    if (filter.status) {
                      bloc_date.$isDisabled = filter.status;
                      bloc_date.checkstatus = filter.verificateur;
                    }

                  case 11:
                    if (self.date_max.diff(date_time_end, "minutes") >= 0) {
                      bloc_date.end = date_time_end.format("HH:mm");

                      if (!bloc_date.$isDisabled) {
                        self.list_creneaux.push(bloc_date);
                      }

                      resolve(self.getIntervalUtilisable(date_time_next_creneau.format("DD-MM-YYYY HH:mm:ss")));
                    } else {
                      resolve(true);
                    }

                  case 12:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
      });
    }
    /**
     * Permet de detecter si une plage doit etre desactiver
     * @param creneaux_heure_begin moment()
     * @param creneaux_heure_end moment()
     * @param date_min_string String : Valeur string du creneau de depart.
     *
     */

  }, {
    key: "checkIsCreneauValide",
    value: function checkIsCreneauValide(creneaux_heure_begin, creneaux_heure_end, date_min_string) {
      var _this = this;

      var self = this;
      return new Promise(function (resolve) {
        // on desactive les creneaux qui ont une heure depassé. example s'il est 10h00,
        // les creneaux en dessous doivent etre desactivées.
        var fidfl = creneaux_heure_begin.diff(_this.app_date_utilisable_hour, "minutes");

        if (fidfl < 0) {
          resolve({
            status: true,
            verificateur: "heure depassé"
          });
        } else {
          /**
           * Effectue le decallage si cela est necessaire.
           * le decallage s'applique si l'heure fournit par le serveur (heure actuel)
           * est inferieur à l'heure MIN de l'application plus la valeur du decallage.
           * Example 1 : il est 7h25, on a definit un decallage de 30. (les autres valeurs par defaut);
           * ==> Le premier creneau commence à 8h00, car (7h25 + 30 = 7h55)
           * Example 2 : il est 7h37, on a definit un decallage de 30. (les autres valeurs par defaut);
           * ==> Le premier creneau commence à 8h30, car (7h37 + 30 = 8h07.
              Nous avons un ecart de 30 minutes entres les creneaux.
              Aucun creneau ne commnceà 08h07, donc nous prennons le prochain creneau valide.
              ),
           */
          var disable_for_deccalage = function disable_for_deccalage() {
            return new Promise(function (resolv) {
              if (self.deccalage_creneau_depart > 0) {
                var date_min = AppResoucesBuildCreneaux_moment(self.app_date_utilisable_string_hour, "DD-MM-YYYY HH:mm:ss");
                date_min.add(self.deccalage_creneau_depart, "minutes");
                var diff = creneaux_heure_begin.diff(date_min, "minutes");

                if (diff < 0) {
                  resolv(true);
                } else {
                  resolv(false);
                }
              } else {
                resolv(false);
              }
            });
          }; //


          disable_for_deccalage().then(function (deccalage) {
            if (deccalage) {
              resolve({
                status: true,
                verificateur: "disable_for_deccalage"
              });
              return true;
            } else {
              resolve({
                status: false,
                verificateur: "none",
                creneaux_heure_end: creneaux_heure_end,
                date_min_string: date_min_string
              });
              return false;
            }
          });
        }
      });
    }
    /**
     * Applique le filtre sur chaque creneau ou chaque date.
     * On retourne true si le creneau doit etre desactiver.
     */

  }, {
    key: "ApplyFilters",
    value: function ApplyFilters(creneaux_heure_begin, creneaux_heure_end, date_min_string) {
      var self = this;
      return new Promise(function (resolvEnd) {
        if (self.filters.length === 0) {
          resolvEnd({
            status: false,
            verificateur: "filter empty"
          });
          return;
        }

        var CustomLoop = function CustomLoop() {
          var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          return new Promise(function (resolv) {
            var filter = self.filters[i];

            if (filter.h_debut !== "" && filter.h_fin !== "") {
              if (Filtres.HourIntervalContain(filter.h_debut, filter.h_fin, creneaux_heure_begin, creneaux_heure_end, date_min_string)) {
                Filtres.loopAttribFilter(i, filter, self.app_date_utilisable, self.app_date_utilisable.format("YYYY-MM-DD"), self.app_date_utilisable.day(), "creneau").then(function (result) {
                  resolv(result);
                });
              } else {
                resolv({
                  status: false,
                  i: i,
                  verificateur: "plage_heure"
                });
              }
            } else {
              resolv({
                status: false,
                i: i,
                verificateur: "nothing"
              });
            }
          });
        };

        var execution = function execution() {
          var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          CustomLoop(i).then(function (result) {
            var ii = result.i + 1;

            if (result.status) {
              resolvEnd(result);
              return;
            } else if (self.filters[ii]) {
              execution(ii);
            } else {
              resolvEnd(result);
              return;
            }
          });
        };

        execution();
      });
    }
  }]);

  return BuildCreneaux;
}();


// CONCATENATED MODULE: ./src/App/FonctionFiltre.js





if (window.moment) {
  var FonctionFiltre_moment = window.moment;
}


var FFilter = {
  jour_desactivee: [],
  type_creneau: "",
  app_date: {},
  //app_date_current: {},
  datetime_min: {},
  filters: [],

  /**
   * @param date object moment
   * Return true si la date doit etre desactivée, et false sinon.
   */
  ValidationDay: function ValidationDay(date) {
    var self = this;

    if (!(self.app_date && self.app_date.isValid()) || !(self.datetime_min && self.datetime_min.isValid())) {
      throw "La variable self.app_date|self.datetime_min est requise";
    }

    return new Promise(function (resolvEnd) {
      var index_day = date.day();
      /*
      if (self.type_creneau === "livraison")
        console.log(
          "ValidationDay : ",
          "\n",
          "date selectionée : ",
          self.datetime_min.format("DD-MM-YYYY HH:mm:ss"),
          "\n",
          self.app_date.format("DD-MM-YYYY HH:mm:ss"),
          "\n",
          date.format("DD-MM-YYYY HH:mm:ss")
        );
      /**/
      // Desactivation du jour avant la date min.

      if (date.diff(self.app_date, "minutes") < 0) {
        resolvEnd({
          status: true,
          custom_class: "default-disable-app-date"
        });
      } //
      else if (date.diff(self.datetime_min, "days") < 0 && self.type_creneau === "livraison") {
          /*
          console.log(
            'date.diff(self.datetime_min, "days") ',
            date.diff(self.datetime_min, "days")
          );
          /**/
          resolvEnd({
            status: true,
            custom_class: "default-disable-livraison"
          });
        } // Desactivation du jour en function des jours selectionnées.
        else if (self.jour_desactivee.length && self.jour_desactivee.includes(index_day)) {
            resolvEnd({
              status: true,
              custom_class: "jour_desactivee"
            });
            return;
          } // Desactivation du jour en function des filtres.
          else if (self.filters.length === 0) {
              resolvEnd({
                status: false,
                custom_class: "filter empty"
              });
              return;
            } else {
              resolvEnd(self.DisableDateByfilter(date));
            }
    });
  },
  DisableDateByfilter: function DisableDateByfilter(date) {
    var self = this;
    return new Promise(function (resolvEnd) {
      var index_day = date.day();
      var app_date_current_string_en = date.format("YYYY-MM-DD");
      var app_date_current_en = FonctionFiltre_moment(app_date_current_string_en, "YYYY-MM-DD"); // Desactivation du jour en function des filtres.

      var CustomLoop = function CustomLoop() {
        var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        return new Promise(function (resolv) {
          var filter = self.filters[i];

          if (filter.h_debut.length === 0 && filter.h_fin.length === 0) {
            Filtres.loopAttribFilter(i, filter, app_date_current_en, app_date_current_string_en, index_day, "date").then(function (result) {
              result.custom_class = "filtre-" + i + " " + result.verificateur;
              resolv(result);
            });
          } else {
            resolv({
              status: false,
              i: i,
              custom_class: "nothing"
            });
          }
        });
      };

      var execution = function execution() {
        var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        CustomLoop(i).then(function (result) {
          var ii = result.i + 1;

          if (result.status) {
            resolvEnd(result);
            return;
          } else if (self.filters[ii]) {
            execution(ii);
          } else {
            resolvEnd(result);
            return;
          }
        });
      };

      execution();
    });
  }
};
/* harmony default export */ var FonctionFiltre = (FFilter);
// CONCATENATED MODULE: ./src/App/AppResoucesBuildCalendar.js








if (window.moment) {
  var AppResoucesBuildCalendar_moment = window.moment;
}

var AppResoucesBuildCalendar_BuildCalendar = /*#__PURE__*/function () {
  function BuildCalendar(app_date_utilisable_string, calendar_nav, nombre_semaine, jour_desactivee, type_creneau, filters, date_select) {
    Object(classCallCheck["a" /* default */])(this, BuildCalendar);

    this.app_date_utilisable_string = app_date_utilisable_string;
    this.calendar_nav = calendar_nav;
    this.nombre_semaine = nombre_semaine;
    this.jour_desactivee = jour_desactivee;
    this.type_creneau = type_creneau;
    this.filters = filters;
    this.date_select = date_select; //

    this.list_calander_days = [];
    this.test_calandar_day = 0;
    this.app_date_utilisable = AppResoucesBuildCalendar_moment(app_date_utilisable_string, "DD-MM-YYYY");
    this.datetime_min = AppResoucesBuildCalendar_moment(app_date_utilisable_string, "DD-MM-YYYY"); //permet de savoir si une date a été selectionner ?

    this.selectedDate = false;
  }
  /**
   * le calendrier demarre toujours un lunid.
   * Lundi(index) = 1
   * Saturday = 6
   * Sunday = 0;
   */


  Object(createClass["a" /* default */])(BuildCalendar, [{
    key: "builderCalandar",
    value: function () {
      var _builderCalandar = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var calander_day_min, calender_day_max, nJr, day_current_index, week_index, additional_day_to_remove, i, day_remove;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                calander_day_min = AppResoucesBuildCalendar_moment(this.app_date_utilisable_string, "DD-MM-YYYY").add(this.calendar_nav, "month");
                calender_day_max = AppResoucesBuildCalendar_moment(this.app_date_utilisable_string, "DD-MM-YYYY").add(this.calendar_nav, "month");
                nJr = this.nombre_semaine * 7;
                day_current_index = calander_day_min.day();

                if (!day_current_index) {
                  day_current_index = 7;
                } //on recupère l'index du weekend du jour encour pour calculer le additional_day_to_remove


                week_index = this.weekOfMonth(AppResoucesBuildCalendar_moment(this.app_date_utilisable_string, "DD-MM-YYYY"));
                additional_day_to_remove = 0;

                for (i = 1; i < week_index; i++) {
                  additional_day_to_remove += 7;
                }

                day_remove = 6 + day_current_index - 7 + additional_day_to_remove;

                if (day_remove > 0) {
                  nJr -= day_remove;
                  calander_day_min.add(-day_remove, "days");
                }

                calender_day_max.add(nJr, "days");
                /**/

                _context.next = 13;
                return this.getPlageDate(calander_day_min, calender_day_max);

              case 13:
                if (!self.selectedDate) {//this.date_select;
                }

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function builderCalandar() {
        return _builderCalandar.apply(this, arguments);
      }

      return builderCalandar;
    }()
  }, {
    key: "setDate",
    value: function setDate(day_min_sting, calander_day, stateValidationDay) {
      var StatusSelectDate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      return {
        date_string: day_min_sting,
        day_french: calander_day.locale("fr").format("Do <br /> MMM"),
        date_month: calander_day.locale("fr").format("DD"),
        custom_class: stateValidationDay.custom_class,
        select: StatusSelectDate,
        status: stateValidationDay
      };
    } // permet d'obtenir l'index de la semaine du current_day en fonction du mois

  }, {
    key: "weekOfMonth",
    value: function weekOfMonth(input) {
      var firstDayOfMonth = input.clone().startOf("month");
      var firstDayOfWeek = firstDayOfMonth.clone().startOf("week");
      var offset = firstDayOfMonth.diff(firstDayOfWeek, "days");
      return Math.ceil((input.date() + offset) / 7);
    }
    /**
     * Obtient la date utilisable.
     * La paramettre date doit etre un object moment.
     * Pour la validation on a 3 cas :
     * - Validation des jours de la semaine.
     * - Validation des dates desactivées.
     * - Validation des delais.
     * NB: les function qui doivent integrer cette derniere doivent remettre les variables suivante à leurs valeurs par defaut :
     * - test_delai_jour
     * - test_jour_semaine
     * - test_date_desactivee
     * @return un object moment (complet jour, mois, année, heure, mn, s)
     */

  }, {
    key: "getPlageDate",
    value: function getPlageDate(calander_day_min, calender_day_max) {
      FonctionFiltre.app_date = this.app_date_utilisable;
      FonctionFiltre.jour_desactivee = this.jour_desactivee;
      FonctionFiltre.type_creneau = this.type_creneau; //FFilter.app_date_current = this.datetime_min; //this.app_date_current;

      FonctionFiltre.datetime_min = this.datetime_min;
      FonctionFiltre.filters = this.filters;
      var self = this;
      return new Promise(function (resolve, reject) {
        self.test_calandar_day++;

        if (self.test_calandar_day > 99) {
          reject(false);
          return false;
        }

        if (calander_day_min.diff(calender_day_max, "days")) {
          FonctionFiltre.ValidationDay(calander_day_min).then(function (stateValidationDay) {
            var day_min_sting = calander_day_min.format("DD-MM-YYYY");
            var StatusSelectDate = false; // Si on a pas encore selectionné, selectionne la date encours.

            if (!self.date_select && day_min_sting == self.app_date_utilisable_string) {
              StatusSelectDate = true;
            } else if (self.date_select && !stateValidationDay.status && day_min_sting == self.date_select.date_string) {
              StatusSelectDate = true;
            } else if ( //self.date_select &&
            //stateValidationDay.status &&
            day_min_sting == self.app_date_utilisable_string) {
              StatusSelectDate = true;
            }
            /*
            else if (
              self.type_creneau === "livraison" &&
              day_min_sting == self.app_date_utilisable_string
            ) {
              StatusSelectDate = true;
            }
            /**/


            var date = {
              date_string: day_min_sting,
              day_french: calander_day_min.locale("fr").format("Do <br /> MMM"),
              date_month: calander_day_min.locale("fr").format("DD"),
              custom_class: stateValidationDay.custom_class,
              select: StatusSelectDate,
              status: stateValidationDay.status
            };

            if (StatusSelectDate) {
              self.selectedDate = true;
              self.date_select = date;
            }

            self.list_calander_days.push(date);
            calander_day_min.add(1, "days");
            resolve(self.getPlageDate(calander_day_min, calender_day_max));
          });
        } else {
          resolve(true);
        }
      });
    }
  }]);

  return BuildCalendar;
}();


// CONCATENATED MODULE: ./src/App/AppResouces.js












if (window.moment) {
  var AppResouces_moment = window.moment;
}

var AppResouces_DateUtilisable = /*#__PURE__*/function () {
  function DateUtilisable(jour_desactivee, app_delai_jour, filters) {
    Object(classCallCheck["a" /* default */])(this, DateUtilisable);

    this.jour_desactivee = jour_desactivee;
    this.app_delai_jour = app_delai_jour;
    this.filters = filters; //

    this.test_delai_jour = 0;
    this.test_jour_semaine = 0;
    this.test_date_desactivee = 0;
  }
  /**
   * @parameter date doit etre un object moment.
   */


  Object(createClass["a" /* default */])(DateUtilisable, [{
    key: "date_utilisable",
    value: function () {
      var _date_utilisable = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee(date) {
        var apply_delai_true,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                apply_delai_true = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;
                _context.next = 3;
                return this.getDayUtilisable(date, null, apply_delai_true);

              case 3:
                return _context.abrupt("return", _context.sent);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function date_utilisable(_x) {
        return _date_utilisable.apply(this, arguments);
      }

      return date_utilisable;
    }()
    /**
     * Obtient la date utilisable, et permet aussi de determiner le prochain jour utilisable.
     * La paramettre date doit etre un object moment.
     * Pour la validation on a 3 cas :
     * - Validation des jours de la semaine.
     * - Validation des dates desactivées.
     * - Validation des delais.
     * - Application du delai.
     * NB: les function qui doivent integrer cette derniere doivent remettre les variables suivante à leurs valeurs par defaut :
     * - test_delai_jour
     * - test_jour_semaine
     * - test_date_desactivee
     * @return un object moment (complet jour, mois, année, heure, mn, s)
     */

  }, {
    key: "getDayUtilisable",
    value: function getDayUtilisable(date) {
      var provider = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var apply_delai_true = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var self = this;
      return new Promise(function (resolve, reject) {
        if (self.test_jour_semaine > 6) {
          alert("Boucle infinie detecter ..." + provider);
          reject(false);
          return false;
        }

        if (self.test_date_desactivee > 99) {
          alert("Boucle infinie detecter ...");
          reject(false);
          return false;
        }

        var index_day_week = date.day();

        if (self.jour_desactivee.length && self.jour_desactivee.includes(index_day_week)) {
          self.test_jour_semaine++; // si ce jour est automatiquement desactivée,
          // on passe au suivant.

          date.add(1, "days");
          resolve(self.getDayUtilisable(date, "jour desactivée", apply_delai_true));
        } else {
          self.DisableDateByfilter(date).then(function (Filter) {
            if (Filter.status) {
              self.test_date_desactivee++;
              date.add(1, "days");
              resolve(self.getDayUtilisable(date, "date desactivée", apply_delai_true));
            } // on applique egalement le decallage.
            else if (apply_delai_true && self.app_delai_jour && self.app_delai_jour > self.test_delai_jour) {
                self.test_delai_jour++;
                /**
                 * On applique le delai en jour apres jour afin de s'assurer que les jours
                 * desactivées ne sont pas pris en compte.
                 */

                date.add(1, "days");
                resolve(self.getDayUtilisable(date, "delai jour", apply_delai_true));
              } else {
                resolve(date);
              }
          });
        }
      });
    }
  }, {
    key: "DisableDateByfilter",
    value: function DisableDateByfilter(date) {
      var self = this;
      return new Promise(function (resolvEnd) {
        var index_day = date.day();
        var app_date_current_string_en = date.format("YYYY-MM-DD");
        var app_date_current_en = AppResouces_moment(app_date_current_string_en, "YYYY-MM-DD"); // Desactivation du jour en function des filtres.

        var CustomLoop = function CustomLoop() {
          var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          return new Promise(function (resolv) {
            var filter = self.filters[i];

            if (filter.h_debut.length === 0 && filter.h_fin.length === 0) {
              Filtres.loopAttribFilter(i, filter, app_date_current_en, app_date_current_string_en, index_day, "date").then(function (result) {
                resolv(result);
              });
            } else {
              resolv({
                status: false,
                i: i,
                custom_class: "nothing"
              });
            }
          });
        };

        var execution = function execution() {
          var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          CustomLoop(i).then(function (result) {
            var ii = result.i + 1;

            if (result.status) {
              resolvEnd(result);
              return;
            } else if (self.filters[ii]) {
              execution(ii);
            } else {
              resolvEnd(result);
              return;
            }
          });
        };

        execution();
      });
    }
  }]);

  return DateUtilisable;
}();


// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App/calendar.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//import moment from "moment";
if (window.moment) {
  var calendarvue_type_script_lang_js_moment = window.moment;
}


/* harmony default export */ var calendarvue_type_script_lang_js_ = ({
  name: "calendar",
  props: {
    type_creneau: {
      type: String,
      default: ""
    },
    app_date_utilisable_string_hour: {
      type: String,
      required: true
    },
    filters: {
      type: Array,
      required: true
    },

    /**
     * Nombre de semaine exact à afficher.
     */
    nombre_semaine: {
      type: Number,
      default: 4
    },

    /**
     * represente les jours de la semaine qui sont tjrs désactivés.
     * dimanche etant definit par 0 ey 6 pour samedi.
     */
    jour_desactivee: {
      type: Array,
      default: function _default() {
        return [0, 6];
      }
    },
    rebuild_creneau: {
      type: [Object, String]
    }
  },
  data: function data() {
    return {
      /**
       * list calendar date, elle gere l'affichage du calendrier.
       */
      list_calander_days: [],
      calendar_nav: 0,

      /**
       * configuration de la date.
       */
      show_month_in_date: false,
      show_day_label: true,
      date_select: null
    };
  },
  watch: {
    app_date_utilisable_string_hour: function app_date_utilisable_string_hour() {
      this.calendar_nav = 0;
      this.init();
    },
    date_select: {
      deep: true,
      handler: function handler(date) {
        this.$emit("select_date", date);
      }
    }
  },
  computed: {
    calandar_title: {
      get: function get() {
        if (this.app_date_utilisable_string_hour != "") {
          return calendarvue_type_script_lang_js_moment(this.app_date_utilisable_string_hour, "DD-MM-YYYY").add(this.calendar_nav, "month").locale("fr").format("MMMM  YYYY");
        }

        return "";
      }
    }
  },
  methods: {
    init: function init() {
      var _this = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var app_date_utilisable_string, Build;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                app_date_utilisable_string = calendarvue_type_script_lang_js_moment(_this.app_date_utilisable_string_hour, "DD-MM-YYYY HH:mm:ss");
                Build = new AppResoucesBuildCalendar_BuildCalendar(app_date_utilisable_string.format("DD-MM-YYYY"), _this.calendar_nav, _this.nombre_semaine, _this.jour_desactivee, _this.type_creneau, _this.filters, _this.date_select);
                _context.next = 4;
                return Build.builderCalandar();

              case 4:
                _this.list_calander_days = Build.list_calander_days;
                _this.date_select = Build.date_select;

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    select_date: function select_date(date) {
      console.log("select_date : ", date);

      if (!date.status) {
        for (var i in this.list_calander_days) {
          var datePass = this.list_calander_days[i];
          if (datePass.select) datePass.select = false;
          var j = parseInt(i) + 1;
          if (j === this.list_calander_days.length) date.select = true;
        }

        this.date_select = date;
        this.$emit("close_calendar", true);
      }
    },
    //permet de naviguer entre les mois
    toggleMonth: function toggleMonth(direction) {
      if (direction > 0) {
        this.calendar_nav++;
      } else {
        this.calendar_nav--;
      }

      this.init();
    }
  }
});
// CONCATENATED MODULE: ./src/App/calendar.vue?vue&type=script&lang=js&
 /* harmony default export */ var App_calendarvue_type_script_lang_js_ = (calendarvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/App/calendar.vue?vue&type=style&index=0&lang=scss&
var calendarvue_type_style_index_0_lang_scss_ = __webpack_require__("5174");

// CONCATENATED MODULE: ./src/App/calendar.vue






/* normalize component */

var calendar_component = Object(componentNormalizer["a" /* default */])(
  App_calendarvue_type_script_lang_js_,
  calendarvue_type_template_id_117b6b43_render,
  calendarvue_type_template_id_117b6b43_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var calendar = (calendar_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5da2cd20-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App/Hours.vue?vue&type=template&id=f7545272&scoped=true&lang=html&
var Hoursvue_type_template_id_f7545272_scoped_true_lang_html_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"width":"100%"}},[_c('advanced-select',{attrs:{"disabled":_vm.disabled_creneau,"options":_vm.list_creneaux,"show-labels":false,"searchable":false,"placeholder":"00:00 - 00:00","track-by":"begin","open-direction":"bottom"},scopedSlots:_vm._u([{key:"singleLabel",fn:function(ref){
var option = ref.option;
return [_vm._v(" "+_vm._s(option.begin)+" - "+_vm._s(option.end)+" ")]}},{key:"option",fn:function(props){return [_c('span',{attrs:{"checkstatus":props.option.checkstatus}},[_vm._v(" "+_vm._s(props.option.begin)+" - "+_vm._s(props.option.end)+" ")])]}}]),model:{value:(_vm.current_creneau),callback:function ($$v) {_vm.current_creneau=$$v},expression:"current_creneau"}},[_c('template',{slot:"noOptions"},[_c('span',[_vm._v("Aucun créneau disponible à cette date")])])],2)],1)}
var Hoursvue_type_template_id_f7545272_scoped_true_lang_html_staticRenderFns = []


// CONCATENATED MODULE: ./src/App/Hours.vue?vue&type=template&id=f7545272&scoped=true&lang=html&

// EXTERNAL MODULE: ./node_modules/vue-multiselect/dist/vue-multiselect.min.js
var vue_multiselect_min = __webpack_require__("8e5f");
var vue_multiselect_min_default = /*#__PURE__*/__webpack_require__.n(vue_multiselect_min);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App/Hours.vue?vue&type=script&lang=js&



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



if (window.moment) {
  var Hoursvue_type_script_lang_js_moment = window.moment;
}

/* harmony default export */ var Hoursvue_type_script_lang_js_ = ({
  name: "Hours",
  props: {
    app_date_utilisable_string_hour: {
      type: String,
      required: true
    },
    h_debut: {
      type: Number,
      required: true
    },
    m_debut: {
      type: Number,
      required: true
    },
    h_fin: {
      type: Number,
      required: true
    },
    m_fin: {
      type: Number,
      required: true
    },
    plage_heures_valide: {
      type: Array,
      required: true
    },
    filters: {
      type: Array,
      required: true
    },
    configs: {
      type: Object,
      required: true
    },
    deccalage_creneau_depart: {
      type: Number
    }
  },
  components: {
    AdvancedSelect: vue_multiselect_min_default.a
  },
  data: function data() {
    return {
      current_creneau: "",
      disabled_creneau: false,
      list_creneaux: [],
      heure_creneau_debut: null,
      heure_creneau_fin: null
    };
  },
  mounted: function mounted() {},
  watch: {
    app_date_utilisable_string_hour: function app_date_utilisable_string_hour() {
      this.init();
    },
    current_creneau: function current_creneau(val) {
      if (!val) this.$emit("select_next_day", val);else this.$emit("select_creneau", val);
    }
  },
  computed: {//
  },
  methods: {
    init: function init() {
      var _this = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var app_date_utilisable_string, Build;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                app_date_utilisable_string = Hoursvue_type_script_lang_js_moment(_this.app_date_utilisable_string_hour, "DD-MM-YYYY HH:mm:ss");
                Build = new AppResoucesBuildCreneaux_BuildCreneaux(app_date_utilisable_string.format("DD-MM-YYYY"), _this.app_date_utilisable_string_hour, _this.h_debut, _this.m_debut, _this.h_fin, _this.m_fin, _this.plage_heures_valide, _this.configs.creneau, _this.configs.delai_next_creneau, _this.filters, _this.deccalage_creneau_depart);
                _context.next = 4;
                return Build.dateBorne();

              case 4:
                _context.next = 6;
                return Build.buildHour();

              case 6:
                _this.list_creneaux = Build.list_creneaux;
                _this.current_creneau = _this.list_creneaux[0];

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }
});
// CONCATENATED MODULE: ./src/App/Hours.vue?vue&type=script&lang=js&
 /* harmony default export */ var App_Hoursvue_type_script_lang_js_ = (Hoursvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/App/Hours.vue





/* normalize component */

var Hours_component = Object(componentNormalizer["a" /* default */])(
  App_Hoursvue_type_script_lang_js_,
  Hoursvue_type_template_id_f7545272_scoped_true_lang_html_render,
  Hoursvue_type_template_id_f7545272_scoped_true_lang_html_staticRenderFns,
  false,
  null,
  "f7545272",
  null
  
)

/* harmony default export */ var Hours = (Hours_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App/Creneau.vue?vue&type=script&lang=js&








//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//pourquoi ajouter true come dernier paramettre ?
//moment('24/12/2019 09:15:00', "DD MM YYYY hh:mm:ss", true);
//import moment from "moment";
if (window.moment) {
  var Creneauvue_type_script_lang_js_moment = window.moment;
} //import configSite from "./config.js";


 //import Filtres from "./Filtres.js";




/* harmony default export */ var Creneauvue_type_script_lang_js_ = ({
  name: "SelectionHoraire",
  props: {
    title: {
      type: String
    },
    classes: {
      type: String,
      default: "rond-left ml-md-1"
    },
    interval: {
      type: Number,
      default: 120
    },
    h_debut: {
      type: Number,
      default: 8
    },
    m_debut: {
      type: Number,
      default: 0
    },
    h_fin: {
      type: Number,
      default: 21
    },
    m_fin: {
      type: Number,
      default: 0
    },
    // à supprimer.
    date_desactivee: {
      type: Array,
      default: function _default() {
        return ["24-09-2020"];
      }
    },
    plage_heures_valide: {
      type: Array,
      default: function _default() {
        return [];
      }
    },

    /*
    disable_heureday: {
      type: Array,
      default() {
        return [];
      }
    },
    disable_heuredate: {
      type: Array,
      default() {
        return [];
      }
    },
     url_get_creneau: {
      type: String,
      default: "http://habeuk.kksa/api/shopify/creneaux/checks.js"
    },
    /**/
    type_creneau: {
      type: String,
      default: ""
    },

    /**
     * Le nombre de jour valide à ignorer.
     */
    delai_jour: {
      type: Number,
      default: 0
    },

    /**
     * represente les jours de la semaine qui sont tjrs désactivés.
     * dimanche etant definit par 0 ey 6 pour samedi.
     */
    jour_desactivee: {
      type: Array,
      default: function _default() {
        return [0, 6];
      }
    },

    /**
     * C'est la date encours.
     * ( Elle doit etre fournit par le serveur et convertie en un object moment() ).
     *
     * @param object moment()
     */
    current_date: {
      type: Object
    },

    /**
     * Nombre de semaine exact à afficher.
     */
    nombre_semaine: {
      type: Number,
      default: 6
    },

    /**
     * Nombre de reservation par crerneau.
     */
    nombre_res_creneau: {
      type: Number,
      default: 3
    },

    /**
     * Permet de reconstruire une partie des creneaux.
     * - Reconstruit le calender ( En activant ou desactivant certaines dates ).
     * - Reconstruit les creneaux ( En activant ou desactivant certaines dates ).
     * @see watch.rebuild_creneau pour plus d'info.
     */
    rebuild_creneau: {
      type: [String, Object]
    },

    /**
     * Contient les paramettres de configuration.
     * Pour reduire les refresh et le passage des datas.
     */
    configs: {
      type: Object,
      default: function _default() {
        return {
          interval: 120,
          delai_jour: 0
        };
      }
    },
    deccalage_creneau_depart: {
      type: Number,
      default: 0
    },

    /**
     * Cette variable contient les données permettant d'appliquer
     * des modifications avant le rendu des creneaux et jours.
     * example: desactivé un creneau, une date, une plage de date, en function de certains critaires.
     */
    filters: {
      type: Array,
      required: true
    }
  },
  data: function data() {
    return {
      /**
       * Est la date de base de l'application, forunit uniquement par l'application.
       */
      app_date_utilisable: Creneauvue_type_script_lang_js_moment(),
      show_calandar: false,
      date_string_generate_by_calendar: ""
    };
  },
  components: {
    "svg-calandear": SvgCalandar,
    calendar: calendar,
    Hours: Hours
  },
  watch: {
    configs: {
      handler: function handler() {
        this.init_creneau(this.current_date);
      },
      deep: true
    },
    current_date: {
      handler: function handler(val) {
        this.init_creneau(val);
      },
      deep: true
    }
  },
  computed: {
    /**
     * Date affiché.
     */
    app_date_display: {
      get: function get() {
        if (this.date_string_generate_by_calendar != "") {
          return Creneauvue_type_script_lang_js_moment(this.date_string_generate_by_calendar, "DD-MM-YYYY").locale("fr").format("dddd Do MMMM");
        }

        return "";
      }
    },

    /**
     * ne peut pas etre MAJ par l'application.
     */
    app_date_utilisable_string: function app_date_utilisable_string() {
      return this.app_date_utilisable.format("DD-MM-YYYY");
    },

    /**
     * ne peut pas etre MAJ par l'application.
     */
    app_date_utilisable_string_hour: function app_date_utilisable_string_hour() {
      return this.app_date_utilisable.format("DD-MM-YYYY HH:mm:ss");
    }
  },
  methods: {
    init_creneau: function init_creneau(date) {
      var _arguments = arguments,
          _this = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var apply_delai_true, current_date, index_day_week, DateUtil;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                apply_delai_true = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : true;
                current_date = Creneauvue_type_script_lang_js_moment(date);

                if (current_date.isValid()) {
                  _context.next = 5;
                  break;
                }

                console.log("format de date non valide : ", date);
                return _context.abrupt("return", false);

              case 5:
                index_day_week = current_date.day(); // si la date de debut est un jour fermé, on remet les heures... à 0, pour permettre que l'heure de debut ne tient pas compte de l'heure de la journée femer.

                if (_this.type_creneau === "collecte" && _this.jour_desactivee.length && _this.jour_desactivee.includes(index_day_week)) {
                  current_date.set({
                    hour: 0,
                    minute: 0,
                    second: 0
                  });
                }

                DateUtil = new AppResouces_DateUtilisable(_this.jour_desactivee, _this.configs.delai, _this.filters);
                _context.next = 10;
                return DateUtil.date_utilisable(current_date, apply_delai_true);

              case 10:
                _this.app_date_utilisable = _context.sent;

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    display_hide_calandar: function display_hide_calandar() {
      if (this.show_calandar) {
        this.show_calandar = false;
      } else {
        this.show_calandar = true;
      }
    },
    select_date_calendar: function select_date_calendar(date) {
      if (date.date_string == this.app_date_utilisable_string) this.date_string_generate_by_calendar = this.app_date_utilisable_string_hour;else this.date_string_generate_by_calendar = date.date_string;
    },
    select_creneau: function select_creneau(val) {
      var date = Creneauvue_type_script_lang_js_moment(this.date_string_generate_by_calendar, "DD-MM-YYYY");
      var creneau_begin = val.begin.split(":");
      date.set({
        hour: creneau_begin[0],
        minute: parseInt(creneau_begin[1]) + parseInt(this.configs.delai_next_creneau)
      });
      var datas = {
        creneau: val,
        date_string: date.format("DD-MM-YYYY"),
        date: date
      };
      this.$emit("ev_select_current_creneau", datas);
    },
    select_next_day: function select_next_day() {
      var nextDay = Creneauvue_type_script_lang_js_moment(this.date_string_generate_by_calendar, "DD-MM-YYYY");
      nextDay.add(1, "days");
      this.init_creneau(nextDay, false);
    }
  }
});
// CONCATENATED MODULE: ./src/App/Creneau.vue?vue&type=script&lang=js&
 /* harmony default export */ var App_Creneauvue_type_script_lang_js_ = (Creneauvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/App/Creneau.vue





/* normalize component */

var Creneau_component = Object(componentNormalizer["a" /* default */])(
  App_Creneauvue_type_script_lang_js_,
  Creneauvue_type_template_id_77598d80_render,
  Creneauvue_type_template_id_77598d80_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Creneau = (Creneau_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App/SelectionCreneau.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//import moment from "moment";
if (window.moment) {
  var SelectionCreneauvue_type_script_lang_js_moment = window.moment;
}


/* harmony default export */ var SelectionCreneauvue_type_script_lang_js_ = ({
  name: "SelectionHoraire",
  props: {
    nombre_semaine: {
      type: Number
    },
    nombre_res_creneau: {
      type: Number
    },
    disable_heureday: {
      type: Array
    },
    disable_heuredate: {
      type: Array
    },
    plage_heures_valide: {
      type: Array
    },
    url_get_creneau: {
      type: String
    },
    collecte_title: {
      type: String,
      default: "Collecte"
    },
    collecte_livraison: {
      type: String,
      default: "rectangle rond-left mx-2 mx-md-0 mb-3 mb-md-0 mx-3 pt-4 pl-sm-3 col-md-6"
    },
    collecte_delai_jour: {
      type: Number
    },
    collecte_jour_desactivee: {
      type: Array
    },
    collecte_date_desactivee: {
      type: Array
    },
    collecte_interval: {
      type: Number
    },
    collecte_configs: {
      type: Object
    },
    collecte_current_date: {
      type: Object
    },
    collecte_deccalage_creneau_depart: {
      type: Number
    },
    title_livraison: {
      type: String,
      default: "Livraison"
    },
    classes_livraison: {
      type: String,
      default: " rectangle rond-right mx-2 mx-md-0 mb-3 mb-md-0 mx-3 pt-4 pl-sm-3 col-md-6"
    },
    livraison_delai_jour: {
      type: Number
    },
    livraison_jour_desactivee: {
      type: Array
    },
    livraison_date_desactivee: {
      type: Array
    },
    livraison_interval: {
      type: Number
    },
    livraison_configs: {
      type: Object
    },
    filters: {
      type: Array
    }
  },
  components: {
    creneau: Creneau
  },
  data: function data() {
    return {
      livraison_current_date: null
    };
  },
  mounted: function mounted() {//
  },
  methods: {
    ev_select_current_creneau_collecte: function ev_select_current_creneau_collecte(creneau) {
      this.$emit("ev_creneau_collecte", creneau);
      this.livraison_current_date = creneau.date;
      console.log("ev_select_current_creneau_collecte");
    },
    ev_select_current_creneau_livraison: function ev_select_current_creneau_livraison(creneau) {
      this.$emit("ev_creneau_livraison", creneau);
    },

    /**
     * Permet de convertir les données String en JSON,
     * de les mettre dans un format valide pour la sauvegarde.
     */
    getValidData: function getValidData(creneau) {
      var validCreneau = JSON.parse(creneau);
      var date = SelectionCreneauvue_type_script_lang_js_moment(validCreneau.date_string_not_change, "DD-MM-YYYY HH:mm:ss");
      validCreneau.date = date;
      validCreneau.date_string = date.format("DD-MM-YYYY HH:mm:ss");
      return validCreneau;
    }
  }
});
// CONCATENATED MODULE: ./src/App/SelectionCreneau.vue?vue&type=script&lang=js&
 /* harmony default export */ var App_SelectionCreneauvue_type_script_lang_js_ = (SelectionCreneauvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/App/SelectionCreneau.vue





/* normalize component */

var SelectionCreneau_component = Object(componentNormalizer["a" /* default */])(
  App_SelectionCreneauvue_type_script_lang_js_,
  SelectionCreneauvue_type_template_id_9cbebd20_render,
  SelectionCreneauvue_type_template_id_9cbebd20_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SelectionCreneau = (SelectionCreneau_component.exports);
// EXTERNAL MODULE: ./node_modules/vue-loading-template/dist/vueLoading.common.js
var vueLoading_common = __webpack_require__("d523");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5da2cd20-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Alert/index.vue?vue&type=template&id=5a28c8a6&
var Alertvue_type_template_id_5a28c8a6_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.show_alert)?_c('div',{class:_vm.class_alert,attrs:{"attribut":_vm.alert_attribut_class,"role":"alert","id":_vm.alert_id_html}},[_c('div',{domProps:{"innerHTML":_vm._s(_vm.alert_message)}}),_c(_vm.alert_template,{tag:"component",attrs:{"sub_datas":_vm.datas},on:{"ev_alert_action":_vm.alert_action}}),_vm._t("default"),_c('button',{staticClass:"close",attrs:{"type":"button","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"},on:{"click":_vm.closeByParent}},[_vm._v("×")])])],2):_vm._e()}
var Alertvue_type_template_id_5a28c8a6_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Alert/index.vue?vue&type=template&id=5a28c8a6&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Alert/index.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var Alertvue_type_script_lang_js_ = ({
  name: "Alert",
  props: {
    alert_message: {
      type: String,
      default: "alert primary"
    },
    alert_id_html: {
      type: String,
      default: "id-alert"
    },
    show_alert: {
      type: Boolean,
      default: true
    },
    alert_attribut_class: {
      type: String,
      default: "alert-primary"
    },
    alert_template: {
      type: String,
      default: ""
    },
    datas: {
      type: [Object, Array, String, Number],
      default: "datas_vide"
    }
  },
  data: function data() {
    return {// name:'',
    };
  },
  computed: {
    class_alert: {
      get: function get() {
        var classe = "alert alert-dismissible fade show";
        classe += " " + this.alert_attribut_class;
        return classe;
      }
    }
  },
  methods: {
    closeByParent: function closeByParent() {
      this.$emit("ev_alert_close");
    },
    alert_action: function alert_action(datas) {
      this.$emit("ev_alert_action", datas);
    }
  }
});
// CONCATENATED MODULE: ./src/components/Alert/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Alertvue_type_script_lang_js_ = (Alertvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/Alert/index.vue





/* normalize component */

var Alert_component = Object(componentNormalizer["a" /* default */])(
  components_Alertvue_type_script_lang_js_,
  Alertvue_type_template_id_5a28c8a6_render,
  Alertvue_type_template_id_5a28c8a6_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Alert = (Alert_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App/index.vue?vue&type=script&lang=js&














//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var Appvue_type_script_lang_js_$;

if (window.jQuery) {
  Appvue_type_script_lang_js_$ = window.jQuery;
} else if (window.$) {
  Appvue_type_script_lang_js_$ = window.$;
}

var ShopifyformatMoney = function ShopifyformatMoney(cents, format) {
  var value = "",
      placeholderRegex = /\{\{\s*(\w+)\s*\}\}/,
      formatString = format || this.money_format;

  if (typeof cents == "string") {
    cents = cents.replace(".", "");
  }

  function defaultOption(opt, def) {
    return typeof opt == "undefined" ? def : opt;
  }

  function formatWithDelimiters(number, precision, thousands, decimal) {
    precision = defaultOption(precision, 2);
    thousands = defaultOption(thousands, ",");
    decimal = defaultOption(decimal, ".");

    if (isNaN(number) || number == null) {
      return 0;
    }

    number = (number / 100.0).toFixed(precision);
    var parts = number.split("."),
        dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + thousands),
        cents = parts[1] ? decimal + parts[1] : "";
    return dollars + cents;
  }

  switch (formatString.match(placeholderRegex)[1]) {
    case "amount":
      value = formatWithDelimiters(cents, 2);
      break;

    case "amount_no_decimals":
      value = formatWithDelimiters(cents, 0);
      break;

    case "amount_with_comma_separator":
      value = formatWithDelimiters(cents, 2, ".", ",");
      break;

    case "amount_no_decimals_with_comma_separator":
      value = formatWithDelimiters(cents, 0, ".", ",");
      break;
  }

  return formatString.replace(placeholderRegex, value);
};





/* harmony default export */ var Appvue_type_script_lang_js_ = ({
  name: "CrenneauV2",
  props: {
    /**
     * provider @TypeLivraison
     */
    blocks_type_livraisons: {
      type: Array
    },
    titre_module: {
      type: String,
      default: "Finaliser la commande"
    },

    /**
     * provider @SelectionCreneau
     */
    nombre_semaine: {
      type: Number
    },

    /**
     * provider @selec
     */
    nombre_res_creneau: {
      type: Number
    },

    /**
     * provider @SelectionCreneau.
     */
    plage_heures_valide: {
      type: Array
    },

    /**
     * @selectionCreneau
     */
    disable_heureday: {
      type: Array
    },

    /**
     * @selectionCreneau
     */
    disable_heuredate: {
      type: Array
    },

    /**
     * provider @SelectionCreneau
     */
    collecte_delai_jour: {
      type: Number
    },

    /**
     * provider @SelectionCreneau
     */
    collecte_jour_desactivee: {
      type: Array
    },

    /**
     * provider @SelectionCreneau
     */
    collecte_date_desactivee: {
      type: Array
    },

    /**
     *provider @SelectionCrenenau
     */
    collecte_interval: {
      type: Number
    },
    collecte_current_date: {
      type: Object
    },
    collecte_deccalage_creneau_depart: {
      type: Number
    },

    /**
     * provider @SelectionCreneau
     */
    livraison_delai_jour: {
      type: Number
    },
    livraison_jour_desactivee: {
      type: Array
    },

    /**
     * provider @SelectionCreneau
     */
    livraison_date_desactivee: {
      type: Array
    },

    /**
     * provider @SelectionCreneau
     */
    livraison_interval: {
      type: Number
    },
    livraison_current_date: {
      type: Object
    },
    url_save_creneau: {
      type: String,
      default: "http://habeuk.kksa/api/shopify/creneaux/add"
    },
    url_get_creneau: {
      type: String
    },
    app_env_prod: {
      type: Boolean,
      default: true
    },
    filters: {
      type: Array
    }
  },
  components: {
    "type-livraison": TypeLivraison,
    selectionhoraire: SelectionCreneau,
    alert: Alert,
    VueLoading: vueLoading_common["VueLoading"]
  },
  data: function data() {
    return {
      collecte_configs: {},
      VueCollecte: {},
      VueLivraison: {},
      show: false,
      show_cover: false,

      /**
       * Alert module
       */
      show_alert: false,
      alert_message: "",
      alert_attribut_class: "alert-primary",

      /**
       * Contient les valeurs des creneaux.
       */
      creneau_livraison: "",
      creneau_collecte: "",

      /**
       * Contient la valeur courante de type de livraiosn.( valeur fournit par la configuration ).
       * ne doit pas etre vide avant la vilidation.
       */
      TypeLivraison: {},

      /**
       * Coontient la valeur de type de livraison dans la panier.
       */
      CartTypeLivraison: "",
      // contient les données du panier.
      cart: "",
      //
      VueTypelivraison: "",
      livraison_app_date_current_string: "",
      collecte_app_date_current_string: ""
    };
  },
  mounted: function mounted() {
    this.VueCollecte = this.$refs.selectionhoraire.$refs.collecte;
    this.VueLivraison = this.$refs.selectionhoraire.$refs.livraison;
    this.show = true;
    this.VueTypelivraison = this.$refs.typelivraison;
    this.initcreneau();
  },
  methods: {
    ev_toggle_month_collecte: function ev_toggle_month_collecte(direction) {
      console.log("direction_collecte", direction);
      return this.collecte_current_date.add(direction, "month");
    },
    ev_toggle_month_livraison: function ev_toggle_month_livraison(direction) {
      console.log("direction_livraison", direction);
    },

    /**
     * Charge le panier.
     * Retourne true si la requte est terminée avec succes et false si non.
     */
    loadcart: function loadcart() {
      var self = this;
      return new Promise(function (resolve, reject) {
        self.show_cover = true;
        Appvue_type_script_lang_js_$.getJSON("/cart.js", function (cart, textStatus) {
          console.log("Panier textStatus : ", cart);
          self.show_cover = false;

          if (textStatus) {
            self.cart = cart;
            resolve(true);
          } else {
            reject(false);
          }
        }).fail(function () {
          console.log("Impossible de recuperer le panier");
          self.show_cover = false;

          if (self.app_env_prod) {
            reject(false);
          } else {
            resolve(false);
          }
        });
      });
    },
    initcreneau: function initcreneau() {
      var _this = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var status_cart;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // Valide pour les tests uniquement.
                if (!_this.app_env_prod) {
                  _this.setEvant();
                }
                /**/
                //on modifie les html


                _this.HideStaticLoading(); // On charge la panier.


                _context.next = 4;
                return _this.loadcart();

              case 4:
                status_cart = _context.sent;

                if (!status_cart) {
                  _context.next = 10;
                  break;
                }

                _context.next = 8;
                return _this.getProductType();

              case 8:
                /**
                 * Si les deux id sont different cela peut traduire que l'utilisateur a precedamant fait * une autre selection.
                 * Bref : on concerve la valeur presente dans la panier.
                 */
                if (_this.TypeLivraison && _this.CartTypeLivraison && _this.CartTypeLivraison.id && _this.CartTypeLivraison.id !== _this.TypeLivraison.id) {
                  _this.apply_type_livraison_by_id(_this.CartTypeLivraison.id);
                } else if (_this.TypeLivraison && !_this.CartTypeLivraison.id) {
                  /**
                   * Cas ou this.CartTypeLivraison.id nest pas definit.
                   */
                  _this.addProductTypeLivraison();
                } //on ecoute l'evenement


                _this.setEvant();

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },

    /**
     * Permet de comparer le type de livraison dans le panier et celui en affichage.
     *
     */

    /**
     * @return l'object (type de livraison) ou false, si cest vide.
     */
    getProductType: function getProductType() {
      var _this2 = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var i, product;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(_this2.cart && _this2.cart.item_count > 0)) {
                  _context2.next = 13;
                  break;
                }

                console.log("getProductType()", _this2.typeLivraisonIds);
                _context2.t0 = regeneratorRuntime.keys(_this2.cart.items);

              case 3:
                if ((_context2.t1 = _context2.t0()).done) {
                  _context2.next = 11;
                  break;
                }

                i = _context2.t1.value;
                product = _this2.cart.items[i];

                if (!_this2.typeLivraisonIds.includes(product.id)) {
                  _context2.next = 9;
                  break;
                }

                _this2.CartTypeLivraison = product;
                return _context2.abrupt("return", product);

              case 9:
                _context2.next = 3;
                break;

              case 11:
                _context2.next = 14;
                break;

              case 13:
                return _context2.abrupt("return", false);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },

    /**
     * Permet à un programme externe/interne d'execute le processus de sauvegarde.
     */
    setEvant: function setEvant() {
      var self = this; //console.log("init setEvent");

      Appvue_type_script_lang_js_$(document).on("SaveCreneauxChechout", function (elem) {
        self.SaveCreneau(elem);
      });
    },

    /**
     * Processus de sauvegarde.
     */
    SaveCreneau: function SaveCreneau() {
      var _arguments = arguments,
          _this3 = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var elem, test, attribut;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                elem = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : null;
                _context3.next = 3;
                return _this3.verification();

              case 3:
                test = _context3.sent;

                if (!test) {
                  _context3.next = 26;
                  break;
                }

                _context3.next = 7;
                return _this3.buildAttribut();

              case 7:
                attribut = _context3.sent;
                _context3.next = 10;
                return _this3.SaveAttributeCart(attribut);

              case 10:
                console.log("Attribut : ", attribut); //on verifie que le panier est ok.

                _context3.next = 13;
                return _this3.loadcart();

              case 13:
                if (!(_this3.cart && _this3.cart.attributes && _this3.cart.attributes.livraison || !_this3.app_env_prod)) {
                  _context3.next = 20;
                  break;
                }

                _context3.next = 16;
                return _this3.SaveCreneauOnApi();

              case 16:
                Appvue_type_script_lang_js_$(".cart-checkout .loadding", elem.target).removeClass("fa-spin"); //alert("");

                _this3.triggerCheckout();

                _context3.next = 24;
                break;

              case 20:
                _this3.show_alert = true;
                _this3.alert_attribut_class = "alert-danger ml-md-4";
                _this3.alert_message += '- Une erreur s"est produite lors de la sauvegarde de vos informations. <br /> Verifier votre connexion et actualiser la page <br />';
                return _context3.abrupt("return", false);

              case 24:
                _context3.next = 27;
                break;

              case 26:
                if (elem && elem.target) {
                  Appvue_type_script_lang_js_$(".cart-checkout .submit-cart-test", elem.target).addClass("bg-danger");
                  Appvue_type_script_lang_js_$(".cart-checkout .loadding", elem.target).removeClass("fa-spin");
                }

              case 27:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },

    /**
     * Permet.
     */
    SaveCreneauOnApi: function SaveCreneauOnApi() {
      var self = this;
      return new Promise(function (resolve) {
        var url = "date_collecte=";
        url += encodeURIComponent(self.creneau_collecte.date.format("DD-MM-YYYY HH:mm:ss"));
        url += "&date_livraison=" + encodeURIComponent(self.creneau_livraison.date.format("DD-MM-YYYY HH:mm:ss"));
        url += "&creneau_livraison=" + encodeURIComponent(self.creneau_livraison.creneau.begin) + "-";
        url += encodeURIComponent(self.creneau_livraison.creneau.end);
        url += "&creneau_collecte=" + encodeURIComponent(self.creneau_collecte.creneau.begin) + "-";
        url += encodeURIComponent(self.creneau_collecte.creneau.end);
        url += "&creneau_type=" + encodeURIComponent(self.TypeLivraison.type);
        var ifrm = document.createElement("iframe");
        ifrm.setAttribute("src", self.url_save_creneau + "?" + url);
        ifrm.setAttribute("style", "display:none !important");
        ifrm.style.width = "640px";
        ifrm.style.height = "480px";
        document.body.appendChild(ifrm);
        resolve(true);
        /**
        $.getJSON(self.url_save_creneau + "?" + url, function(
          cart,
          textStatus
        ) {
          if (textStatus) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
        /**/
      });
    },
    triggerCheckout: function triggerCheckout() {
      Appvue_type_script_lang_js_$(".creneaux-mbt .cart-checkout .submit-cart").trigger("click");
      console.log("verfication de la presence du bouton formulaire ", Appvue_type_script_lang_js_$(".creneaux-mbt .cart-checkout .submit-cart"));
    },
    buildAttribut: function buildAttribut() {
      //
      var livraison = "Livraison";
      livraison += "\r\n";
      livraison += "Date :" + this.creneau_livraison.date.format("DD-MM-YYYY HH:mm:ss");
      livraison += "\r\n";
      livraison += "Creneau :" + this.creneau_livraison.creneau.begin + " - " + this.creneau_livraison.creneau.end; //

      var collecte = "Collecte";
      collecte += "\r\n";
      collecte += "Date :" + this.creneau_collecte.date.format("DD-MM-YYYY HH:mm:ss");
      collecte += "\r\n";
      collecte += "Creneau :" + this.creneau_collecte.creneau.begin + " - " + this.creneau_collecte.creneau.end;
      /**
       * Données pour format Zapier
       */

      var z_collecte_date = this.creneau_collecte.date.format("DD-MM-YYYY");
      var z_collecte_heure = this.creneau_collecte.creneau.begin + " - " + this.creneau_collecte.creneau.end; //

      var z_livraison_date = this.creneau_livraison.date.format("DD-MM-YYYY");
      var z_livraison_heure = this.creneau_livraison.creneau.begin + " - " + this.creneau_livraison.creneau.end;
      return {
        attributes: {
          localisation: this.VueTypelivraison.current_address,
          recuperation: collecte,
          livraison: livraison,
          z_collecte_date: z_collecte_date,
          z_collecte_heure: z_collecte_heure,
          z_livraison_date: z_livraison_date,
          z_livraison_heure: z_livraison_heure
        }
      };
    },
    verification: function verification() {
      var _this4 = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var test1, test2, test3;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this4.alert_message = "";
                _this4.show_alert = false;
                _context4.next = 4;
                return _this4.verificationTypeLivraison();

              case 4:
                test1 = _context4.sent;
                _context4.next = 7;
                return _this4.VerificationCrenaux();

              case 7:
                test2 = _context4.sent;
                _context4.next = 10;
                return _this4.VerificationAdress();

              case 10:
                test3 = _context4.sent;

                if (!(test1 && test2 && test3)) {
                  _context4.next = 15;
                  break;
                }

                return _context4.abrupt("return", true);

              case 15:
                _this4.show_alert = true;
                _this4.alert_attribut_class = "alert-danger ml-md-4";
                return _context4.abrupt("return", false);

              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    VerificationAdress: function VerificationAdress() {
      var _this5 = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (_this5.app_env_prod) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return", true);

              case 2:
                if (!(_this5.VueTypelivraison && _this5.VueTypelivraison.current_address != "")) {
                  _context5.next = 6;
                  break;
                }

                return _context5.abrupt("return", true);

              case 6:
                _this5.alert_message += "- Vous devez selectionner votre adresse <br />";
                return _context5.abrupt("return", false);

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    verificationTypeLivraison: function verificationTypeLivraison() {
      var _this6 = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (_this6.app_env_prod) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return", true);

              case 2:
                if (!(_this6.CartTypeLivraison && _this6.CartTypeLivraison.id)) {
                  _context6.next = 6;
                  break;
                }

                return _context6.abrupt("return", true);

              case 6:
                _this6.alert_message += "- Vous devez selectionner un mode de livraison.<br />";
                return _context6.abrupt("return", false);

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    VerificationCrenaux: function VerificationCrenaux() {
      var _this7 = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var livraison, collecte;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                livraison = true;
                collecte = true; //livraison

                if (_this7.creneau_livraison && _this7.creneau_livraison.creneau && _this7.creneau_livraison.creneau.begin) {//
                } else {
                  livraison = false;
                  _this7.alert_message += "- Vous devez selectionner un creneau pour la livraison.<br />";
                }

                if (_this7.creneau_livraison && _this7.creneau_livraison.date && _this7.creneau_livraison.date.isValid()) {//
                } else {
                  livraison = false;
                  _this7.alert_message += "- Vous devez selectionner une date pour la livraison.<br />";
                } //collecte


                if (_this7.creneau_collecte && _this7.creneau_collecte.creneau && _this7.creneau_collecte.creneau.begin) {//
                } else {
                  collecte = false;
                  _this7.alert_message += "- Vous devez selectionner un creneau pour la collecte.<br />";
                }

                if (_this7.creneau_collecte && _this7.creneau_collecte.date && _this7.creneau_collecte.date.isValid()) {//
                } else {
                  collecte = false;
                  _this7.alert_message += "- Vous devez selectionner une date pour la collecte.<br />";
                }

                if (!(livraison && collecte)) {
                  _context7.next = 10;
                  break;
                }

                return _context7.abrupt("return", true);

              case 10:
                return _context7.abrupt("return", false);

              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    },
    addProduct: function addProduct(id_product) {
      var qte = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var self = this;
      return new Promise(function (resoleve, reject) {
        self.show_cover = true;
        Appvue_type_script_lang_js_$.post("/cart/add", {
          id: id_product,
          quantity: qte
        }).done(function () {
          /**
           * return html
           */
          console.log(" Product add : ", id_product);
          self.show_cover = false;
          resoleve(true);
        }).fail(function () {
          console.log(" Echec add product : ", id_product);
          self.show_cover = false;
          reject(false);
        });
      });
    },

    /**
     * Supprime un produit / ou supprime et ajoute un autre.( modifier la variante)
     */
    deleteUpdateProduct: function deleteUpdateProduct(id_product) {
      var new_product = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var self = this;
      return new Promise(function (resolve, reject) {
        var product = {
          updates: {}
        };
        self.show_cover = true;
        product.updates[id_product] = 0;
        Appvue_type_script_lang_js_$.post("/cart/update", product).done(function () {
          /**
           * Return html
           */
          console.log(" Product remove : ", id_product);

          if (new_product) {
            resolve(self.addProduct(new_product));
          } else {
            self.show_cover = false;
            resolve(true);
            return true;
          }
        }).fail(function () {
          self.show_cover = false;

          if (self.app_env_prod) {
            reject(false);
          } else {
            resolve(false);
          }
        });
      });
    },
    SaveAttributeCart: function SaveAttributeCart(datas) {
      var self = this;
      return new Promise(function (resolve, reject) {
        self.show_cover = true;
        Appvue_type_script_lang_js_$.post("/cart/update", datas).done(function () {
          self.show_cover = false;
          resolve(true);
        }).fail(function () {
          self.show_cover = false;

          if (self.app_env_prod) {
            reject(false);
          } else {
            resolve(false);
          }
        });
      });
    },
    ev_change_type_livraison: function ev_change_type_livraison(datas) {
      //on MAJ la livraison à partir des valeurs de types de livraiosns.
      this.TypeLivraison = datas; //on MAJ la collecte à partir des valeurs de types de livraiosns.

      var collecte = {
        creneau: datas.creneau,
        delai: this.VueCollecte && this.VueCollecte.delai_jour ? this.VueCollecte.delai_jour : 0,
        // pour collecte le decalage est fixe ou definit par la valeur de this.delai_jour
        delai_next_creneau: datas.delai_next_creneau
      };
      this.collecte_configs = collecte; // MAJ le type de livraiosn dans le panier.

      this.CartTypeLivraisonUpdate();
    },
    CartTypeLivraisonUpdate: function CartTypeLivraisonUpdate() {
      var _this8 = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!(_this8.cart && _this8.cart.item_count > 0)) {
                  _context8.next = 15;
                  break;
                }

                if (!(_this8.CartTypeLivraison && _this8.CartTypeLivraison !== "")) {
                  _context8.next = 11;
                  break;
                }

                if (!(_this8.CartTypeLivraison.id != _this8.TypeLivraison.id)) {
                  _context8.next = 9;
                  break;
                }

                _context8.next = 5;
                return _this8.deleteUpdateProduct(_this8.CartTypeLivraison.id, _this8.TypeLivraison.id);

              case 5:
                _context8.next = 7;
                return _this8.loadcart();

              case 7:
                _context8.next = 9;
                return _this8.getProductType();

              case 9:
                _context8.next = 13;
                break;

              case 11:
                _context8.next = 13;
                return _this8.addProductTypeLivraison();

              case 13:
                _context8.next = 16;
                break;

              case 15:
                console.log("CartTypeLivraisonUpdate() panier vide");

              case 16:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    },

    /**
     * Ajoute le produit permettant de definir le mode de livraiosn,
     * s"execute si le mode de livraiosn n'est pas definit.
     */
    addProductTypeLivraison: function addProductTypeLivraison() {
      var _this9 = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return _this9.addProduct(_this9.TypeLivraison.id);

              case 2:
                _context9.next = 4;
                return _this9.loadcart();

              case 4:
                _context9.next = 6;
                return _this9.getProductType();

              case 6:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }))();
    },

    /**
     * Applique un type de livraison.
     */
    apply_type_livraison_by_id: function apply_type_livraison_by_id(id) {
      for (var i in this.blocks_type_livraisons) {
        if (id == this.blocks_type_livraisons[i].id) {
          this.VueTypelivraison.select_type_tab(i);
          this.ev_change_type_livraison(this.blocks_type_livraisons[i]);
        }
      }
    },
    ev_creneau_livraison: function ev_creneau_livraison(creneau) {
      this.creneau_livraison = creneau;
      console.log("index ev_creneau_livraison", creneau);
    },
    ev_creneau_collecte: function ev_creneau_collecte(creneau) {
      this.creneau_collecte = creneau;
      console.log("index ev_creneau_collecte", creneau);
    },
    HideStaticLoading: function HideStaticLoading() {
      Appvue_type_script_lang_js_$(".londing-cover.static").fadeOut(600);
    },
    alert_close: function alert_close() {
      this.show_alert = false;
    }
  },
  computed: {
    /**
     * Contient les id de type de livraisons.
     */
    typeLivraisonIds: {
      get: function get() {
        var ids = [];

        for (var i in this.blocks_type_livraisons) {
          ids.push(this.blocks_type_livraisons[i].id);
        }

        return ids;
      }
    },

    /**
     * contient la valeur du montant du shipping.
     */
    newpriceshipping: {
      get: function get() {
        if (this.cart.total_price) {
          //console.log("cart newpriceshipping ");
          Appvue_type_script_lang_js_$(".panier .sup-total .money").html(ShopifyformatMoney(this.cart.items_subtotal_price, "{{amount_with_comma_separator}} €"));
          Appvue_type_script_lang_js_$(".panier .total .money").html(ShopifyformatMoney(this.cart.total_price, "{{amount_with_comma_separator}} €"));
        }

        if (this.TypeLivraison.montant && this.TypeLivraison.montant !== "0" && this.TypeLivraison.montant !== 0) {
          //console.log("notcart newpriceshipping ", Shopify);
          Appvue_type_script_lang_js_$(".panier .price-livraion").html(ShopifyformatMoney(this.TypeLivraison.montant, "{{amount_with_comma_separator}} €"));
          return this.TypeLivraison.montant;
        } else {
          Appvue_type_script_lang_js_$(".panier .price-livraion").html("offert");
          return "offert";
        }
      }
    }
  }
});
// CONCATENATED MODULE: ./src/App/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_Appvue_type_script_lang_js_ = (Appvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/App/index.vue?vue&type=style&index=0&lang=scss&
var Appvue_type_style_index_0_lang_scss_ = __webpack_require__("459d");

// CONCATENATED MODULE: ./src/App/index.vue






/* normalize component */

var App_component = Object(componentNormalizer["a" /* default */])(
  src_Appvue_type_script_lang_js_,
  Appvue_type_template_id_4e558af1_render,
  Appvue_type_template_id_4e558af1_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var App = (App_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/Creneaux.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var Creneauxvue_type_script_lang_js_$ = window.jQuery;
/* harmony default export */ var Creneauxvue_type_script_lang_js_ = ({
  name: "App",
  components: {
    creneau: App
  },
  data: function data() {
    return {
      app_env_prod: config.IsProduction,
      titre_module: config.appTitle,
      nombre_res_creneau: config.nombre_res_creneau,
      blocks_type_livraisons: config.blocks_type_livraisons,
      collecte_current_date: config.current_date,
      livraison_current_date: config.current_date,
      nombre_semaine: config.nombre_semaine,
      plage_heures_valide: config.plage_heures_valide,
      collecte_jour_desactivee: config.jour_desactivee,
      livraison_jour_desactivee: config.jour_desactivee,
      collecte_date_desactivee: config.date_desactivee,
      livraison_date_desactivee: config.date_desactivee,
      disable_heureday: config.disable_heureday,
      disable_heuredate: config.disable_heuredate,
      url_save_creneau: config.url_save_creneau,
      url_get_creneau: config.url_get_creneau,
      collecte_deccalage_creneau_depart: config.deccalage_creneau_depart,
      filters: config.filters,
      collecte_delai_jour: 0,
      collecte_interval: 120,
      livraison_delai_jour: 3,
      livraison_interval: 120
    };
  },
  mounted: function mounted() {
    this.init();
  },
  methods: {
    init: function init() {
      /**
       * Gestion du click sur le bouton de sousmission du panier.
       */
      (function () {
        Creneauxvue_type_script_lang_js_$(".creneaux-mbt .cart-checkout .submit-cart-test").click(function (elem) {
          Creneauxvue_type_script_lang_js_$(this).removeClass("bg-danger");
          Creneauxvue_type_script_lang_js_$(".loadding", elem.target).addClass("fa-spin");
          Creneauxvue_type_script_lang_js_$(".fa-arrow-right", elem.target).fadeOut(600, function () {
            Creneauxvue_type_script_lang_js_$(".loadding", elem.target).fadeIn(600);
          });
          Creneauxvue_type_script_lang_js_$(document).trigger("SaveCreneauxChechout");
        });
      })();
    }
  }
});
// CONCATENATED MODULE: ./src/Creneaux.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_Creneauxvue_type_script_lang_js_ = (Creneauxvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/Creneaux.vue





/* normalize component */

var Creneaux_component = Object(componentNormalizer["a" /* default */])(
  src_Creneauxvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Creneaux = __webpack_exports__["default"] = (Creneaux_component.exports);

/***/ }),

/***/ "459d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("947a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "5174":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_calendar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f96e");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_calendar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_calendar_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "947a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f96e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=AppAllCreneaux.umd.4.js.map