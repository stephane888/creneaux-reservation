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
      <advanced-select
        v-model="current_creneau"
        :disabled="disabled_creneau"
        :options="list_creneaux"
        :show-labels="false"
        :searchable="false"
        placeholder="00:00 - 00:00"
        track-by="begin"
        @select="select_current_creneau"
      >
        <!-- Pour l'affichege de la selection. -->
        <template slot="singleLabel" slot-scope="{ option }">
          {{ option.begin }} - {{ option.end }}
        </template>
        <template slot="option" slot-scope="props">
          <span :checkstatus="props.option.checkstatus">
            {{ props.option.begin }} - {{ props.option.end }}
          </span>
        </template>
        <template slot="noOptions">
          Aucun créneau disponible à cette date
        </template>
      </advanced-select>
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
    <div class="container-date flat cercle" v-if="show_calandar">
      <div
        class="calandar-title"
        v-html="calandar_title"
        v-if="calandar_title != ''"
      ></div>
      <ul class="d-flex flex-wrap justify-content-center">
        <div
          v-if="show_day_label"
          class="d-flex flex-wrap justify-content-center w-100"
        >
          <li class="date day">
            Lun.
          </li>
          <li class="date day">
            Mar.
          </li>
          <li class="date day">
            Mer.
          </li>
          <li class="date day">
            Jeu.
          </li>
          <li class="date day">
            Ven.
          </li>
          <li class="date day">
            Sam.
          </li>
          <li class="date day">
            Dim.
          </li>
        </div>
        <li
          v-for="(date, i) in list_calander_days"
          :key="i"
          :class="[
            'date',
            date.status ? 'disable' : 'actif',
            date.custom_class,
            date.select ? 'selected' : ''
          ]"
          @click="select_date(date, i)"
        >
          <span v-if="show_month_in_date" v-html="date.day_french"></span>
          <span v-if="!show_month_in_date" v-html="date.date_month"></span>
        </li>
      </ul>
    </div>
    <div
      class="over-container-date"
      v-if="show_calandar"
      @click="display_hide_calandar"
    ></div>
  </div>
</template>

<script>
var $;
if (window.jQuery) {
  $ = window.jQuery;
} else if (window.$) {
  $ = window.$;
}
//pourquoi ajouter true come dernier paramettre ?
//moment('24/12/2019 09:15:00', "DD MM YYYY hh:mm:ss", true);

