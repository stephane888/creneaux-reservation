if (window.moment) {
  var moment = window.moment
}

const Filters = {
  /**
   * Elle permet de determiner le prochain jour disponible, en passant par la function
   * getDayUtilisable.
   * si sa valeur est à 1, on applique le delai
   */
  apply__app_delai_jour: true,
  /**
   * Permet de reduire le temps d'execution des creneaux.
   * contient les dates desactivés due à filter.date_desactivee
   */
  filter_date_desactivee: {},
  /**
   * Permet de reduire le temps d'execution des creneaux.
   * contient les dates desactivés due à filter.periode_desactivee
   */
  filter_periode_desactivee: {},
  attri_filters: ['jours_select', 'date_desactivee', 'periode_desactivee'],
  /**
   * Permet de verifier si la plage d'heure selectionne est inclus ou partielment inclut dans le creneau.
   * cette function est utilisé uniquement lors du passage des creneaux.
   * tests:
   * il faut desactiver, une plage inferieur au creneau, à l'intervalle entre deux creneau.
   * egal ------
   * superieur ------
   * NB:il manque une 4 condition.
   * L'execution est importante.
   */
  HourIntervalContain: function (
    heure_begin_disable,
    heure_end_disable,
    creneaux_heure_begin,
    creneaux_heure_end,
    date_min_string
  ) {
    const h_d = heure_begin_disable.split(':')
    const date_min = moment(date_min_string, 'DD-MM-YYYY HH:mm:ss')
    date_min.hours(h_d[0])
    date_min.minutes(h_d[1])
    //
    const h_f = heure_end_disable.split(':')
    const date_max = moment(date_min_string, 'DD-MM-YYYY HH:mm:ss')
    date_max.hours(h_f[0])
    date_max.minutes(h_f[1])
    //
    const time_H_B_min = creneaux_heure_begin.diff(date_min, 'minutes')
    const time_H_B_max = creneaux_heure_begin.diff(date_max, 'minutes')
    const time_H_E_min = creneaux_heure_end.diff(date_min, 'minutes')
    const time_H_E_max = creneaux_heure_end.diff(date_max, 'minutes')
    // console.log("time_H_B_min : ", time_H_B_min);
    // console.log("time_H_E_max : ", time_H_E_max);
    if (
      (time_H_B_min >= 0 && time_H_B_max < 0) ||
      (time_H_E_min > 0 && time_H_E_max <= 0) ||
      (time_H_B_min < 0 && time_H_E_max >= 0)
    ) {
      return true
    } else {
      return false
    }
  },
  /**
   * On verifie que un ou plusieurs sont selectionnées.
   * si nous sommes un jour inclut dans la liste on retourne true,
   * si non on retourne false,
   * si le tableau est vide, on retourne true.
   * @return true si la date ou le creneau doivent etre desactiver et false sinon.
   * NB: jours_select ne doit pas etre vide.
   */
  JourSelect: function (jours_select, app_date_current_indice) {
    return new Promise(resolv => {
      for (const i in jours_select) {
        if (jours_select[i] === app_date_current_indice) {
          resolv(true)
          return
        }
        const ii = parseInt(i) + 1
        if (jours_select.length === ii) {
          resolv(false)
          return
        }
      }
    })
  },
  /**
   * Permet de filtrer en function de la date.
   * ( il faudra verifier que l'attribut filter.dates_disable nest plus definit )
   * Pour les dates, le scenario est peu different, car si on ne trouve pas une date
   * = à la date encour et que filter.periode_desactivee n'est pas definit on doit verifier
   * le niveau inferieur qui doit etre absolument filter.periode_desactive.
   * @return true si la date ou le creneau doivent etre desactiver et false sinon.
   */
  DateDesactivee: function (
    i,
    date_desactivee,
    app_date_current_string_en,
    type = 'date'
  ) {
    const self = this
    return new Promise(resolv => {
      const CheckDateDesactivee = function () {
        return new Promise(resolv2 => {
          for (const i in date_desactivee) {
            if (date_desactivee[i].date === app_date_current_string_en) {
              resolv2(true)
              return
            }
            const ii = parseInt(i) + 1
            if (date_desactivee.length === ii) {
              resolv2(false)
              return
            }
          }
        })
      }
      if (type === 'date') {
        CheckDateDesactivee().then(status => {
          resolv(status)
        })
      } else {
        if (
          self.filter_date_desactivee[i] &&
          self.filter_date_desactivee[i][app_date_current_string_en]
        ) {
          resolv(
            self.filter_date_desactivee[i][app_date_current_string_en].status
          )
        } else {
          CheckDateDesactivee().then(status => {
            if (!self.filter_date_desactivee[i]) {
              self.filter_date_desactivee[i] = {}
            }
            self.filter_date_desactivee[i][app_date_current_string_en] = {
              status: status
            }
            console.log('DateDesactivee +++')
            resolv(status)
          })
        }
      }
    })
  },
  /**
   * Permet de filtrer en function de la periode.
   * un remarque importante, on a pas besoin de tester pour tous les creneaux. 1 seul suffit,
   * on chosit de sauvegarder, le status du test dans l'object filter.periode_desactivee
   * On utilise self.app_date_current pour verifier la periode, or cette date contient l'heure,mm, ce qui va entrainer un deccalage.
   * donc, pour combler ce deccalage, on utilisera < 1 ou > 1
   * @param i index loop
   * @param periode_desactivee Array
   * @param app_date_current moment() format "YYYY-MM-DD";
   * @param app_date_current_string_en String format "YYYY-MM-DD"
   * @param type String
   */
  PeriodeDesactivee: function (
    i,
    periode_desactivee,
    app_date_current,
    app_date_current_string_en,
    type = 'date'
  ) {
    const self = this
    return new Promise(resolv => {
      const CheckPeriodeDesactivee = function () {
        return new Promise(resolv2 => {
          for (const i in periode_desactivee) {
            const periode = periode_desactivee[i]
            const date_min = moment(periode.debut, 'YYYY-MM-DD')
            const date_max = moment(periode.fin, 'YYYY-MM-DD')
            if (
              app_date_current.diff(date_min, 'days') >= 0 &&
              app_date_current.diff(date_max, 'days') <= 0
            ) {
              resolv2(true)
              return
            }
            const ii = parseInt(i) + 1
            if (periode_desactivee.length === ii) {
              resolv2(false)
              return
            }
          }
        })
      }
      if (type === 'date') {
        CheckPeriodeDesactivee().then(status => {
          resolv(status)
        })
      } else {
        if (
          self.filter_periode_desactivee[i] &&
          self.filter_periode_desactivee[i][app_date_current_string_en]
        ) {
          resolv(
            self.filter_periode_desactivee[i][app_date_current_string_en].status
          )
        } else {
          CheckPeriodeDesactivee().then(status => {
            if (!self.filter_periode_desactivee[i]) {
              self.filter_periode_desactivee[i] = {}
            }
            self.filter_periode_desactivee[i][app_date_current_string_en] = {
              status: status
            }
            resolv(status)
          })
        }
      }
    })
  },
  /**
   * on attend la fin de boucle filter, pour faire une sauvegarde tempon.
   */
  saveData: function (result, i, app_date_current_string_en) {
    const self = this
    if (result.verificateur === 'date_desactivee') {
      if (!self.filter_date_desactivee[i]) {
        self.filter_date_desactivee[i] = {}
      }
      self.filter_date_desactivee[i][app_date_current_string_en] = {
        status: result.status
      }
    } else if (result.verificateur === 'periode_desactivee') {
      if (self.filter_periode_desactivee[i]) {
        self.filter_periode_desactivee[i] = {}
      }
      self.filter_periode_desactivee[i][app_date_current_string_en] = {
        status: result.status
      }
    }
  },
  loopAttribFilter: function (
    i,
    filter,
    app_date_current_en,
    app_date_current_string_en,
    index_day,
    typefilter,
    attri_index = 0,
    status = false
  ) {
    return new Promise(resolv => {
      if (filter[this.attri_filters[attri_index]].length) {
        switch (this.attri_filters[attri_index]) {
          case 'jours_select':
            this.JourSelect(filter.jours_select, index_day).then(
              stateJourSelect => {
                if (!stateJourSelect) {
                  resolv({
                    status: stateJourSelect,
                    i: i,
                    verificateur: 'jours_select'
                  })
                } else {
                  const ii = attri_index + 1
                  if (ii < this.attri_filters.length) {
                    resolv(
                      this.loopAttribFilter(
                        i,
                        filter,
                        app_date_current_en,
                        app_date_current_string_en,
                        index_day,
                        typefilter,
                        ii,
                        stateJourSelect
                      )
                    )
                  } else {
                    resolv({
                      status: stateJourSelect,
                      i: i,
                      verificateur: this.attri_filters[attri_index]
                    })
                  }
                }
              }
            )
            break
          case 'date_desactivee':
            this.DateDesactivee(
              i,
              filter.date_desactivee,
              app_date_current_string_en,
              typefilter
            ).then(stateDateDesactivee => {
              // Si la valeur est true, => la date doit etre desactiver.
              if (stateDateDesactivee) {
                resolv({
                  status: stateDateDesactivee,
                  i: i,
                  verificateur: 'date_desactivee'
                })
              } else {
                const ii = attri_index + 1
                if (ii < this.attri_filters.length) {
                  resolv(
                    this.loopAttribFilter(
                      i,
                      filter,
                      app_date_current_en,
                      app_date_current_string_en,
                      index_day,
                      typefilter,
                      ii,
                      stateDateDesactivee
                    )
                  )
                } else {
                  resolv({
                    status: stateDateDesactivee,
                    i: i,
                    verificateur: this.attri_filters[attri_index]
                  })
                }
              }
            })
            break
          case 'periode_desactivee':
            this.PeriodeDesactivee(
              i,
              filter.periode_desactivee,
              app_date_current_en,
              app_date_current_string_en,
              typefilter
            ).then(statePeriodeDesactivee => {
              if (statePeriodeDesactivee) {
                resolv({
                  status: statePeriodeDesactivee,
                  i: i,
                  verificateur: 'periode_desactivee'
                })
              } else {
                const ii = attri_index + 1
                if (ii < this.attri_filters.length) {
                  resolv(
                    this.loopAttribFilter(
                      i,
                      filter,
                      app_date_current_en,
                      app_date_current_string_en,
                      index_day,
                      typefilter,
                      ii,
                      statePeriodeDesactivee
                    )
                  )
                } else {
                  resolv({
                    status: statePeriodeDesactivee,
                    i: i,
                    verificateur: this.attri_filters[attri_index]
                  })
                }
              }
            })
            break
          default:
            resolv({
              status: status,
              i: i,
              verificateur: 'non definit'
            })
        }
      } else {
        const ii = attri_index + 1
        if (ii < this.attri_filters.length) {
          resolv(
            this.loopAttribFilter(
              i,
              filter,
              app_date_current_en,
              app_date_current_string_en,
              index_day,
              typefilter,
              ii,
              status
            )
          )
        } else {
          resolv({
            status: status,
            i: i,
            verificateur: 'non definit END'
          })
        }
      }
    })
  }
}
export default Filters
