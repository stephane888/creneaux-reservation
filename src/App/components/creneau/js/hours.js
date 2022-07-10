import filterHours from "./filterHours";
class Hours {
  constructor(date, creneauFilters, creneauConfigs, currentCreneauType, type) {
    this.date = date;
    this.creneauFilters = creneauFilters;
    this.creneauConfigs = creneauConfigs;
    this.currentCreneauType = currentCreneauType;
    this.list_creneaux = [];
    this.type = type;
  }

  /**
   * Recuperer la plage de date du jour.
   */
  getCurrentBandHour() {
    const creneauConfigs = this.creneauConfigs;
    return new Promise(resolv => {
      if (creneauConfigs.days) {
        for (const i in creneauConfigs.days) {
          const d = creneauConfigs.days[i];
          if (d.indice === this.date.day()) {
            resolv(d);
          }
        }
      }
    });
  }
  /**
   * -
   */
  async buildHour(CreneauxExterne = []) {
    const Filter = new filterHours(
      this.date,
      this.type,
      this.creneauFilters,
      CreneauxExterne
    );
    await Filter.rebuildFilter();
    const d = await this.getCurrentBandHour();
    const h_min = d.debut.split(":");
    const h_max = d.fin.split(":");
    const dateMin = moment(this.date).set({
      hour: h_min[0],
      minute: h_min[1],
      second: 0
    });
    const dateMax = moment(this.date).set({
      hour: h_max[0],
      minute: h_max[1],
      second: 0
    });
    return new Promise(resolv => {
      const addCreneau = () => {
        const endCreneau = moment(dateMin).add(
          this.currentCreneauType.creneau,
          "minute"
        );
        if (endCreneau.diff(dateMax) <= 0) {
          //const status = false;
          Filter.checkIsDisabled(dateMin, endCreneau).then(status => {
            var bloc_date = {
              begin: dateMin.format("HH:mm"),
              end: endCreneau.format("HH:mm"),
              $isDisabled: status,
              checkstatus: ""
            };
            if (dateMin.diff(this.date) > 0 && !status)
              this.list_creneaux.push(bloc_date);
            dateMin.add(this.currentCreneauType.delai_next_creneau, "minute");
            addCreneau();
          });
        } else {
          resolv(true);
        }
      };
      addCreneau();
    });
  }
}

export default Hours;
