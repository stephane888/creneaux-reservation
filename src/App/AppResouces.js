import Filtres from "./Filtres.js";
if (window.moment) {
  var moment = window.moment;
}

class DateUtilisable {
  constructor(jour_desactivee, app_delai_jour, filters) {
    this.jour_desactivee = jour_desactivee;
    this.app_delai_jour = app_delai_jour;
    this.filters = filters;
    //
    this.test_delai_jour = 0;
    this.test_jour_semaine = 0;
    this.test_date_desactivee = 0;
  }

  /**
   * @parameter date doit etre un object moment.
   */
  async date_utilisable(date, apply_delai_true = true) {
    return await this.getDayUtilisable(date, null, apply_delai_true);
  }

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
  getDayUtilisable(date, provider = null, apply_delai_true = true) {
    var self = this;
    return new Promise(function(resolve, reject) {
      /*
      console.log(
        "valeur de apply_delai_true " + self.type_creneau + ": ",
        apply_delai_true
      );
      /**/
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
      if (
        self.jour_desactivee.length &&
        self.jour_desactivee.includes(index_day_week)
      ) {
        self.test_jour_semaine++;
        // si ce jour est automatiquement desactivée,
        // on passe au suivant.
        date.add(1, "days");
        resolve(
          self.getDayUtilisable(date, "jour desactivée", apply_delai_true)
        );
      } else {
        self.DisableDateByfilter(date).then(Filter => {
          if (Filter.status) {
            self.test_date_desactivee++;
            date.add(1, "days");
            resolve(
              self.getDayUtilisable(date, "date desactivée", apply_delai_true)
            );
          }
          // on applique egalement le decallage.
          else if (
            apply_delai_true &&
            self.app_delai_jour &&
            self.app_delai_jour > self.test_delai_jour
          ) {
            self.test_delai_jour++;
            /**
             * On applique le delai en jour apres jour afin de s'assurer que les jours
             * desactivées ne sont pas pris en compte.
             */
            date.add(1, "days");
            resolve(
              self.getDayUtilisable(date, "delai jour", apply_delai_true)
            );
          } else {
            resolve(date);
          }
        });
      }
    });
  }

  DisableDateByfilter(date) {
    var self = this;
    return new Promise(resolvEnd => {
      var index_day = date.day();
      var app_date_current_string_en = date.format("YYYY-MM-DD");
      var app_date_current_en = moment(
        app_date_current_string_en,
        "YYYY-MM-DD"
      );
      // Desactivation du jour en function des filtres.
      const CustomLoop = function(i = 0) {
        return new Promise(resolv => {
          const filter = self.filters[i];
          if (filter.h_debut.length === 0 && filter.h_fin.length === 0) {
            Filtres.loopAttribFilter(
              i,
              filter,
              app_date_current_en,
              app_date_current_string_en,
              index_day,
              "date"
            ).then(result => {
              resolv(result);
            });
          } else {
            resolv({ status: false, i: i, custom_class: "nothing" });
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

class BuildCreneaux {
  constructor(
    app_date_utilisable_string,
    h_debut,
    m_debut,
    h_fin,
    m_fin,
    plage_heures_valide,
    app_interval,
    app_delai_next_creneau
  ) {
    this.app_date_current_string = app_date_utilisable_string;
    this.h_debut = h_debut;
    this.m_debut = m_debut;
    this.h_fin = h_fin;
    this.m_fin = m_fin;
    this.plage_heures_valide = plage_heures_valide;
    this.app_interval = app_interval;
    this.app_delai_next_creneau = app_delai_next_creneau;

    //
    this.date_max = null;
    this.data_min = null;
    this.list_creneaux = [];
    this.test_creneau = 0;
    this.current_creneau = "";
    /**
     * permet de limiter le nombre de passage auto vers la prochaine date.
     * à l'initialisation on definit une valeur et on decremente.
     */
    this.test_auto_select_next_day = 99;
  }
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

    this.data_min = moment(this.app_date_current_string, "DD-MM-YYYY");
    this.date_max = moment(this.app_date_current_string, "DD-MM-YYYY");
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

      console.log(
        "\n h_debut : ",
        this.h_debut,
        "\n h_fin : ",
        this.h_fin,
        "\n min date : ",
        this.data_min.format("DD-MM-YYYY HH:mm:ss"),
        "\n max date : ",
        this.date_max.format("DD-MM-YYYY HH:mm:ss")
      );
      console.log("dateBorne end");
      /**/
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
    await this.getIntervalUtilisable(this.data_min);
  }

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
  }
}

export { DateUtilisable, BuildCreneaux };
