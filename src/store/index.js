import Vue from "vue";
import Vuex from "vuex";
import Utilities from "../App/js/Utilities";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // -------------------------------------------------------------
    //  Configuration par defaut.
    // -------------------------------------------------------------
    creneauConfigs: Utilities.getDefaultCreneauConfig(),
    creneauFilters: Utilities.filter(),
    creneauType: Utilities.getDefaultTypeLivraion(),
    /**
     * Représente l'index de la Tab sélectionné par defaut.
     */
    activeType: 0,
    /**
     * Date du jour.
     */
    dateDuJour: null,
    // -------------------------------------------------------------
    //  Gestion des données selectionnes.( date et creneau)
    // -------------------------------------------------------------
    /**
     * Date selectionné automatiquement par l'App ou manuelment par l'utilisateur.
     * Format anglais. => "YYYY-MM-DD"
     * Les données doivent etre stocker dans creneauInfo[type]date
     */
    creneauCollecte: {
      hour: false,
      date_string: false,
      date: false
    },
    creneauLivraison: {
      hour: false,
      date_string: false,
      date: false
    }
  },
  getters: {
    /**
     * Retourne les index des jours activées.
     * @param {*} state
     * @returns
     */
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
    /**
     * Retourne le texte de l'option.
     * @param {*} state.
     * @returns.
     */
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
    },
    /**
     * Determine la date minimal utilisable par l'application,
     * Elle est etroitement lié à la date du jour.
     */
    appDate(state) {
      if (state.dateDuJour) {
        var d = moment(state.dateDuJour);
        return d;
      } else return null;
    }
  },
  mutations: {
    SELECTTYPETAB: (state, payload) => {
      state.creneauType.forEach(item => (item.active = false));
      state.creneauType[payload].active = true;
      state.activeType = payload;
    },
    RESETDATAS: state => {
      state.creneauConfigs = Utilities.getDefaultCreneauConfig();
      state.creneauFilters = Utilities.filter();
      state.creneauType = Utilities.getDefaultTypeLivraion();
    },
    DATEDUJOUR: (state, date) => {
      state.dateDuJour = date;
    },
    ApplySelectDate: (state, payload) => {
      if (payload.type === Utilities.crex1.id) {
        state.creneauCollecte.date_string = payload.date_string;
      } else if (payload.type === Utilities.crex2.id) {
        state.creneauLivraison.date_string = payload.date_string;
      }
    },
    ApplySelectHour: (state, payload) => {
      if (payload.type === Utilities.crex1.id) {
        state.creneauCollecte.hour = payload.hour;
        state.creneauCollecte.date = payload.date;
      } else if (payload.type === Utilities.crex2.id) {
        state.creneauLivraison.hour = payload.hour;
        state.creneauLivraison.date = payload.date;
      }
    }
  },
  actions: {
    SelectTypeTab({ commit }, payload) {
      commit("SELECTTYPETAB", payload);
    },
    ResetDatas({ commit }) {
      commit("RESETDATAS");
    },
    SetDateDuJour({ commit }, date) {
      commit("DATEDUJOUR", date);
    },
    SetSelectDate({ commit }, payload) {
      commit("ApplySelectDate", payload);
    },
    SetSelectHour({ commit }, payload) {
      commit("ApplySelectHour", payload);
    }
  },
  modules: {}
});
