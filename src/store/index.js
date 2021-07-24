import Vue from "vue";
import Vuex from "vuex";
import Utilities from "../App/js/Utilities";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    creneauConfigs: {
      days: [
        {
          text: "Lundi",
          value: 0,
          debut: "7:30",
          fin: "21:30",
          indice: 1
        },
        {
          text: "Mardi",
          value: 1,
          debut: "7:30",
          fin: "21:30",
          indice: 2
        },
        {
          text: "Mercredi",
          value: 1,
          debut: "7:30",
          fin: "21:30",
          indice: 3
        },
        {
          text: "Jeudi",
          value: 1,
          debut: "7:30",
          fin: "21:30",
          indice: 4
        },
        {
          text: "Vendredi",
          value: 1,
          debut: "7:30",
          fin: "21:30",
          indice: 5
        },
        {
          text: "Samedi",
          value: 1,
          debut: "7:30",
          fin: "21:30",
          indice: 6
        },
        {
          text: "Dimanche",
          value: 0,
          debut: "7:30",
          fin: "21:30",
          indice: 0
        }
      ],
      nombre_semaine: 5,
      nombre_res_creneau: 2,
      title: "Gugle Das souhaite finaliser la commande",
      deccalage_creneau_depart: 0
    },
    creneauFilters: [
      {
        titre: "Indisponibilité, congé",
        h_debut: "",
        h_fin: "",
        jour_type: "",
        show_select_date_indice_all: null,
        select_jour_indice: "",
        jourmode: "manuel",
        jours_select: [],
        date_desactivee: [],
        periode_desactivee: []
      }
    ],

    creneauType: [
      {
        titre: "Gratuit",
        body:
          '<div class="col-12 col-sm-6 col-md-4 my-2">Créneau horaire de aeieaeaeie {{ creneau }} min</div><div class="col-12 col-sm-6 col-md-4 my-2">Délai de aeieieiea traitement de {{ delai }} jours</div><div class="col-12 col-sm-6 col-md-4 my-2">Frais de livraison : {{montant}}</div>',
        montant: "Gratuit",
        type: "free",
        creneau: 120,
        delai_next_creneau: 30,
        delai: 3,
        delais_jour: [],
        id: 32583132807228,
        active: true
      },
      {
        titre: "Plus",
        body:
          '<div class="col-12 col-sm-6 col-md-4 my-2">Créneau horaire de {{ creneau }} min</div><div class="col-12 col-sm-6 col-md-4 my-2">Délai de traitement de {{ delai }} jours</div><div class="col-12 col-sm-6 col-md-4 my-2">Frais de livraison : {{montant}}</div>',
        montant_libele: "Frais de livraison : {{montant}}€",
        montant: "9.99€",
        type: "plus",
        creneau: 60,
        delai_next_creneau: 30,
        delai: 2,
        delais_jour: [],
        id: 32583132839996,
        active: false
      },
      {
        titre: "Express",
        body:
          '<div class="col-12 col-sm-6 col-md-4 my-2">Créneau horaire de {{ creneau }} min</div><div class="col-12 col-sm-6 col-md-4 my-2">Délai de traitement de {{ delai }} jours</div><div class="col-12 col-sm-6 col-md-4 my-2">Frais de livraison : {{montant}}</div>',
        montant: "19.99€",
        type: "express",
        creneau: 30,
        delai_next_creneau: 30,
        delai: 1,
        delais_jour: [],
        id: 32583132872764,
        active: false
      },
      {
        titre: "Relaxe",
        body:
          '<div class="col-12 col-sm-6 col-md-4 my-2">Créneau horaire de {{ creneau }} min</div><div class="col-12 col-sm-6 col-md-4 my-2">Délai de traitement de {{ delai }} jours</div><div class="col-12 col-sm-6 col-md-4 my-2">Frais de livraison : {{montant}}</div>',
        montant: "205.99€",
        type: "Relaxe",
        creneau: 30,
        delai_next_creneau: 30,
        delai: 1,
        delais_jour: [],
        id: 32583132872764,
        active: false
      }
    ],
    joursActive: [],
    /* Représente l'index de la Tab sélectionné */
    activeType: 0
  },
  getters: {
    joursActive: state => {
      var result = [];
      if (state.creneauConfigs.days) {
        for (const i in state.creneauConfigs.days) {
          if (state.creneauConfigs.days[i].value) {
            result.push(state.creneauConfigs.days[i]);
          }
        }
      }
      return result;
    },
    activeTabOption: state => {
      function formatString(str) {
        var regex = /\{\{(.*?)\}\}/g;
        let found;
        var int = 0;
        while ((found = regex.exec(str)) !== null && int < 10) {
          int++;
          var attr = found[1].trim(" ");
          str = str.replace(
            found[0],
            state.creneauType[i][attr] ? state.creneauType[i][attr] : "..."
          );
        }
        return str;
      }
      let i = state.activeType;
      if (state.creneauType && state.creneauType[i].body) {
        return formatString(state.creneauType[i].body);
      } else {
        return "";
      }
    }
  },
  mutations: {
    SELECTTYPETAB: (state, payload) => {
      state.creneauType.forEach(item => (item.active = false));
      state.creneauType[payload].active = true;
      state.activeType = payload;
    },
    RESETDATAS: state => {
      state.creneauConfigs = Utilities.DefaultCreneauConfigs();
      state.creneauFilters = Utilities.filter();
      state.creneauType = Utilities.getDefaultTypeLivraion();
    }
  },
  actions: {
    SelectTypeTab({ commit }, payload) {
      commit("SELECTTYPETAB", payload);
    },
    ResetDatas({ commit }) {
      commit("RESETDATAS");
    }
  },
  modules: {}
});
