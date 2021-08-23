((typeof self !== 'undefined' ? self : this)["webpackJsonpcreneauxMylittlepressing"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpcreneauxMylittlepressing"] || []).push([[6],{

/***/ "92a5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"a7d58c8e-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App/components/admin/Forms/CreneauFilters.vue?vue&type=template&id=eae5882a&scoped=true&lang=html&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('b-form',[_c('div',{staticClass:"ctn-action-button d-flex justify-content-end mb-2"},[_c('b-button',{attrs:{"variant":"outline-info","size":"sm"},on:{"click":function($event){return _vm.FilterAdd()}}},[_vm._v(" Ajouter un filtre + ")])],1),_c('div',{staticClass:"accordion",attrs:{"role":"tablist"}},_vm._l((_vm.creneauFilters),function(filter,index){return _c('b-card',{key:index,staticClass:"mb-2",attrs:{"no-body":""}},[_c('b-card-header',{staticClass:"p-1",attrs:{"header-tag":"header","role":"tab"}},[_c('b-button',{directives:[{name:"b-toggle",rawName:"v-b-toggle",value:('config-accordion-' + index),expression:"'config-accordion-' + index"}],attrs:{"block":"","variant":"transparent"}},[_c('strong',[_vm._v(" Filtre "+_vm._s(index + 1)+": "+_vm._s(filter.titre)+" ")])]),_c('div',{staticClass:"ctn-action-button static"},[_c('b-button',{attrs:{"variant":"outline-danger","size":"sm"},on:{"click":function($event){return _vm.FilterRemove(index)}}},[_c('b-icon',{attrs:{"icon":"trash-fill"}})],1)],1)],1),_c('b-collapse',{attrs:{"id":'config-accordion-' + index,"visible":index === 0 ? true : false,"accordion":"my-accordion","role":"tabpanel"}},[_c('b-card-body',[_c('b-form-group',[_c('b-form-group',{attrs:{"label":"Titre du filtre"}},[_c('b-form-input',{staticClass:"mb-2",model:{value:(filter.titre),callback:function ($$v) {_vm.$set(filter, "titre", $$v)},expression:"filter.titre"}})],1),_c('b-form-group',{attrs:{"label":"Données à desactiver"}},[_c('b-form-radio-group',{attrs:{"options":_vm.type_disabled_options,"name":"radio-options","debounce":"2000"},model:{value:(filter.type_disabled),callback:function ($$v) {_vm.$set(filter, "type_disabled", $$v)},expression:"filter.type_disabled"}})],1),(filter.type_disabled === 'hours')?_c('div',[_c('h3',{staticClass:"border-bottom pb-2 mb-2 mt-4"},[_vm._v(" desactiver une plage d'heures. ")]),_c('b-form-group',{attrs:{"description":"format H:M, example 8:30"},scopedSlots:_vm._u([{key:"label",fn:function(){return [_c('strong',{staticClass:"mt-3 mb-2 d-block"},[_vm._v(" Selectionner la plage d'heure à desactiver ")])]},proxy:true}],null,true)},[_c('b-row',[_c('b-col',{attrs:{"sm":"6"}},[_c('b-form-input',{staticClass:"mb-2",attrs:{"placeholder":"Heure debut","size":"sm","debounce":"2000"},model:{value:(filter.h_debut),callback:function ($$v) {_vm.$set(filter, "h_debut", $$v)},expression:"filter.h_debut"}})],1),_c('b-col',{attrs:{"sm":"6"}},[_c('b-form-input',{attrs:{"placeholder":"Heure fin","size":"sm","debounce":"2000"},model:{value:(filter.h_fin),callback:function ($$v) {_vm.$set(filter, "h_fin", $$v)},expression:"filter.h_fin"}})],1)],1)],1),_c('hr'),_c('b-form-group',{scopedSlots:_vm._u([{key:"label",fn:function(){return [_c('strong',{staticClass:"mt-3 mb-2 d-block"},[_vm._v(" Selectionner les jours de la semaine ")])]},proxy:true}],null,true)},[_c('b-form-group',[_c('b-form-checkbox',{attrs:{"id":'checkbox-jr-' + index,"size":"sm","value":"all","unchecked-value":"manuel"},on:{"change":function($event){return _vm.SelectAllDate($event, index, filter.jours_select)}},model:{value:(filter.jourmode),callback:function ($$v) {_vm.$set(filter, "jourmode", $$v)},expression:"filter.jourmode"}},[_vm._v(" Tous les jours ")])],1),_c('b-form-group',{attrs:{"label":"Jours"},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var ariaDescribedby = ref.ariaDescribedby;
return [_c('b-form-checkbox-group',{attrs:{"id":'checkbox-jour-group-' + index,"options":_vm.joursActiveOptions,"aria-describedby":ariaDescribedby,"size":"sm"},on:{"change":function($event){return _vm.SelectOneDate(index)}},model:{value:(filter.jours_select),callback:function ($$v) {_vm.$set(filter, "jours_select", $$v)},expression:"filter.jours_select"}})]}}],null,true)})],1),_c('hr')],1):_vm._e(),(filter.type_disabled === 'days')?_c('h3',{staticClass:"border-bottom pb-2 mb-2 mt-4"},[_vm._v(" Desactivation des jours ")]):_vm._e(),(filter.type_disabled !== '')?_c('div',[_c('b-form-group',{scopedSlots:_vm._u([{key:"label",fn:function(){return [_c('div',{staticClass:"\n                      d-flex\n                      justify-content-between\n                      aligns-items-center\n                      mt-3\n                    "},[_c('strong',[_vm._v(" Selectionner les dates ")]),_c('div',{staticClass:"ctn-action-button"},[_c('b-button',{attrs:{"variant":"outline-info","size":"sm"},on:{"click":function($event){return _vm.FilterAddDatedisabled(filter.date_desactivee)}}},[_vm._v(" Ajouter une date + ")])],1)])]},proxy:true}],null,true)},[_c('div',[_c('b-row',_vm._l((filter.date_desactivee),function(date,in_dd){return _c('b-col',{key:in_dd,staticClass:"d-flex align-items-center",attrs:{"sm":"4"}},[_c('b-input-group',{staticClass:"mb-2",attrs:{"size":"sm"}},[_c('b-form-datepicker',{attrs:{"id":'datepicker-' + index + '-' + in_dd,"min":_vm.min_date,"locale":"fr"},model:{value:(date.date),callback:function ($$v) {_vm.$set(date, "date", $$v)},expression:"date.date"}}),_c('b-input-group-append',[_c('b-button',{attrs:{"variant":"outline-danger","size":"sm"},on:{"click":function($event){return _vm.FilterRemoveDateDesactivee(
                                  in_dd,
                                  filter.date_desactivee
                                )}}},[_c('b-icon',{attrs:{"icon":"trash-fill"}})],1)],1)],1)],1)}),1)],1)]),_c('hr'),_c('b-form-group',{scopedSlots:_vm._u([{key:"label",fn:function(){return [_c('div',{staticClass:"\n                      d-flex\n                      justify-content-between\n                      aligns-items-center\n                      mt-3\n                    "},[_c('strong',[_vm._v(" Selectionner les periodes ")]),_c('div',{staticClass:"ctn-action-button"},[_c('b-button',{attrs:{"variant":"outline-info","size":"sm"},on:{"click":function($event){return _vm.FilterAddPeriodedisabled(
                              filter.periode_desactivee
                            )}}},[_vm._v(" Ajouter une periode + ")])],1)])]},proxy:true}],null,true)},[_c('div',[_c('b-row',_vm._l((filter.periode_desactivee),function(date,in_pd){return _c('b-col',{key:in_pd,attrs:{"sm":"6"}},[_c('b-input-group',{staticClass:"mb-2",attrs:{"size":"sm"}},[_c('b-form-datepicker',{attrs:{"id":'datedebut-' + index + '-' + in_pd,"placeholder":"Date de debut","min":_vm.min_date},model:{value:(date.debut),callback:function ($$v) {_vm.$set(date, "debut", $$v)},expression:"date.debut"}}),_c('b-form-datepicker',{attrs:{"id":'datefin-' + index + '-' + in_pd,"placeholder":"Date de fin","min":_vm.FilterMinDateFin(date.debut)},model:{value:(date.fin),callback:function ($$v) {_vm.$set(date, "fin", $$v)},expression:"date.fin"}}),_c('b-input-group-append',[_c('b-button',{attrs:{"variant":"outline-danger","size":"sm"},on:{"click":function($event){return _vm.FilterRemovePeriodeDesactivee(
                                  in_pd,
                                  filter.periode_desactivee
                                )}}},[_c('b-icon',{attrs:{"icon":"trash-fill"}})],1)],1)],1)],1)}),1)],1)]),_c('hr'),_c('b-form-group',{scopedSlots:_vm._u([{key:"label",fn:function(){return [_c('div',{staticClass:"\n                      d-flex\n                      justify-content-between\n                      aligns-items-center\n                      mt-3\n                    "},[_c('strong',[_vm._v(" Gerer les zones ")]),_c('div',{staticClass:"ctn-action-button"},[_c('b-button',{attrs:{"variant":"outline-info","size":"sm"},on:{"click":function($event){return _vm.FilterAddZone(filter.pobox)}}},[_vm._v(" Ajouter une zone + ")])],1)])]},proxy:true}],null,true)},[_c('div',{staticClass:"row"},_vm._l((filter.pobox),function(box,i){return _c('div',{key:i,staticClass:"col-md-6 "},[_c('div',{staticClass:"bg-light px-3 mb-2"},[_c('div',{staticClass:"row"},[_c('b-form-group',{staticClass:"col-md-6",attrs:{"label":"Nom de la zone"}},[_c('b-form-input',{attrs:{"trim":"","required":""},model:{value:(box.text),callback:function ($$v) {_vm.$set(box, "text", $$v)},expression:"box.text"}})],1),_c('b-form-group',{staticClass:"col-md-6",attrs:{"label":"Code postale"}},[_c('b-form-input',{attrs:{"trim":"","required":""},model:{value:(box.value),callback:function ($$v) {_vm.$set(box, "value", $$v)},expression:"box.value"}})],1)],1)])])}),0)]),_c('hr')],1):_vm._e()],1)],1)],1)],1)}),1)]),_c('pre',[_vm._v("creneauFilters "+_vm._s(_vm.creneauFilters)+" ")])],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/App/components/admin/Forms/CreneauFilters.vue?vue&type=template&id=eae5882a&scoped=true&lang=html&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.for-each.js
