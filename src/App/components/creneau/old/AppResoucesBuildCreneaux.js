import Filtres from "./Filtres.js";
//import FFilter from "./FonctionFiltre";
if (window.moment) {
  var moment = window.moment;
}

export default class BuildCreneaux {
  constructor(
    app_date_utilisable_string,
    app_date_utilisable_string_hour,
    h_debut,
    m_debut,
    h_fin,
    m_fin,
    plage_heures_valide,
    app_interval,
    app_delai_next_creneau,
    filters,
    deccalage_creneau_depart
  ) {
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
    this.deccalage_creneau_depart = deccalage_creneau_depart;
    //
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
    this.app_date_utilisable = moment(app_date_utilisable_string, "DD-MM-YYYY");
    this.app_date_utilisable_hour = moment(
      app_date_utilisable_string_hour,
      "DD-MM-YYYY HH:mm:ss"
    );
    this.checkIsApplay = false;
  }
  /**
   * Action : construit les creneaux à partir de la date definit ou choist par l'utilisateur.
   * Creer les dates min et max du jour utilisable par l'application.
   * La paramettre date doit etre un object moment.
   */
  async dateBorne() {
    // On ne pas utiliser directement la valeur de date pour crrer la valeur de min et max date, car vuejs concerve
    // la meme valeur entre les variables la MAJ d'une mettra automatiquement la suivante.

    this.data_min = moment(this.app_date_utilisable_string, "DD-MM-YYYY");
    this.date_max = moment(this.app_date_utilisable_string, "DD-MM-YYYY");
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
    }
  }

  /**
   * Contruit les plages d'heures.
   * on vide le creneau
   * Parametres : h_debut( heure de debut), h_fin (heure de fin, ), interval.
   * @public
   */
  async buildHour() {
    // On utilise la valeur string, pour eviter que les valeurs min et max changent.
    if (this.data_min) {
      //on applique le decallage

      await this.getIntervalUtilisable(this.data_min);
    }
  }

  /**
   * date_min_strin est un string.
   * @private
   */
  getIntervalUtilisable(date_min_string) {
    var self = this;
    return new Promise(function(resolve, reject) {
      self.test_creneau++;

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
          bloc_date.$isDisabled = false;
          bloc_date.checkstatus = "none";
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
  }
  /**
   * Permet de detecter si une plage doit etre desactiver
   * @param creneaux_heure_begin moment()
   * @param creneaux_heure_end moment()
   * @param date_min_string String : Valeur string du creneau de depart.
   *
   */
  checkIsCreneauValide(
    creneaux_heure_begin,
    creneaux_heure_end,
    date_min_string
  ) {
    var self = this;
    return new Promise(resolve => {
      // on desactive les creneaux qui ont une heure depassé. example s'il est 10h00,
      // les creneaux en dessous doivent etre desactivées.
      const fidfl = creneaux_heure_begin.diff(
        this.app_date_utilisable_hour,
        "minutes"
      );
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
        var disable_for_deccalage = function() {
          return new Promise(resolv => {
            if (self.deccalage_creneau_depart > 0) {
              var date_min = moment(
                self.app_date_utilisable_string_hour,
                "DD-MM-YYYY HH:mm:ss"
              );
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
        };
        //
        disable_for_deccalage().then(deccalage => {
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
              Filtres.loopAttribFilter(
                i,
                filter,
                self.app_date_utilisable,
                self.app_date_utilisable.format("YYYY-MM-DD"),
                self.app_date_utilisable.day(),
                "creneau"
              ).then(result => {
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
  }
}
