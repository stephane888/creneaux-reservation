import filtre from "./filtre";
//import store from "../../../../store/index";
class filterHours {
  constructor(date, type, creneauFilters, CreneauxExterne = []) {
    this.type = type;
    this.date = date;
    this.filterHours = [];
    this.creneauFilters = creneauFilters;
    this.CreneauxExterne = CreneauxExterne;
  }

  getPlageDate(Filter) {
    this.dateBegin = this.date;
    if (Filter.h_debut != "" && Filter.h_fin != "") {
      const d = Filter.h_debut.split(":");
      const f = Filter.h_fin.split(":");
      if (d[1] && f[1])
        this.filterHours.push({
          Filter,
          dateBegin: moment(this.date).set({
            hour: d[0],
            minute: d[1],
            second: 0
          }),
          dateEnd: moment(this.date).set({
            hour: f[0],
            minute: f[1],
            second: 0
          })
        });
    }
  }
  /**
   * On reconstruit le filtre afin d'ameliorer les perfomances.
   */
  async rebuildFilter() {
    for (const i in this.creneauFilters) {
      const Filter = this.creneauFilters[i];
      if (Filter.type_disabled === "hours") {
        if (Filter.h_debut != "" && Filter.h_fin != "") {
          const filterDate = new filtre(
            this.date,
            this.type,
            [],
            [],
            [Filter],
            "hours"
          );
          const dayValid = await filterDate.ValidationDay(this.date);
          const d = Filter.h_debut.split(":");
          const f = Filter.h_fin.split(":");
          if (d[1] && f[1])
            this.filterHours.push({
              ...Filter,
              dayValid: dayValid.status,
              dateBegin: moment(this.date).set({
                hour: d[0],
                minute: d[1],
                second: 0
              }),
              dateEnd: moment(this.date).set({
                hour: f[0],
                minute: f[1],
                second: 0
              })
            });
        }
      }
    }
  }
  /**
   * permet d'analyser un creneau et de determiner s'il est actif ou pas.
   * @param {*} c_min
   * @param {*} c_max
   * @returns false to not disable creneau and true to disabled this creneau.
   */
  async checkIsDisabled(c_min, c_max) {
    return new Promise(resolv => {
      // desactive les creneaux dont le nombre de reservation est superieur à nombre_max.
      const key = c_min.format("HH:mm") + " - " + c_max.format("HH:mm");
      if (this.CreneauxExterne.includes(key)) {
        resolv(true);
      }
      // si le tableau de filtre est vide, on ne desactive pas.
      if (this.filterHours.length === 0) {
        resolv(false);
      }

      const loop = filter => {
        const c_min_1 = c_min.diff(filter.dateBegin, "minute");
        const c_min_2 = c_min.diff(filter.dateEnd, "minute");
        const c_max_1 = c_max.diff(filter.dateBegin, "minute");
        const c_max_2 = c_max.diff(filter.dateEnd, "minute");
        if (
          (c_min_1 >= 0 && c_min_2 < 0) ||
          (c_max_1 > 0 && c_max_2 <= 0) ||
          (c_min_2 < 0 && c_max_2 > 0)
        ) {
          return true;
        } else {
          return false;
        }
      };
      for (const i in this.filterHours) {
        const filter = this.filterHours[i];
        // Verifie les jours de la semaine.
        if (filter.jours_select.length) {
          if (filter.jours_select.includes(this.date.day())) {
            if (loop(filter) && !filter.dayValid) {
              resolv(true);
              break;
            }
          }
        }
        //
        else {
          if (loop(filter) && !filter.dayValid) {
            resolv(true);
            break;
          }
        }
        var ii = parseInt(i) + 1;
        if (this.filterHours.length === ii) {
          resolv(false);
        }
      }
    });
  }
}

export default filterHours;
