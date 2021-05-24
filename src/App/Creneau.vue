<template>
  <div class="" :class="classes">
    <div class="title-creneau h2" v-html="title"></div>
    <div
      class="d-flex justify-content-between justify-content-md-start line-creneau h1"
    >
      <!--
      on peut egalment utiliser cette option pour fournir rapidement
      les options.
      :custom-label="plage_creneau"

      -->
      <Hours
        :app_date_utilisable_string_hour="app_date_generate_by_calendar"
        :h_debut="h_debut"
        :m_debut="m_debut"
        :h_fin="h_fin"
        :m_fin="m_fin"
        :plage_heures_valide="plage_heures_valide"
        :filters="filters"
        :configs="configs"
        :type_creneau="type_creneau"
        @select_creneau="select_creneau"
      ></Hours>
      <i
        class="icone-svg mb-md-1 mb-lg-2 cursor-pointer"
        @click="display_hide_calandar"
      >
        <svg-calandear></svg-calandear>
      </i>
    </div>

    <p @click="display_hide_calandar" class="cursor-pointer">
      {{ app_date_display }}
    </p>
    <!--
      class 'flat cercle'
    -->

    <div
      class="over-container-date"
      v-if="show_calandar"
      @click="display_hide_calandar"
    ></div>

    <calendar
      v-show="show_calandar"
      :app_date_utilisable_string_hour="app_date_utilisable_string_hour"
      :filters="filters"
      :jour_desactivee="jour_desactivee"
      :nombre_semaine="nombre_semaine"
      :type_creneau="type_creneau"
      :rebuild_creneau="rebuild_creneau"
      ref="calendar"
      @select_date="select_date_calendar"
    ></calendar>
    {{ current_date }}
    <pre style="margin:0;">
      app_date_generate_by_calendar :
      {{ app_date_generate_by_calendar }}
    </pre>
    <pre style="margin:0;">
      app_date_utilisable_string_hour :
      {{ app_date_utilisable_string_hour }}
    </pre>
  </div>
</template>

<script>
//pourquoi ajouter true come dernier paramettre ?
//moment('24/12/2019 09:15:00', "DD MM YYYY hh:mm:ss", true);

//import moment from "moment";
if (window.moment) {
  var moment = window.moment;
}
//import configSite from "./config.js";

import SvgCalandar from "./SvgCalandar.vue";
//import Filtres from "./Filtres.js";
import calendar from "./calendar";
import Hours from "./Hours";
import { DateUtilisable } from "./AppResouces.js";

export default {
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
      default() {
        return ["24-09-2020"];
      }
    },
    plage_heures_valide: {
      type: Array,
      default() {
        return [];
      }
    },
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
      default() {
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
      type: Object,
      default() {
        return moment();
        //return "";
      }
    },
    /**
     * Nombre de semaine exact à afficher.
     */
    nombre_semaine: {
      type: Number,
      default: 4
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
      default() {
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
     * Cette variable contient les données permettant d'appliquer des modifications avant le rendu des creneaux et jours.
     * example: desactivé un creneau, une date, une plage de date, en function de certains critaires.
     */
    filters: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      /**
       * Est la date de base de l'application, forunit uniquement par l'application.
       */
      app_date_utilisable: moment(),
      show_calandar: false,
      app_date_generate_by_calendar: ""
    };
  },
  components: {
    "svg-calandear": SvgCalandar,
    calendar,
    Hours
  },
  watch: {
    configs: {
      handler() {
        this.init_creneau();
      },
      deep: true
    },
    current_date: {
      handler() {
        this.init_creneau();
      },
      deep: true
    }
  },
  computed: {
    /**
     * Date affiché.
     */
    app_date_display: {
      get() {
        if (this.app_date_generate_by_calendar != "") {
          return moment(this.app_date_generate_by_calendar, "DD-MM-YYYY")
            .locale("fr")
            .format("dddd Do MMMM");
        }
        return "";
      }
    },
    /**
     * ne peut pas etre MAJ par l'application.
     */
    app_date_utilisable_string() {
      return this.app_date_utilisable.format("DD-MM-YYYY");
    },
    /**
     * ne peut pas etre MAJ par l'application.
     */
    app_date_utilisable_string_hour() {
      return this.app_date_utilisable.format("DD-MM-YYYY HH:mm:ss");
    }
  },
  methods: {
    async init_creneau() {
      if (this.type_creneau === "livraison") console.log(this.current_date);

      const current_date = moment(this.current_date);
      var index_day_week = current_date.day();
      // si la date de debut est un jour fermé, on remet les heures... à 0, pour permettre que l'heure de debut ne tient pas compte de l'heure de la journée femer.
      if (
        this.type_creneau === "collecte" &&
        this.jour_desactivee.length &&
        this.jour_desactivee.includes(index_day_week)
      ) {
        current_date.set({
          hour: 0,
          minute: 0,
          second: 0
        });
      }
      const DateUtil = new DateUtilisable(
        this.jour_desactivee,
        this.configs.delai,
        this.filters
      );
      this.app_date_utilisable = await DateUtil.date_utilisable(current_date);
    },
    display_hide_calandar() {
      if (this.show_calandar) {
        this.show_calandar = false;
      } else {
        this.show_calandar = true;
      }
    },
    select_date_calendar(date) {
      console.log("date selectionner  ", this.type_creneau, " : ", date);
      if (date.date_string == this.app_date_utilisable_string)
        this.app_date_generate_by_calendar = this.app_date_utilisable_string_hour;
      else this.app_date_generate_by_calendar = date.date_string;
    },
    select_creneau(val) {
      if (!val) return null;
      const date = moment(this.app_date_generate_by_calendar, "DD-MM-YYYY");
      const creneau_begin = val.begin.split(":");
      date.set({ hour: creneau_begin[0], minute: creneau_begin[1] });
      var datas = {
        creneau: val,
        date_string: date.format("DD-MM-YYYY HH:mm:ss"),
        date: date
      };
      console.log(
        "select_creneau : ",
        this.type_creneau,
        "\n",
        val,
        "\n",
        datas
      );
      this.$emit("ev_select_current_creneau", datas);
    }
  }
};
</script>
