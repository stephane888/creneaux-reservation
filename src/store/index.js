import Vue from "vue";
import Vuex from "vuex";
import Utilities from "../App/js/Utilities";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    creneauConfigs: Utilities.getDefaultCreneauConfig(),
    creneauFilters: Utilities.filter(),
    creneauType: Utilities.getDefaultTypeLivraion(),
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
