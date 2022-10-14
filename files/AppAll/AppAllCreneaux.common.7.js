((typeof self !== 'undefined' ? self : this)["webpackJsonpAppAllCreneaux"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpAppAllCreneaux"] || []).push([[7],{

/***/ "4216":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5da2cd20-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/AppAdmin/Forms/TypeLivraion.vue?vue&type=template&id=71a6253d&scoped=true&lang=html&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('b-form',[_c('h4',[_vm._v("Type de livraison")]),_c('div',{staticClass:"accordion",attrs:{"role":"tablist"}},_vm._l((_vm.creneauTypes.typelivraison),function(type,i){return _c('b-card',{key:i,staticClass:"mb-2",attrs:{"no-body":""}},[_c('b-card-header',{staticClass:"p-1",attrs:{"header-tag":"header","role":"tab"}},[_c('b-button',{directives:[{name:"b-toggle",rawName:"v-b-toggle",value:('config-accordion-' + i),expression:"'config-accordion-' + i"}],attrs:{"block":"","variant":"transparent"}},[_c('strong',[_vm._v(" Type "+_vm._s(i + 1)+" : "),_c('i',[_vm._v(_vm._s(type.titre))])])])],1),_c('b-collapse',{attrs:{"id":'config-accordion-' + i,"visible":i === 0 ? true : false,"accordion":"my-accordion-type","role":"tabpanel"}},[_c('b-card-body',[_c('b-form-group',{scopedSlots:_vm._u([{key:"label",fn:function(){return [_c('strong',{staticClass:"mt-3 mb-2 d-block"},[_vm._v(" Type de livraison. ")])]},proxy:true}],null,true)},[_c('b-form-group',{attrs:{"label":"Selectionner le type de livraison"}},[_c('b-form-input',{staticClass:"mb-2",attrs:{"placeholder":"Titre du type de livraison"},model:{value:(type.titre),callback:function ($$v) {_vm.$set(type, "titre", $$v)},expression:"type.titre"}})],1)],1),_c('b-form-group',{attrs:{"label":"Description"},scopedSlots:_vm._u([{key:"description",fn:function(){return [_c('div',{pre:true},[_vm._v(" vous pouvez utiliser les champs dynamic suivants: {{ titre }}, {{ montant }}, {{ creneau }}, {{ delai_next_creneau }}, {{ delai }} ")])]},proxy:true}],null,true)},[_c('b-form-textarea',{staticClass:"mb-2",attrs:{"placeholder":"Enter something...","rows":"3","max-rows":"3"},model:{value:(type.body),callback:function ($$v) {_vm.$set(type, "body", $$v)},expression:"type.body"}})],1),_c('b-form-group',{attrs:{"label":"Montant libélé"},scopedSlots:_vm._u([{key:"description",fn:function(){return [_c('div',{pre:true},[_vm._v(" vous pouvez utiliser les champs dynamic suivants: {{ titre }}, {{ montant }}, {{ creneau }}, {{ delai_next_creneau }}, {{ delai }} ")])]},proxy:true}],null,true)},[_c('b-form-input',{staticClass:"mb-2",attrs:{"placeholder":"Libelé"},model:{value:(type.montant_libele),callback:function ($$v) {_vm.$set(type, "montant_libele", $$v)},expression:"type.montant_libele"}})],1),_c('b-form-group',{attrs:{"label":"Montant"}},[_c('b-form-input',{staticClass:"mb-2",attrs:{"placeholder":"montant"},model:{value:(type.montant),callback:function ($$v) {_vm.$set(type, "montant", $$v)},expression:"type.montant"}})],1),_c('b-form-group',{attrs:{"label":"Type"}},[_c('b-form-input',{staticClass:"mb-2",attrs:{"placeholder":"type"},model:{value:(type.type),callback:function ($$v) {_vm.$set(type, "type", $$v)},expression:"type.type"}})],1),_c('b-form-group',{attrs:{"label":"Durée d'un creneau"}},[_c('b-form-input',{staticClass:"mb-2",attrs:{"placeholder":"creneau","type":"number"},model:{value:(type.creneau),callback:function ($$v) {_vm.$set(type, "creneau", $$v)},expression:"type.creneau"}})],1),_c('b-form-group',{attrs:{"label":"interval entre les creneaux"}},[_c('b-form-input',{staticClass:"mb-2",attrs:{"placeholder":"delai_next_creneau","type":"number"},model:{value:(type.delai_next_creneau),callback:function ($$v) {_vm.$set(type, "delai_next_creneau", $$v)},expression:"type.delai_next_creneau"}})],1),_c('b-form-group',{attrs:{"label":"Delai en jour(s)"}},[_c('b-form-input',{staticClass:"mb-2",attrs:{"placeholder":"delai","type":"number"},model:{value:(type.delai),callback:function ($$v) {_vm.$set(type, "delai", $$v)},expression:"type.delai"}})],1),_c('b-form-group',{attrs:{"label":"Selectionner le produit"}},[_c('b-form-select',{attrs:{"options":_vm.products},model:{value:(type.id),callback:function ($$v) {_vm.$set(type, "id", $$v)},expression:"type.id"}})],1),_c('b-form-group',[_c('b-form-checkbox',{attrs:{"size":"sm","value":true,"unchecked-value":false},model:{value:(type.active),callback:function ($$v) {_vm.$set(type, "active", $$v)},expression:"type.active"}},[_vm._v(" Activé par defaut ")])],1),_c('hr'),_c('h5',[_vm._v("Surchagé le delai de livraison en function du jour.")]),_c('div',{staticClass:"ctn-action-button d-flex justify-content-end mb-2"},[_c('b-button',{attrs:{"variant":"outline-info","size":"sm"},on:{"click":function($event){return _vm.OverrideAdd(i)}}},[_vm._v(" Ajouter une surcharge + ")])],1),_c('div',{staticClass:"accordion",attrs:{"role":"tablist"}},_vm._l((type.delais_jour),function(override,ii){return _c('b-card',{key:ii,staticClass:"mb-2",attrs:{"no-body":""}},[_c('b-card-header',{staticClass:"p-1",attrs:{"header-tag":"header","role":"tab"}},[_c('b-button',{directives:[{name:"b-toggle",rawName:"v-b-toggle",value:('config-accordion-over' + ii),expression:"'config-accordion-over' + ii"}],attrs:{"block":"","variant":"transparent"}},[_c('strong',[_vm._v(" Surcharge "+_vm._s(ii + 1)+" : "+_vm._s(_vm.getJour(override.day))+" ")])])],1),_c('b-collapse',{attrs:{"id":'config-accordion-over' + ii,"visible":ii === 0 ? false : false,"accordion":"my-accordion-surcharge","role":"tabpanel"}},[_c('b-card-body',[_c('b-form-group',{scopedSlots:_vm._u([{key:"label",fn:function(){return [_c('strong',{staticClass:"mt-3 mb-2 d-block"},[_vm._v(" Surcharger un delai de livraison. ")])]},proxy:true}],null,true)},[_c('b-row',[_c('b-col',{attrs:{"sm":"4"}},[_c('b-form-group',{attrs:{"label":"Selectionner le jour de la semaine"}},[_c('b-form-select',{attrs:{"options":_vm.joursActiveOptions},model:{value:(override.day),callback:function ($$v) {_vm.$set(override, "day", $$v)},expression:"override.day"}})],1)],1),_c('b-col',{attrs:{"sm":"4"}},[_c('b-form-group',{attrs:{"label":"Delai en jour(s)"}},[_c('b-form-input',{staticClass:"mb-2",attrs:{"placeholder":"delai","type":"number"},model:{value:(override.delai),callback:function ($$v) {_vm.$set(override, "delai", $$v)},expression:"override.delai"}})],1)],1)],1)],1)],1)],1)],1)}),1)],1)],1)],1)}),1),_c('hr')])],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/AppAdmin/Forms/TypeLivraion.vue?vue&type=template&id=71a6253d&scoped=true&lang=html&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.for-each.js
var es_array_for_each = __webpack_require__("4160");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// EXTERNAL MODULE: ./src/AppAdmin/Utilities.js
var Utilities = __webpack_require__("92c3");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/AppAdmin/Forms/TypeLivraion.vue?vue&type=script&lang=js&



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//import magentoSynchroListSites from "./ListSites.vue";

/* harmony default export */ var TypeLivraionvue_type_script_lang_js_ = ({
  name: "TypeLivraion",
  props: {
    creneauTypes: {
      type: Object,
      required: true
    },
    joursActive: {
      type: Array,
      required: true
    }
  },
  components: {//
  },
  data: function data() {
    return {
      products: [{
        text: "32583132807228",
        value: "32583132807228"
      }, {
        text: "32583132839996",
        value: "32583132839996"
      }, {
        text: "32583132872764",
        value: "32583132872764"
      }]
    };
  },
  mounted: function mounted() {//
  },
  watch: {//
  },
  computed: {
    joursActiveOptions: function joursActiveOptions() {
      var result = [];
      this.joursActive.forEach(function (jour) {
        result.push({
          text: jour.text,
          value: jour.indice
        });
      });
      return result;
    }
  },
  methods: {
    OverrideAdd: function OverrideAdd(i) {
      if (this.creneauTypes.typelivraison[i]) {
        this.creneauTypes.typelivraison[i].delais_jour.push(Utilities["a" /* default */].getDefaultDelaiOverride());
      }
    },
    DeleteOverride: function DeleteOverride(i, ii) {
      if (this.creneauTypes.typelivraison[i] && this.creneauTypes.typelivraison[i].delais_jour[ii]) {
        this.creneauTypes.typelivraison[i].delais_jour.splice(ii, 1);
      }
    },
    getJour: function getJour(indice) {
      for (var i in this.joursActive) {
        if (this.joursActive[i].indice === indice) {
          return this.joursActive[i].text;
        }
      }
    }
  }
});
// CONCATENATED MODULE: ./src/AppAdmin/Forms/TypeLivraion.vue?vue&type=script&lang=js&
 /* harmony default export */ var Forms_TypeLivraionvue_type_script_lang_js_ = (TypeLivraionvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/AppAdmin/Forms/TypeLivraion.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  Forms_TypeLivraionvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "71a6253d",
  null
  
)

/* harmony default export */ var TypeLivraion = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "a434":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var toAbsoluteIndex = __webpack_require__("23cb");
var toInteger = __webpack_require__("a691");
var toLength = __webpack_require__("50c4");
var toObject = __webpack_require__("7b0b");
var arraySpeciesCreate = __webpack_require__("65f0");
var createProperty = __webpack_require__("8418");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');
var USES_TO_LENGTH = arrayMethodUsesToLength('splice', { ACCESSORS: true, 0: 0, 1: 2 });

var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.es/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});


/***/ })

}]);
//# sourceMappingURL=AppAllCreneaux.common.7.js.map