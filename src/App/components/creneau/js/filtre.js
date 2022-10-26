import store from "../../../../store/index";
import moment from "moment";
class filtre {
  constructor(
    dateMonth,
    type,
    creneauConfigs,
    currentCreneauType,
    creneauFilters,
    type_disabled = "days"
  ) {
    /**
     * Date de l'application sans les les heures.
     */
    this.dateMonth = dateMonth;
    this.IndexDayDisabled = [];
    this.DaysDisabledDate = [];
    this.DaysDisabledPeriode = [];
    this.location = store.state.location;
    if (creneauConfigs.days) {
      this.setDaysDisabled(creneauConfigs.days);
    }
    this.type = type;
    this.currentCreneauType = currentCreneauType;
    if (creneauFilters.length) {
      for (const i in creneauFilters) {
        const filter = creneauFilters[i];
        if (filter.type_disabled === type_disabled) {
          this.setDaysDisabledDate(filter.date_desactivee, filter.pobox);
          this.setDaysDisabledPeriode(filter.periode_desactivee, filter.pobox);
        }
      }
    }
  }

  /**
   * Jours desactivés en function de l'indice du jour.
   */
  setDaysDisabled(days) {
    days.forEach((e) => {
      if (!e.value) this.IndexDayDisabled.push(e.indice);
    });
  }

  /**
   * Jours desactivés en function des dates.
   */
  setDaysDisabledDate(date_desactivee, pobox) {
    // this.location.current_address
    let inBox = false;
    if (this.location.current_address) {
      pobox.forEach((b) => {
        if (this.location.current_address.includes(b.value)) {
          inBox = true;
        }
      });
    }
    if (pobox.length === 0 || inBox) {
      date_desactivee.forEach((e) => {
        this.DaysDisabledDate.push(e.date);
      });
    }
  }

  /**
   * Jours desactivés en function des periodes.
   */
  setDaysDisabledPeriode(periode_desactivee, pobox) {
    let inBox = false;
    if (this.location.current_address) {
      pobox.forEach((b) => {
        if (this.location.current_address.includes(b.value)) {
          inBox = true;
        }
      });
    }
    if (pobox.length === 0 || inBox) {
      periode_desactivee.forEach((e) => {
        if (e.debut !== "" && e.fin !== "") this.DaysDisabledPeriode.push(e);
      });
    }
  }

  /**
   * Permet de valider un date, active ou pas.
   * @param {*} date Doit etre un object moment.
   * @return true pour une date active et false sinon;
   */
  ValidationDay(date) {
    // this.disabledByCodePostal();
    return new Promise((resolvEnd) => {
      // permet de dessactiver les jours avant le jour valide par l'application.
      if (date.diff(this.dateMonth, "minute") >= 0) {
        // permet de desactivée en function de l'indice.
        if (this.IndexDayDisabled.includes(date.day())) {
          resolvEnd(this.statusDate(date, false, "default-disable-day"));
        } else {
          /**
           * On verifie le jour  par rapport au tableau des jours desactivées.
           * à ce niveau on desactive en function des dates.
           */
          if (this.DaysDisabledDate.includes(date.format("YYYY-MM-DD"))) {
            resolvEnd(this.statusDate(date, false, "default-disable-date"));
          } else if (this.DaysDisabledPeriode.length) {
            /**
             * à ce niveau, on desactive en function de la periode.
             */
            for (const i in this.DaysDisabledPeriode) {
              const p = this.DaysDisabledPeriode[i];
              const p_d = date.diff(moment(p.debut, "YYYY-MM-DD"), "minute");
              const p_f = date.diff(moment(p.fin, "YYYY-MM-DD"), "minute");
              if (p_d >= 0 && p_f <= 0) {
                resolvEnd(
                  this.statusDate(date, false, "default-disable-periode")
                );
                break;
              }
              const ii = parseInt(i) + 1;
              if (ii === this.DaysDisabledPeriode.length) {
                resolvEnd(this.statusDate(date, true, "default-actif-periode"));
              }
            }
          } else resolvEnd(this.statusDate(date, true, "default-actif-date"));
        }
      } else {
        resolvEnd(this.statusDate(date, false, "default-disable"));
      }
    });
  }

  disabledByCodePostal() {
    console.log("store : ", store.state.location);
  }

  /**
   *
   * @param {*} date
   * @param {*} status
   * @param {*} custom_class
   * @param {*} select
   * @returns
   */
  statusDate(date, status, custom_class, select = false) {
    return {
      status: status,
      custom_class: custom_class,
      date: date.date(),
      select: select,
      date_string: date.format("YYYY-MM-DD"),
    };
  }
}
export default filtre;
