import Filtre from "./filtre";
/**
 * On fournit une date et le script retourne la liste des jours du mois encours.
 * Doc : https://github.com/niinpatel/calendarHTML-Javascript/blob/master/scripts.js
 */
class calendar {
  constructor(date, appDate, type, creneauConfigs) {
    this.currentDate = moment(date);
    // indice du mois. [ Entre 0 et 11 ];
    this.currentMonth = this.currentDate.month();
    // indice du mois. [ Number ]
    this.currentYear = this.currentDate.year();
    //
    this.dates = [];
    /**
     * Date de l'application sans les les heures.
     */
    this.dateMonth = moment(appDate).set({ hour: 0, minute: 0, second: 0 });
    this.creneauConfigs = creneauConfigs;
    /**
     * cest deux cas possible: collecte ou livraison.
     */
    this.type = type;
  }
  /**
   * -
   */
  buildDaysOfMonth() {
    let nombreSemaine = 6;
    let premierJourMois = moment().set({
      year: this.currentYear,
      month: this.currentMonth,
      date: 1,
      hour: 0,
      minute: 0,
      second: 0
    });

    let indiceDuPremierJourDumois = premierJourMois.day();
    if (!indiceDuPremierJourDumois) indiceDuPremierJourDumois = 7;
    //Permet de mettre "premierJourMois" sur le premier jour dans le calendrier.
    premierJourMois.add(-indiceDuPremierJourDumois, "day");
    indiceDuPremierJourDumois--;

    // Nombre de jour dans le mois.
    let daysInMonth =
      32 -
      moment()
        .set({
          year: this.currentYear,
          month: this.currentMonth,
          date: 32,
          hour: 0,
          minute: 0,
          second: 0
        })
        .date();
    let DernierJourMois = moment().set({
      year: this.currentYear,
      month: this.currentMonth,
      date: daysInMonth,
      hour: 0,
      minute: 0,
      second: 0
    });
    let date = 1;
    for (let i = 0; i < nombreSemaine; i++) {
      if (date > daysInMonth) break;
      for (let j = 0; j < 7; j++) {
        const filter = new Filtre(this.dateMonth, this.creneauConfigs);
        // Si nous sommes sur la premiere semaine, et que l'indice du premier jour de mois est inferieur à la valeur encours,
        // On ajoute ces dates comme etant desactivées.
        if (i === 0 && j < indiceDuPremierJourDumois) {
          let pre_jour = premierJourMois.add(1, "day");
          filter.ValidationDay(pre_jour).then(stateValidationDay => {
            this.dates.push(stateValidationDay);
          });
        } else if (date > daysInMonth) {
          // On commence avec les jours du prochain mois.
          let last_jour = DernierJourMois.add(1, "day");
          filter.ValidationDay(last_jour).then(stateValidationDay => {
            this.dates.push(stateValidationDay);
          });
        } else {
          let next_jour = premierJourMois.add(1, "day");
          filter.ValidationDay(next_jour).then(stateValidationDay => {
            this.dates.push(stateValidationDay);
          });
          date++;
        }
      }
    }
  }
}
export default calendar;