//import moment from "moment";
if (window.moment) {
  var moment = window.moment;
}
//import configSite from "./config.js";
import AdvancedSelect from "vue-multiselect";
import SvgCalandar from "./SvgCalandar.vue";
import Filtres from "./Filtres.js";

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
      type: Object
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
       * La date la plus haute.
       * La place ne peux aller au dela de cette date.
       */
      date_max: "",
      /**
       * La date la plus basse.
       * La place ne peux aller en dessous de cette date.
       */
      data_min: "",
      /**
       * date utilisable par l'application ou date de reference.
       * Elle ne  change pas durant le precessus.
       */
      app_date: "",
      //app_date_string: "",
      /**
       * Est la date utilisable par le client.(Peut etre forunit par l'app ou selectionner par le client)
       */
      app_date_current: "",
      //app_date_current_string
      /**
       * Contient la liste des dates.
       */
      list_creneaux: [],
      /**
       * list calendar date
       */
      list_calander_days: [],
      /**
       * current_creneau
       */
      current_creneau: "",
      /**
       *
       */
      disabled_creneau: false,
      /**
       * Pour empecher la date de faire une boucle infinie, on limite le nombre de valeur à 100
       */
      test_creneau: 0,
      /**
       * Pour pouvoir suivre le decallage.
       */
      test_delai_jour: 0,
      /**
       * permet de se rassurer qu'on moins un jour est definit dans la semain et d'empecher une boucle infinie.
       */
      test_jour_semaine: 0,
      /**
       * Permet d'eviter une boucle infinie, dué à une muavaise configuration ou tout autre bug.
       * Le nombre de jour desactivable ne doit pas depassé 100;
       */
      test_date_desactivee: 0,
      /**
       * Permet d'eviter une boucle infinie. limit à 100; (3 mois)
       */
      test_calandar_day: 0,
      show_calandar: false,
      /**
       * datetime minimal.
       * Les creneaux inferieurs à cette date sont desactivés.
       */
      datetime_min: "",
      // # les variables # //
      /**
       * La durée d'un creneau en minutes.
       * example : 120 => 07h00 - 09h00
       */
      app_interval: 120,
      /**
       * La durée entre les creneaux.
       * example : 30 => [ 07h00 - 09h00, 07h30 - 09h30, 8h00 - 10h00, 8h30 - 10h30 ...]
       */
      app_delai_next_creneau: 30,
      /**
       * Le nombre de jour entre la collecte et la livraison.
       */
      app_delai_jour: 0,
      /**
       * Contient la plage de creneau désactivé du au fait que la limit soit atteinte.
       */
      disable_heuredate_limit: [],
      /**
       * configuration de la date.
       */
      show_month_in_date: false,
      show_day_label: false
      //calandar_title: ""
    };
  },
  components: {
    "advanced-select": AdvancedSelect,
    "svg-calandear": SvgCalandar
  },
  mounted() {
    //console.log("init creneau");

    //on defnit les variables lors du chargement.
    this.app_interval = this.interval;
    this.app_delai_jour = this.delai_jour;

    // on initialise le creneau
    /**
     * Pour le moment on desactive l'initialisation par defaut.
     * cela se fait via le watch.configs qui est initialisé par le module TypeLivraison.
     */
    //this.init_creneau();
  },
  watch: {
    current_creneau() {
      //console.log("watch current_creneau", creneau);
      this.renvoit_donnees();
    },
    configs: {
      handler(val) {
        //console.log("%c watch configs ", "background: #222; color: #bada55");
        //console.log(val);
        this.app_interval = val.creneau;
        this.app_delai_jour = val.delai;
        this.app_delai_next_creneau = val.delai_next_creneau;
        this.init_creneau();
      },
      deep: true
    },
    /**
     * S'execute uniquement pour la livraiosn.
     */
    async rebuild_creneau(datas) {
      var self = this;
      console.log(
        "%c rebuild_creneau " + this.type_creneau,
        "background: #22F; color: #FFF"
      );
      console.log(datas);
      // il faut s'assurrer que les creneaux sont definit avant d'utiliser cette function.
      /**
       * La dateMin cest dans date de depart(heure de depart) + le delai entre les creneaux + ( le delai de latence ).
       * (explication: si le delai entre les creneaux == durée d'un creneau alors le prochain commence à la fin du suivant )
       */
      var set_min_date = function(datas) {
        var temps = datas.creneau.begin.split(":");
        self.datetime_min = moment(self.app_date_current_string, "DD-MM-YYYY");
        self.datetime_min.hour(temps[0]);
        self.datetime_min.minute(temps[1]);
        //on ajoute le delai entre les creneaux
        self.datetime_min.add(self.app_delai_next_creneau, "minutes");
      };
      // on verifie si la date est definit
      if (datas.date_string && datas.date_string != "") {
        var date_from_parent = moment(datas.date_string, "DD-MM-YYYY HH:mm:ss");
        if (date_from_parent.isValid()) {
          //On surcharge le delai de livraison.
          await this.OverrideDelaiTraitement(date_from_parent);
          // à partir de la date fournit on evalue la datetime_min utilisable par le client.
          var execution = async function(date_from_parent) {
            if (datas.creneau && datas.creneau.end && datas.creneau.end != "") {
              set_min_date(datas);
            }
            // la fonction date_utilisable declenche tout le processus.
            await self.date_utilisable(date_from_parent);
            await self.builderCalandar();
          };
          execution(date_from_parent);
        } else {
          alert("Date fournit non valide");
        }
        /**/
      }
      //on verifie si cest uniquement les creneau qui sont definit
      else if (datas.creneau && datas.creneau.end && datas.creneau.end != "") {
        //set_min_date(datas);
        /**
         * il faut se rassurer k ce cas nes plaus valide.
         */
      }
    }
  },
  computed: {
    /**
     * Date affiché.
     */
    app_date_display: {
      get() {
        if (this.app_date_current != "") {
          return moment(this.app_date_current)
            .locale("fr")
            .format("dddd Do MMMM");
        }
        return "";
      }
    },
    /**
     * for test
     */
    /*
    app_date_current_display() {
      if (this.app_date_current != "") {
        return this.app_date_current.format("DD-MM-YYYY HH:mm:ss");
      }
      return "";
    },
    /**
     * indice du jour.
     */
    app_date_current_indice() {
      if (this.app_date_current != "") {
        return this.app_date_current.day();
      }
      return "";
    },
    calandar_title: {
      get() {
        if (this.app_date_current != "") {
          return moment(this.app_date_current)
            .locale("fr")
            .format("MMMM <br /> YYYY");
        }
        return "";
      }
    },
    /**
     * Date de début de l'application.
     *
     */
    app_date_string: {
      get() {
        if (this.app_date) {
          return this.app_date.format("DD-MM-YYYY HH:mm:ss");
        } else {
          return false;
        }
      }
    },
    app_date_current_string: {
      get() {
        return this.app_date_current.format("DD-MM-YYYY");
      }
    },
    /**
     * format de date en anglais, utile pour l'app.
     */
    app_date_current_string_en: {
      get() {
        return this.app_date_current.format("YYYY-MM-DD");
      }
    },
    /**
     * date de l'application sans les heure et les minutes.
     * Utiliser pour effectuer les calculs liée à la date.
     */
    app_date_current_en() {
      return moment(this.app_date_current_string_en, "YYYY-MM-DD");
    },
    /**
     * Date la plus petite de l'application.
     * Elle est determiné à partir de l'heure de debut.
     */
    date_min_string: {
      get() {
        return this.data_min.format("DD-MM-YYYY HH:mm:ss");
      }
    }
    /*
    date_string_app_current: {
      get() {
        var date = moment(this.app_date_string, "DD-MM-YYYY HH:mm:ss");
        return date.format("DD-MM-YYYY HH:mm:ss");
      }
    }
    /**/
  },
  methods: {
    display_hide_calandar() {
      if (this.show_calandar) {
        this.show_calandar = false;
      } else {
        this.show_calandar = true;
      }
    },
    /**
     * Action : construit les creneaux à partir de la date definit ou choist par l'utilisateur.
     * Creer les dates min et max du jour utilisable par l'application.
     * La paramettre date doit etre un object moment.
     */
    async dateBorne() {
      // console.log("dateBorne");
      // On ne pas utiliser directement la valeur de date pour crrer la valeur de min et max date, car vuejs concerve
      // la meme valeur entre les variables la MAJ d'une mettra automatiquement la suivante.
      /**
       * il faudra verfier si on peut directemùent utiliser : app_date_current_string
       */
      //var date_string = moment(this.app_date_current).format("DD-MM-YYYY");
      // on utilise app_date_current_string;
      var date_string = this.app_date_current_string;

      this.date_max = moment(date_string, "DD-MM-YYYY");
      this.data_min = moment(date_string, "DD-MM-YYYY");
      if (this.date_max.isValid()) {
        var h_debut = this.h_debut;
        var m_debut = this.m_debut;
        var h_fin = this.h_fin;
        var m_fin = this.m_fin;
        var day_indice = this.date_max.day();
        //surcharge la valeur par defaut avec celle definit en configuration
        if (this.plage_heures_valide.length > 0) {
          if (this.plage_heures_valide[day_indice]) {
            var h_d = this.plage_heures_valide[day_indice].debut.split(":");
            h_debut = parseInt(h_d[0]);
            m_debut = parseInt(h_d[1]);
            var h_f = this.plage_heures_valide[day_indice].fin.split(":");
            h_fin = parseInt(h_f[0]);
            m_fin = parseInt(h_f[1]);
          }
        }

        this.data_min.hours(h_debut);
        this.data_min.minutes(m_debut);
        this.data_min.seconds(0);
        //
        this.date_max.hours(h_fin);
        this.date_max.minutes(m_fin);
        this.date_max.seconds(0);
        /*
        console.log(
          "default date : ",
          this.app_date_current.format("DD-MM-YYYY HH:mm:ss"),
          "\n app_date_string : ",
          this.app_date_string,
          "\n min date : ",
          this.data_min.format("DD-MM-YYYY HH:mm:ss"),
          "\n max date : ",
          this.date_max.format("DD-MM-YYYY HH:mm:ss")
        );
        console.log("dateBorne end");

        /**/
        //
        await this.loadCreneauDisable();
        await this.buildHour();
      }
    },
    /**
     * Contruit les plages d'heures.
     * on vide le creneau
     * Parametres : h_debut( heure de debut), h_fin (heure de fin, ), interval.
     * @public
     */
    async buildHour() {
      //console.log("buildHour debut");
      this.list_creneaux = [];
      this.test_creneau = 0;
      this.current_creneau = "";
      // On utilise la valeur string, pour eviter que les valeurs min et max changent.
      // var date_min_string = moment(this.data_min).format("DD-MM-YYYY HH:mm:ss");
      await this.getIntervalUtilisable(this.date_min_string);
      await this.selectFirtValideCreneau();
      //console.log("buildHour Fin");
    },
    /**
     * date_min_strin est un string.
     * @private
     */
    getIntervalUtilisable(date_min_string) {
      //console.log("getIntervalUtilisable debut : ", date_min_string);
      var self = this;
      return new Promise(function(resolve, reject) {
        self.test_creneau++;
        //  console.log("getIntervalUtilisable");
        if (self.test_creneau > 99) {
          alert("Probleme de configuration : Creneau");
          reject(false);
          return false;
        }
        var bloc_date = {};
        var date_time = moment(date_min_string, "DD-MM-YYYY HH:mm:ss");
        var date_time_end = moment(date_min_string, "DD-MM-YYYY HH:mm:ss").add(
          self.app_interval,
          "minutes"
        );
        var date_time_next_creneau = moment(
          date_min_string,
          "DD-MM-YYYY HH:mm:ss"
        ).add(self.app_delai_next_creneau, "minutes");
        bloc_date.begin = date_time.format("HH:mm");
        //
        self
          .checkIsCreneauValide(date_time, date_time_end, date_min_string)
          .then(async function(valeur) {
            // la date est desactivé.
            if (valeur.status) {
              bloc_date.$isDisabled = true;
              bloc_date.checkstatus = valeur.verificateur;
            } else {
              // on patiente le temps de la verification.
              const filter = await self.ApplyFilters(
                date_time,
                date_time_end,
                date_min_string
              );

              if (filter.status) {
                bloc_date.$isDisabled = filter.status;
                bloc_date.checkstatus = filter.verificateur;
              }
            }

            if (self.date_max.diff(date_time_end, "minutes") >= 0) {
              bloc_date.end = date_time_end.format("HH:mm");
              if (!bloc_date.$isDisabled) {
                self.list_creneaux.push(bloc_date);
              }

              resolve(
                self.getIntervalUtilisable(
                  date_time_next_creneau.format("DD-MM-YYYY HH:mm:ss")
                )
              );
            } else {
              resolve(true);
            }
          });
      });
    },
    /**
     * Applique le filtre sur chaque creneau ou chaque date.
     * On retourne true si le creneau doit etre desactiver.
     */
    ApplyFilters(creneaux_heure_begin, creneaux_heure_end, date_min_string) {
      var self = this;
      return new Promise(resolvEnd => {
        if (self.filters.length === 0) {
          resolvEnd({ status: false, verificateur: "filter empty" });
          return;
        }

        const CustomLoop = function(i = 0) {
          return new Promise(resolv => {
            const filter = self.filters[i];
            if (filter.h_debut !== "" && filter.h_fin !== "") {
              if (
                Filtres.HourIntervalContain(
                  filter.h_debut,
                  filter.h_fin,
                  creneaux_heure_begin,
                  creneaux_heure_end,
                  date_min_string
                )
              ) {
                //Filtres.test_type = self.type_creneau;
                Filtres.app_date_current_string_en =
                  self.app_date_current_string_en;
                Filtres.app_date_current_en = self.app_date_current_en;
                Filtres.loopAttribFilter(i, filter).then(result => {
                  resolv(result);
                });
              } else {
                resolv({ status: false, i: i, verificateur: "plage_heure" });
              }
            } else {
              resolv({ status: false, i: i, verificateur: "nothing" });
            }
          });
        };
        const execution = (i = 0) => {
          CustomLoop(i).then(result => {
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
    },
    //174
    ApplyFiltersV0(creneaux_heure_begin, creneaux_heure_end, date_min_string) {
      var self = this;
      return new Promise(resolvEnd => {
        if (self.filters.length === 0) {
          resolvEnd({ status: false, verificateur: "filter empty" });
          return;
        }

        const CustomLoop = function(i = 0) {
          return new Promise(resolv => {
            const filter = self.filters[i];
            if (filter.h_debut !== "" && filter.h_fin !== "") {
              if (
                Filtres.HourIntervalContain(
                  filter.h_debut,
                  filter.h_fin,
                  creneaux_heure_begin,
                  creneaux_heure_end,
                  date_min_string
                )
              ) {
                if (filter.jours_select.length) {
                  Filtres.JourSelect(
                    filter.jours_select,
                    self.app_date_current_indice
                  ).then(stateJourSelect => {
                    if (!stateJourSelect) {
                      resolv({
                        status: stateJourSelect,
                        i: i,
                        verificateur: "jours_select"
                      });
                      return;
                    } else {
                      if (filter.date_desactivee.length) {
                        Filtres.DateDesactivee(
                          i,
                          filter.date_desactivee,
                          self.app_date_current_string_en,
                          "creneau"
                        ).then(stateDateDesactivee => {
                          // Si la valeur est true, => la date doit etre desactiver.
                          if (stateDateDesactivee) {
                            resolv({
                              status: stateDateDesactivee,
                              i: i,
                              verificateur: "date_desactivee"
                            });
                            return;
                          } else {
                            if (filter.periode_desactivee.length) {
                              Filtres.PeriodeDesactivee(
                                i,
                                filter.periode_desactivee,
                                self.app_date_current_en,
                                self.app_date_current_string_en,
                                "creneau"
                              ).then(statePeriodeDesactivee => {
                                resolv({
                                  status: statePeriodeDesactivee,
                                  i: i,
                                  verificateur: "periode_desactivee"
                                });
                                return;
                              });
                            } else {
                              resolv({
                                status: stateDateDesactivee,
                                i: i,
                                verificateur: "date_desactivee"
                              });
                              return;
                            }
                          }
                        });
                      } else {
                        resolv({
                          status: true,
                          i: i,
                          verificateur: "jours_select"
                        });
                      }
                    }
                  });
                } else if (filter.date_desactivee.length) {
                  Filtres.DateDesactivee(
                    i,
                    filter.date_desactivee,
                    self.app_date_current_string_en,
                    "creneau"
                  ).then(stateDateDesactivee => {
                    // Si la valeur est true, => la date doit etre desactiver.
                    if (stateDateDesactivee) {
                      resolv({
                        status: stateDateDesactivee,
                        i: i,
                        verificateur: "date_desactivee"
                      });
                      return;
                    } else {
                      if (filter.periode_desactivee.length) {
                        Filtres.PeriodeDesactivee(
                          i,
                          filter.periode_desactivee,
                          self.app_date_current_en,
                          self.app_date_current_string_en,
                          "creneau"
                        ).then(statePeriodeDesactivee => {
                          resolv({
                            status: statePeriodeDesactivee,
                            i: i,
                            verificateur: "periode_desactivee"
                          });
                          return;
                        });
                      } else {
                        resolv({
                          status: stateDateDesactivee,
                          i: i,
                          verificateur: "date_desactivee"
                        });
                        return;
                      }
                    }
                  });
                } else if (filter.periode_desactivee.length) {
                  Filtres.PeriodeDesactivee(
                    i,
                    filter.periode_desactivee,
                    self.app_date_current_en,
                    self.app_date_current_string_en,
                    "creneau"
                  ).then(statePeriodeDesactivee => {
                    resolv({
                      status: statePeriodeDesactivee,
                      i: i,
                      verificateur: "periode_desactivee"
                    });
                    return;
                  });
                } else {
                  resolv({
                    status: false,
                    i: i,
                    verificateur: "plage_heure"
                  });
                }
              } else {
                resolv({ status: false, i: i, verificateur: "plage_heure" });
              }
            } else {
              resolv({ status: false, i: i, verificateur: "nothing" });
            }
          });
        };

        const execution = (i = 0) => {
          CustomLoop(i).then(result => {
            var ii = result.i + 1;
            if (result.status) {
              //Filtres.saveData(result, i, self.app_date_current_string_en);
              resolvEnd(result);
              return;
            } else if (self.filters[ii]) {
              execution(ii);
            } else {
              //Filtres.saveData(result, i, self.app_date_current_string_en);
              resolvEnd(result);
              return;
            }
          });
        };
        execution();
      });
    },
    /**
     * Permet de detecter si une plage doit etre desactiver
     * @param creneaux_heure_begin moment()
     * @param creneaux_heure_end moment()
     * @param date_min_string String : Valeur string du creneau de depart.
     *
     */
    async checkIsCreneauValide(
      creneaux_heure_begin,
      creneaux_heure_end,
      date_min_string
    ) {
      var self = this;
      var loopCreneau = function(heure_begin_disable, heure_end_disable) {
        var h_d = heure_begin_disable.split(":");
        var date_min = moment(date_min_string, "DD-MM-YYYY HH:mm:ss");
        date_min.hours(h_d[0]);
        date_min.minutes(h_d[1]);
        //
        var h_f = heure_end_disable.split(":");
        var date_max = moment(date_min_string, "DD-MM-YYYY HH:mm:ss");
        date_max.hours(h_f[0]);
        date_max.minutes(h_f[1]);
        if (
          (creneaux_heure_begin.diff(date_min, "minutes") >= 0 &&
            creneaux_heure_begin.diff(date_max, "minutes") < 0) ||
          (creneaux_heure_end.diff(date_min, "minutes") > 0 &&
            creneaux_heure_end.diff(date_max, "minutes") <= 0)
        ) {
          return true;
        } else {
          return false;
        }
      };

      var disable_heureday = function() {
        return new Promise(resolve => {
          //console.log("Debut disable_heureday() ");
          if (self.disable_heureday.length > 0) {
            var day_indice = creneaux_heure_begin.day();
            for (const j in self.disable_heureday) {
              if (day_indice == self.disable_heureday[j].day) {
                if (
                  loopCreneau(
                    self.disable_heureday[j].heure_begin_disable,
                    self.disable_heureday[j].heure_end_disable
                  )
                ) {
                  resolve(true);
                  return true;
                }
              }
            }
          }
          resolve(false);
        });
      };

      var disable_heuredate = function() {
        return new Promise(resolve => {
          //console.log("Debut disable_heuredate() ");
          if (self.disable_heuredate.length > 0) {
            var date_string = creneaux_heure_begin.format("DD-MM-YYYY");
            for (const k in self.disable_heuredate) {
              if (date_string == self.disable_heuredate[k].date) {
                //console.log("disable_heuredate date_string : ", date_string);
                if (
                  loopCreneau(
                    self.disable_heuredate[k].heure_begin_disable,
                    self.disable_heuredate[k].heure_end_disable
                  )
                ) {
                  resolve(true);
                  return true;
                }
              }
            }
          }
          resolve(false);
        });
      };
      /**
       * Desactive les creneaux.
       */
      var disable_heuredate_limit = function() {
        return new Promise(resolve => {
          //console.log("Debut disable_heuredate_limit() ");
          if (self.disable_heuredate_limit.length > 0) {
            var date_string = creneaux_heure_begin.format("DD-MM-YYYY");
            for (const k in self.disable_heuredate_limit) {
              if (date_string == self.disable_heuredate_limit[k].date) {
                //console.log("disable_heuredate date_string : ", date_string);
                if (
                  self.disable_heuredate_limit[k].heure_begin_disable ==
                    creneaux_heure_begin.format("HH:mm") &&
                  self.disable_heuredate_limit[k].heure_end_disable ==
                    creneaux_heure_end.format("HH:mm")
                ) {
                  /*
                  console.log(
                    " Disable_heuredate_limit creneaux : ",
                    self.disable_heuredate_limit[k].heure_begin_disable,
                    " :: ",
                    self.disable_heuredate_limit[k].heure_end_disable
                  );
                  /**/
                  resolve(true);
                  return true;
                }
              }
            }
          }
          resolve(false);
        });
      };
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
      var disable_for_deccalage = function() {
        return new Promise(resolve => {
          if (self.deccalage_creneau_depart > 0) {
            var date_min = moment(self.app_date_string, "DD-MM-YYYY HH:mm:ss");
            date_min.add(self.deccalage_creneau_depart, "minutes");
            var diff = creneaux_heure_begin.diff(date_min, "minutes");
            if (diff < 0) {
              resolve(true);
            } else {
              resolve(false);
            }
          } else {
            resolve(false);
          }
        });
      };
      return new Promise(resolve => {
        //console.log("Debut checkIsCreneauValide : ", date_min_string);
        if (
          self.datetime_min &&
          self.datetime_min.diff(creneaux_heure_begin, "minutes") > 0
        ) {
          resolve({ status: true, verificateur: "datetime-min" });
          return true;
        } else {
          // Verification en function du jour.
          var test1 = disable_heureday();
          test1.then(function(result) {
            if (result) {
              resolve({ status: true, verificateur: "disable-heureday" });
              return true;
            } else {
              var test2 = disable_heuredate();
              test2.then(function(result2) {
                if (result2) {
                  resolve({
                    status: true,
                    verificateur: "disable-heuredate"
                  });
                  return true;
                } else {
                  var test3 = disable_heuredate_limit();
                  test3.then(function(result3) {
                    if (result3) {
                      resolve({
                        status: true,
                        verificateur: "disable-heuredate-limit"
                      });
                      return true;
                    } else {
                      //verification en function du decallage
                      disable_for_deccalage().then(result0 => {
                        if (result0) {
                          resolve({
                            status: true,
                            verificateur: "disable_for_deccalage"
                          });
                          return true;
                        } else {
                          resolve({ status: false, verificateur: "none" });
                          return false;
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    },
    /**
     * Selectionne le premier creneau valide ( apres la construction des crenneaux );
     */
    async selectFirtValideCreneau() {
      //console.log("selectFirtValideCreneau debut : ");
      if (this.list_creneaux.length > 0) {
        for (const i in this.list_creneaux) {
          var creneau = this.list_creneaux[i];
          if (!creneau.$isDisabled) {
            this.current_creneau = {
              begin: creneau.begin,
              end: creneau.end
            };
            break;
          }
        }
      }
      //console.log("selectFirtValideCreneau end");
    },
    /**
     * le calendrier demarre toujours un lunid.
     * Lundi(index) = 1
     * Saturday = 6
     * Sunday = 0;
     */
    async builderCalandar() {
      this.list_calander_days = [];
      this.test_calandar_day = 0;
      var date_string = moment(this.current_date).format("DD-MM-YYYY HH:mm:ss");
      //console.log("Calandar date_string", date_string);
      var calander_day_min = moment(date_string, "DD-MM-YYYY HH:mm:ss");
      var calender_day_max = moment(date_string, "DD-MM-YYYY HH:mm:ss");
      var nJr = this.nombre_semaine * 7;
      // on determine la date min à partir de la date app_date
      var day_current_index = calander_day_min.day();
      if (!day_current_index) {
        day_current_index = 7;
      }
      var day_remove = 6 + day_current_index - 7;
      //console.log("day_remove : ", day_remove);
      if (day_remove > 0) {
        nJr -= day_remove;
        calander_day_min.add(-day_remove, "days");
      }
      calender_day_max.add(nJr, "days");

      this.getPlageDate(calander_day_min, calender_day_max);
      //console.log("list_calander_days : ", this.list_calander_days);
    },
    getPlageDate(calander_day_min, calender_day_max) {
      var self = this;
      return new Promise(function(resolve, reject) {
        self.test_calandar_day++;
        if (self.test_calandar_day > 99) {
          reject(false);
          return false;
        }

        if (calander_day_min.diff(calender_day_max, "days")) {
          self.ValidationDay(calander_day_min).then(stateValidationDay => {
            self.list_calander_days.push({
              date_string: calander_day_min.format("DD-MM-YYYY"),
              day_french: calander_day_min.locale("fr").format("Do <br /> MMM"),
              date_month: calander_day_min.locale("fr").format("DD"),
              custom_class: stateValidationDay.custom_class,
              select:
                calander_day_min.format("DD-MM-YYYY") ==
                self.app_date_current_string
                  ? true
                  : false,
              status: stateValidationDay.status
            });
            calander_day_min.add(1, "days");
            resolve(self.getPlageDate(calander_day_min, calender_day_max));
          });
        } else {
          resolve(true);
        }
      });
    },

    /**
     * Return true si la date doit etre desactivée, et false sinon.
     */
    ValidationDay(date) {
      var self = this;
      return new Promise(resolvEnd => {
        var index_day = date.day();
        var app_date_current_string_en = date.format("YYYY-MM-DD");
        // Desactivation du jour avant la date min.
        if (date.diff(self.app_date_current, "minutes") < 0) {
          resolvEnd({ status: true, custom_class: "default-disable" });
        }
        // Desactivation du jour en function des jours selectionnées.
        else if (
          self.jour_desactivee.length &&
          self.jour_desactivee.includes(index_day)
        ) {
          resolvEnd({ status: true, custom_class: "jour_desactivee" });
          return;
        } else if (self.filters.length === 0) {
          resolvEnd({ status: false, custom_class: "filter empty" });
          return;
        } else {
          // Desactivation du jour en function des filtres.
          const CustomLoop = function(i = 0) {
            return new Promise(resolv => {
              const filter = self.filters[i];
              if (filter.h_debut.length === 0 && filter.h_fin.length === 0) {
                Filtres.JourSelect(filter.jours_select, index_day).then(
                  stateJourSelect => {
                    // On verifie si on doit tester l'etape des dates.
                    // 1- Date desactivée.
                    // Si filter.date_desactivee n'est pas vide, alors on teste ce denier.
                    if (filter.date_desactivee.length && stateJourSelect) {
                      Filtres.DateDesactivee(
                        filter.date_desactivee,
                        app_date_current_string_en
                      ).then(stateDateDesactivee => {
                        if (
                          !stateDateDesactivee &&
                          filter.periode_desactivee.length
                        ) {
                          Filtres.PeriodeDesactivee(
                            filter.periode_desactivee,
                            date,
                            app_date_current_string_en
                          ).then(statePeriodeDesactivee => {
                            resolv({
                              status: statePeriodeDesactivee,
                              i: i,
                              custom_class: "filter.periode_desactivee"
                            });
                          });
                        } else {
                          resolv({
                            status: stateDateDesactivee,
                            i: i,
                            custom_class: "filter.date_desactivee"
                          });
                          return;
                        }
                      });
                    }
                    // 2- periode desactivée.
                    // Si Filter.date_desactivee n'est pas vide, alors on teste ce denier.
                    else if (
                      filter.periode_desactivee.length &&
                      stateJourSelect
                    ) {
                      Filtres.PeriodeDesactivee(
                        filter.periode_desactivee,
                        date,
                        app_date_current_string_en
                      ).then(statePeriodeDesactivee => {
                        resolv({
                          status: statePeriodeDesactivee,
                          i: i,
                          custom_class: "filter.periode_desactivee"
                        });
                      });
                    } else {
                      resolv({
                        status: stateJourSelect,
                        i: i,
                        custom_class: "filter.jours_select"
                      });
                      return;
                    }
                  }
                );
              } else {
                resolv({ status: false, custom_class: "nothing" });
              }
            });
          };
          const execution = (i = 0) => {
            CustomLoop(i).then(result => {
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
        }
      });
    },
    /**
     * function appelle uniquement à l'initialisation des creneaux.
     * Permet d'obtenir la date utilisable par l'application,
     * qui peut etre diffrente de la date du jour( different de * *   current_date);
     */
    async init_creneau() {
      this.app_date = "";
      //Lors de l'initialisation on desactive les creneaux inferieurs à l'heure utilisable par le client.
      this.datetime_min = moment(this.current_date);
      var date_utile = await this.date_utilisable(moment(this.current_date));
      if (date_utile) {
        this.app_date = date_utile;
        this.builderCalandar();
      } else {
        alert("erreur d'initialisation");
      }
    },
    /**
     * @parameter date doit etre un object moment.
     */
    async date_utilisable(date) {
      var self = this;
      this.test_delai_jour = 0;
      this.test_jour_semaine = 0;
      this.test_date_desactivee = 0;
      /*
      console.log(
        "date_utilisable",
        this.current_date.format("DD-MM-YYYY HH:mm:ss")
      );
      /**/
      var date_utile = await this.getDayUtilisable(date);
      if (date_utile) {
        self.app_date_current = date_utile;

        self.dateBorne();
        return date_utile;
      }
      return false;
    },
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
    async getDayUtilisable(date, provider = null) {
      var self = this;
      return new Promise(function(resolve, reject) {
        //console.log("getDayUtilisable debut", "provider : ", provider);
        if (self.test_jour_semaine > 6) {
          self.display_error("Boucle infinie detecter ..." + provider);
          reject(false);
          return false;
        }
        if (self.test_date_desactivee > 99) {
          self.display_error("Boucle infinie detecter ...");
          reject(false);
          return false;
        }
        var index_day_week = date.day();
        var date_string = moment(date).format("DD-MM-YYYY");
        /*var date_string =
          date.date() + "-" + (date.month() + 1) + "-" + date.year();/**/
        // la date ne doit pas etre un jour de la semaine desactive.
        //console.log("date_string : ", date_string);
        if (
          self.jour_desactivee.length &&
          self.jour_desactivee.includes(index_day_week)
        ) {
          self.test_jour_semaine++;
          // si ce jour est automatiquement desactivée,
          // on passe au suivant.
          date.add(1, "days");
          resolve(self.getDayUtilisable(date, "jour desactivée"));
        }
        // la date ne doit pas etre un jour explicitement desactivé.
        else if (
          self.date_desactivee.length &&
          self.date_desactivee.includes(date_string)
        ) {
          self.test_date_desactivee++;
          date.add(1, "days");
          resolve(self.getDayUtilisable(date, "date desactivée"));
        }
        // on applique egalement le decallage.
        else if (
          self.app_delai_jour &&
          self.app_delai_jour > self.test_delai_jour
        ) {
          //console.log("delai : ", self.app_delai_jour);
          //console.log("interval : ", self.app_interval);
          self.test_delai_jour++;
          date.add(1, "days");
          resolve(self.getDayUtilisable(date, "delai jour"));
        } else {
          //console.log("getDayUtilisable end", "provider : ", provider);
          resolve(date);
        }
      });
    },
    /**
     * Pour valider la date du jour
     * @depreciate à supprimer avec toutes variables incluses.
     */
    validation_day__(date) {
      var self = this;
      var status = true;
      var index_day_week = date.day();
      var date_string = moment(date).format("DD-MM-YYYY");
      if (
        self.jour_desactivee.length &&
        self.jour_desactivee.includes(index_day_week)
      ) {
        status = false;
        return status;
      } else if (
        self.date_desactivee.length &&
        self.date_desactivee.includes(date_string)
      ) {
        status = false;
        return status;
      } else {
        return status;
      }
    },
    plage_creneau({ begin, end }) {
      return `${begin} - ${end}`;
    },
    display_error(msg) {
      alert(msg);
      console.log(msg);
    },
    /**
     * Surcharge la valeur du delai de traitement de livraison en fonction du jour selectionner sur la collecte.
     */
    async OverrideDelaiTraitement(date_collecte) {
      //console.log("OverrideDelaiTraitement debut ", this.type_creneau);
      if (this.configs.delais_jour && this.configs.delais_jour.length > 0) {
        var indice_jr = date_collecte.day();
        //console.log(indice_jr);
        for (const i in this.configs.delais_jour) {
          if (this.configs.delais_jour[i].day == indice_jr) {
            this.app_delai_jour = this.configs.delais_jour[i].delai;
            this.configs.delai_override = this.configs.delais_jour[i].delai;
            //console.log("delai de 4 jours");
            break;
          }
          var j = parseInt(i) + 2;

          if (this.configs.delais_jour.length < j) {
            this.app_delai_jour = this.configs.delai;
            this.configs.delai_override = this.configs.delai;
            //console.log("delai de 3 jours");
          }
        }
      }
    },
    async select_date(date, i) {
      console.log(date);
      if (!date.status) {
        this.app_date_current = moment(date.date_string, "DD-MM-YYYY");
        // on applique le reste du temps.( fourni par l'initialisation du syteme ).
        this.app_date_current.hour(this.current_date.hour());
        this.app_date_current.minute(this.current_date.minute());
        this.app_date_current.second(this.current_date.second());

        //on cache le block calandar
        this.display_hide_calandar();
        //on essaie de recharger l'affichage
        this.select_date_in_calander(i);
        //on construit les creneaux.
        this.dateBorne();
        //ceci permet de supprimer les creneaux s'ils ont ete presedamant selectionné.
        // ainsi on force l'utilisateur à reselectionner les creneaux.
        if (this.current_creneau != "") {
          // ce ci entraine egalment la MAJ  de livraions ( si nous sommes sur la collecte)
          this.current_creneau = "";
        } else {
          this.renvoit_donnees();
        }
        /**/
      }
    },
    async select_date_in_calander(k) {
      for (const i in this.list_calander_days) {
        if (k == i) {
          this.list_calander_days[i].select = true;
        } else {
          this.list_calander_days[i].select = false;
        }
      }
    },
    select_current_creneau(creneau) {
      console.log("select_current_creneau ", creneau);
      /*
      this.$emit("ev_select_current_creneau", {
        creneau: creneau,
        date: this.app_date_current,
        date_string: this.app_date_current.format("DD-MM-YYYY HH:mm:ss")
      });
      /**/
    },
    renvoit_donnees() {
      this.$emit("ev_select_current_creneau", {
        creneau: this.current_creneau,
        date: this.app_date_current,
        date_string: this.app_date_current.format("DD-MM-YYYY HH:mm:ss")
      });
    },
    loadCreneauDisable: function() {
      var self = this;
      return new Promise(resolve => {
        var url = self.url_get_creneau;
        url +=
          "?app_date_current=" +
          encodeURIComponent(self.app_date_current.format("YYYY-MM-DD"));
        url += "&limit_creneau=" + self.nombre_res_creneau;
        url += "&type=" + self.type_creneau;
        $.getJSON(url, function(datas, textStatus) {
          console.log(
            "LoadCreneauDisable datas :  ",
            self.type_creneau,
            " : ",
            datas
          );
          if (textStatus) {
            self.disable_heuredate_limit = datas;
            resolve(true);
          } else {
            self.disable_heuredate_limit = [];
            resolve(false);
          }
        }).fail(function() {
          console.log(
            "Impossible de recuperer les données sur le site : ",
            self.url_get_creneau
          );
          resolve(false);
        });
      });
    }
  }
};
</script>
<style lang="scss">
.creneaux-mbt {
  .over-container-date {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .multiselect__option {
    padding-top: 1.5em;
    white-space: normal;
    line-height: 1.2em;

    &--disabled {
      opacity: 0.5;
      color: #676767 !important;
    }
    &--selected {
      border-bottom: 2px solid #00a3dd;
    }
  }
  .multiselect {
    width: auto;
    min-width: calc(100% - 29px);
    color: #000;
    min-height: 25px;
    &--active {
      .multiselect__tags {
        position: relative;
        &::before {
          position: absolute;
          font-size: inherit;
          color: inherit;
          content: " --:-- - --:-- ";
          top: 0;
          left: auto;
          right: auto;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
      }
    }
    &__tags {
      font-size: 20px;
      padding-right: 0;
      padding-top: 0;
      display: flex;
      line-height: 100%;
      justify-content: flex-start;
      align-items: flex-end;
      color: #213346;
      min-height: 25px;
      border: none;
      margin-left: -9px;

      @media (min-width: 1000px) {
        font-size: 30px;
      }
      white-space: nowrap;
      padding-right: 8px;
    }
    &__select {
      display: none;
    }
    &__placeholder {
      margin-bottom: 0;
      line-height: 100%;
      letter-spacing: -1px;
      opacity: 0.7;
      font-size: inherit;
      color: inherit;
    }
    &__single {
      font-size: inherit;
      color: inherit;
      padding-top: 10px;
      margin-bottom: 10px;
    }
  }
  .rectangle .line-creneau {
    .icone-svg {
      width: 30px;
    }
    @media (max-width: 768px) {
      margin-left: 0;
      margin-right: auto !important;
      display: flex !important;
      justify-content: left;

      .multiselect {
        min-width: 120px;
      }
    }
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .rectangle {
    .title-creneau {
      @media (max-width: 768px) {
        //margin: 0;
      }
    }
  }
}
</style>
<!--
/siteweb/PluginsModules/stephane888/wbu-components/src/components/Crenneaux/v2/Creneau.vue
-->