var es_array_for_each = __webpack_require__("4160");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./src/App/js/Utilities.js
var Utilities = __webpack_require__("2069");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App/components/admin/Forms/CreneauFilters.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var CreneauFiltersvue_type_script_lang_js_ = ({
  name: "CreneauBase",
  props: {
    joursActive: {
      type: Array,
      required: true
    }
  },
  components: {//
  },
  data: function data() {
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var minDate = new Date(today);
    return {
      //filters: [Utilities.filter()],
      min_date: minDate,
      type_disabled_options: [{
        text: "Desactive les plages d'heures",
        value: "hours"
      }, {
        text: "Desactive les jours",
        value: "days"
      }]
    };
  },
  mounted: function mounted() {//
  },
  watch: {//
  },
  computed: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["c" /* mapState */])(["creneauFilters"])), {}, {
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
  }),
  methods: {
    FilterAddDatedisabled: function FilterAddDatedisabled(date_desactivee) {
      date_desactivee.push({
        date: ""
      });
    },
    FilterAddPeriodedisabled: function FilterAddPeriodedisabled(periode_disabled) {
      periode_disabled.push({
        debut: "",
        fin: ""
      });
    },
    FilterAddSelectJour: function FilterAddSelectJour() {//
    },
    SelectAllDate: function SelectAllDate(check, i) {
      var _this = this;

      if (this.creneauFilters[i]) {
        this.creneauFilters[i].jours_select = [];

        if (check === "all") {
          this.joursActive.forEach(function (item) {
            _this.creneauFilters[i].jours_select.push(item.indice);
          });
        }
      }
    },
    SelectOneDate: function SelectOneDate(i) {
      if (this.creneauFilters[i]) {
        if (this.creneauFilters[i].jours_select.length >= this.joursActive.length) {
          this.creneauFilters[i].jourmode = "all";
        } else {
          this.creneauFilters[i].jourmode = "manuel";
        }
      }
    },
    FilterRemoveDateDesactivee: function FilterRemoveDateDesactivee(i, dates) {
      if (dates[i]) {
        dates.splice(i, 1);
      }
    },
    FilterRemovePeriodeDesactivee: function FilterRemovePeriodeDesactivee(i, dates) {
      if (dates[i]) {
        dates.splice(i, 1);
      }
    },
    FilterMinDateFin: function FilterMinDateFin(min_date) {
      if (!min_date) {
        return this.min_date;
      }

      return min_date;
    },
    FilterAdd: function FilterAdd() {
      //this.creneauFilters.push(Utilities.filter());
      this.$store.dispatch("SetFilterAdd");
    },
    FilterRemove: function FilterRemove(i) {
      if (this.creneauFilters[i]) {
        this.creneauFilters.splice(i, 1);
      }
    },
    FilterAddZone: function FilterAddZone(zones) {
      zones.push({
        text: "",
        value: ""
      });
    }
  }
});
// CONCATENATED MODULE: ./src/App/components/admin/Forms/CreneauFilters.vue?vue&type=script&lang=js&
 /* harmony default export */ var Forms_CreneauFiltersvue_type_script_lang_js_ = (CreneauFiltersvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/App/components/admin/Forms/CreneauFilters.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  Forms_CreneauFiltersvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "eae5882a",
  null
  
)

/* harmony default export */ var CreneauFilters = __webpack_exports__["default"] = (component.exports);

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
//# sourceMappingURL=creneauxMylittlepressing.umd.6.js.map