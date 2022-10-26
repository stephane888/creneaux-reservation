import Vue from "vue";
import Vuex from "vuex";
import Utilities from "../App/js/Utilities";
import moment from "moment";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    //configuration par defaut de la map
    configs: {},

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
      date: false,
    },
    creneauLivraison: {
      hour: false,
      date_string: false,
      date: false,
    },
    /**
     * Contient les données de localisation choisie par l'utilisateur ou charger à partir de localstorage.
     */
    location: Utilities.getLocation(),
    /**
     */
    isSaveInProd: false,
    alert_message: null,
  },
  getters: {
    /**
     * Retourne les index des jours activées.
     * @param {*} state
     * @returns
     */
    joursActive: (state) => {
      const result = [];
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
    activeTabOption: (state) => {
      function formatString(str) {
        const regex = /\{\{(.*?)\}\}/g;
        let found;
        let int = 0;
        while ((found = regex.exec(str)) !== null && int < 10) {
          int++;
          const attr = found[1].trim(" ");
          str = str.replace(
            found[0],
            state.creneauType[i][attr] ? state.creneauType[i][attr] : "..."
          );
        }
        return str;
      }
      const i = state.activeType;
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
        const d = moment(state.dateDuJour);
        return d;
      } else return null;
    },
  },
  mutations: {
    SELECTTYPETAB: (state, payload) => {
      state.creneauType.forEach((item) => (item.active = false));
      state.creneauType[payload].active = true;
      state.activeType = payload;
    },
    RESETDATAS: (state) => {
      state.creneauConfigs = Utilities.getDefaultCreneauConfig();
      state.creneauFilters = Utilities.filter();
      state.creneauType = Utilities.getDefaultTypeLivraion();
    },
    SETDATAS: (state, conf) => {
      state.creneauConfigs = conf.creneauConfigs;
      state.creneauFilters = conf.creneauFilters;
      state.creneauType = conf.creneauType;
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
    },
    FilterAdd: (state) => {
      state.creneauFilters.push(Utilities.getDefaultFilter());
    },
    LOCATION: (state, payload) => {
      state.location = payload;
    },
    SETisSaveInProd: (state, payload) => {
      state.isSaveInProd = payload;
    },
    SET_MAP_CONFIGS(state, payload) {
      state.configs = payload;
    },
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
    },
    SetFilterAdd({ commit }) {
      commit("FilterAdd");
    },
    setLocation({ commit }, payload) {
      commit("LOCATION", payload);
    },
    loadPreProdConfigs({ commit }, shop) {
      Utilities.LoadValues(shop).then((resp) => {
        if (resp) {
          commit("SETDATAS", resp);
          commit("SETisSaveInProd", resp.status);
        }
      });
    },
    UpdateIsSaveInProd({ commit }, status) {
      commit("SETisSaveInProd", status);
    },
    UpdateMapConfigs({ commit }, datas) {
      console.log("updatemaps", datas);
      commit("SET_MAP_CONFIGS", datas);
    },
  },
  modules: {},
});
