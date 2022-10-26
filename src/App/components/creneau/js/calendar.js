import Filtre from "./filtre";
import moment from "moment";
/**
 * On fournit une date et le script retourne la liste des jours du mois encours.
 * Doc : https://github.com/niinpatel/calendarHTML-Javascript/blob/master/scripts.js
 */
class calendar {
  constructor(
    date,
    appDate,
    type,
    creneauConfigs,
    currentCreneauType,
    creneauFilters
  ) {
    this.currentDate = moment(date);
    // indice du mois. [ Entre 0 et 11 ];
    this.currentMonth = this.currentDate.month();
    // indice du mois. [ Number ]
    this.currentYear = this.currentDate.year();
    //
    this.dates = [];
    /**
     * Date de l'application sans les les heures.
     * elle egalment le role de date de reference. (tous les dates en dessous sont desactivées);
     */
    this.dateMonth = moment(appDate).set({ hour: 0, minute: 0, second: 0 });
    this.creneauConfigs = creneauConfigs;
    this.currentCreneauType = currentCreneauType;
    this.creneauFilters = creneauFilters;
    /**
     * C'est deux cas possible: collecte ou livraison.
     */
    this.type = type;
    /**
     *
     */
    this.CountDecallageAppliquer = 0;
    this.currentCreneauType.delai = parseInt(this.currentCreneauType.delai);
  }

  /**
   * -
   */
  buildDaysOfMonth() {
    // On s'assure que le mois a au moins un jour valide, sinon on passe au mois suivant.
    // ()=>{}
    const nombreSemaine = 6;
    const premierJourMois = moment().set({
      year: this.currentYear,
      month: this.currentMonth,
      date: 1,
      hour: 0,
      minute: 0,
      second: 0,
    });

    let indiceDuPremierJourDumois = premierJourMois.day();
    if (!indiceDuPremierJourDumois) indiceDuPremierJourDumois = 7;
    // Permet de mettre "premierJourMois" sur le premier jour dans le calendrier.
    premierJourMois.add(-indiceDuPremierJourDumois, "day");
    indiceDuPremierJourDumois--;

    // Nombre de jour dans le mois.
    const daysInMonth =
      32 -
      moment()
        .set({
          year: this.currentYear,
          month: this.currentMonth,
          date: 32,
          hour: 0,
          minute: 0,
          second: 0,
        })
        .date();
    const DernierJourMois = moment().set({
      year: this.currentYear,
      month: this.currentMonth,
      date: daysInMonth,
      hour: 0,
      minute: 0,
      second: 0,
    });
    let date = 1;
    for (let i = 0; i < nombreSemaine; i++) {
      if (date > daysInMonth) break;
      for (let j = 0; j < 7; j++) {
        const filter = new Filtre(
          this.dateMonth,
          this.type,
          this.creneauConfigs,
          this.currentCreneauType,
          this.creneauFilters
        );
        // Si nous sommes sur la premiere semaine, et que l'indice du premier jour de mois est inferieur à la valeur encours,
        // On ajoute ces dates comme etant desactivées.
        if (i === 0 && j < indiceDuPremierJourDumois) {
          const pre_jour = premierJourMois.add(1, "day");
          filter.ValidationDay(pre_jour).then((stateValidationDay) => {
            this.dates.push(this.DisabledBydelai(stateValidationDay));
          });
        } else if (date > daysInMonth) {
          // On commence avec les jours du prochain mois.
          const last_jour = DernierJourMois.add(1, "day");
          filter.ValidationDay(last_jour).then((stateValidationDay) => {
            this.dates.push(this.DisabledBydelai(stateValidationDay));
          });
        } else {
          const next_jour = premierJourMois.add(1, "day");
          filter.ValidationDay(next_jour).then((stateValidationDay) => {
            this.dates.push(this.DisabledBydelai(stateValidationDay));
          });
          date++;
        }
      }
    }
  }

  /**
   * On applique le delais, sur le bloc livraison, suivant plusieurs cas de figure.
   * Le delai est definit par la date de collecte,
   * Le delai par defaut est dans this.currentCreneauType.delai et peut etre surcharger par celui definit par par this.currentCreneauType.delais_jour
   * @param {*} stateValidationDay
   * @returns
   */
  DisabledBydelai(stateValidationDay) {
    if (this.type === "livraison") {
      if (
        this.CountDecallageAppliquer < this.currentCreneauType.delai &&
        stateValidationDay.status
      ) {
        this.CountDecallageAppliquer++;
        stateValidationDay.status = false;
        stateValidationDay.custom_class = "default-disable-delai";
      }
    }
    return stateValidationDay;
  }
}
export default calendar;
