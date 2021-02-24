<template lang="html">
  <div>
    <b-form>
      <div class="ctn-action-button d-flex justify-content-end mb-2">
        <b-button variant="outline-info" size="sm" @click="FilterAdd()">
          Ajouter un filtre +
        </b-button>
      </div>
      <div class="accordion" role="tablist">
        <b-card
          no-body
          class="mb-2"
          v-for="(filter, index) in filters"
          :key="index"
        >
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
              block
              v-b-toggle="'config-accordion-' + index"
              variant="transparent"
            >
              <strong> Filtre {{ index + 1 }} </strong>
            </b-button>
            <div class="ctn-action-button static">
              <b-button
                variant="outline-danger"
                size="sm"
                @click="FilterRemove(index)"
              >
                <b-icon icon="trash-fill"> </b-icon>
              </b-button>
            </div>
          </b-card-header>
          <b-collapse
            :id="'config-accordion-' + index"
            :visible="index === 0 ? true : false"
            accordion="my-accordion"
            role="tabpanel"
          >
            <b-card-body>
              <b-form-group>
                <b-form-group description="format H:M, example 8:30">
                  <template #label>
                    <strong class="mt-3 mb-2 d-block">
                      Selectionner la plage d'heure à desactiver
                    </strong>
                  </template>
                  <b-row>
                    <b-col sm="6">
                      <b-form-input
                        v-model="filter.h_debut"
                        placeholder="Heure debut"
                        class="mb-2"
                        size="sm"
                      ></b-form-input>
                    </b-col>
                    <b-col sm="6">
                      <b-form-input
                        v-model="filter.h_fin"
                        placeholder="Heure fin"
                        size="sm"
                      ></b-form-input>
                    </b-col>
                  </b-row>
                </b-form-group>
                <hr />
                <!--  -->
                <b-form-group>
                  <template #label>
                    <strong class="mt-3 mb-2 d-block">
                      Selectionner les jours de la semaine
                    </strong>
                  </template>
                  <b-form-group>
                    <b-form-checkbox
                      :id="'checkbox-jr-' + index"
                      v-model="filter.jourmode"
                      size="sm"
                      @change="
                        SelectAllDate(
                          $event,
                          index,
                          filter.jours_select,
                          filter.jours_select_options
                        )
                      "
                      value="all"
                      unchecked-value="manuel"
                    >
                      Tous les jours
                    </b-form-checkbox>
                  </b-form-group>
                  <b-form-group label="Jours" v-slot="{ ariaDescribedby }">
                    <b-form-checkbox-group
                      :id="'checkbox-jour-group-' + index"
                      v-model="filter.jours_select"
                      @change="SelectOneDate(index)"
                      :options="filter.jours_select_options"
                      :aria-describedby="ariaDescribedby"
                      size="sm"
                    ></b-form-checkbox-group>
                  </b-form-group>
                </b-form-group>
                <hr />
                <!--  -->
                <b-form-group>
                  <template #label>
                    <div
                      class="d-flex justify-content-between aligns-items-center mt-3"
                    >
                      <strong>
                        Selectionner les dates
                      </strong>
                      <div class="ctn-action-button ">
                        <b-button
                          variant="outline-info"
                          size="sm"
                          @click="FilterAddDatedisabled(filter.date_desactivee)"
                        >
                          Ajouter une date +
                        </b-button>
                      </div>
                    </div>
                  </template>
                  <div>
                    <b-row>
                      <b-col
                        sm="4"
                        class="d-flex align-items-center"
                        v-for="(date, in_dd) in filter.date_desactivee"
                        :key="in_dd"
                      >
                        <b-input-group size="sm" class="mb-2">
                          <b-form-datepicker
                            :id="'datepicker-' + index + '-' + in_dd"
                            v-model="date.date"
                            :min="min_date"
                          >
                          </b-form-datepicker>
                          <b-input-group-append>
                            <b-button
                              variant="outline-danger"
                              size="sm"
                              @click="
                                FilterRemoveDateDesactivee(
                                  in_dd,
                                  filter.date_desactivee
                                )
                              "
                            >
                              <b-icon icon="trash-fill"> </b-icon>
                            </b-button>
                          </b-input-group-append>
                        </b-input-group>
                      </b-col>
                    </b-row>
                  </div>
                </b-form-group>
                <hr />
                <!--  -->
                <b-form-group>
                  <template #label>
                    <div
                      class="d-flex justify-content-between aligns-items-center mt-3"
                    >
                      <strong>
                        Selectionner les periodes
                      </strong>
                      <div class="ctn-action-button">
                        <b-button
                          variant="outline-info"
                          size="sm"
                          @click="
                            FilterAddPeriodedisabled(filter.periode_desactivee)
                          "
                        >
                          Ajouter une periode +
                        </b-button>
                      </div>
                    </div>
                  </template>
                  <div>
                    <b-row>
                      <b-col
                        sm="6"
                        v-for="(date, in_pd) in filter.periode_desactivee"
                        :key="in_pd"
                      >
                        <b-input-group size="sm" class="mb-2">
                          <b-form-datepicker
                            :id="'datedebut-' + index + '-' + in_pd"
                            v-model="date.debut"
                            placeholder="Date de debut"
                            :min="min_date"
                          ></b-form-datepicker>
                          <b-form-datepicker
                            :id="'datefin-' + index + '-' + in_pd"
                            v-model="date.fin"
                            placeholder="Date de fin"
                            :min="FilterMinDateFin(date.debut)"
                          ></b-form-datepicker>
                          <b-input-group-append>
                            <b-button
                              variant="outline-danger"
                              size="sm"
                              @click="
                                FilterRemovePeriodeDesactivee(
                                  in_pd,
                                  filter.periode_desactivee
                                )
                              "
                            >
                              <b-icon icon="trash-fill"> </b-icon>
                            </b-button>
                          </b-input-group-append>
                        </b-input-group>
                      </b-col>
                    </b-row>
                  </div>
                </b-form-group>
                <hr />
                <!--  -->
              </b-form-group>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
    </b-form>
    <pre class="d-none">
      filters : {{ filters }}
    </pre>
  </div>
</template>

<script>
import Utilities from "../Utilities";
export default {
  name: "CreneauBase",
  props: {
    filters: {
      type: Array,
      required: true
    }
  },
  components: {
    //
  },
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const minDate = new Date(today);
    return {
      //filters: [Utilities.filter()],
      min_date: minDate
    };
  },
  mounted() {
    //
  },
  watch: {
    //
  },
  computed: {
    //
  },
  methods: {
    FilterAddDatedisabled(date_desactivee) {
      date_desactivee.push({ date: "" });
    },
    FilterAddPeriodedisabled(periode_disabled) {
      periode_disabled.push({ debut: "", fin: "" });
    },
    FilterAddSelectJour() {
      //
    },
    SelectAllDate(check, i, jours_select, jours_select_options) {
      if (this.filters[i]) {
        this.filters[i].jours_select = [];
        if (check === "all") {
          jours_select_options.forEach(item => {
            this.filters[i].jours_select.push(item.value);
          });
        }
      }
    },
    SelectOneDate(i) {
      if (this.filters[i]) {
        if (this.filters[i].jours_select.length === 7) {
          this.filters[i].jourmode = "all";
        } else {
          this.filters[i].jourmode = "manuel";
        }
      }
    },
    FilterRemoveDateDesactivee(i, dates) {
      if (dates[i]) {
        dates.splice(i, 1);
      }
    },
    FilterRemovePeriodeDesactivee(i, dates) {
      if (dates[i]) {
        dates.splice(i, 1);
      }
    },
    FilterMinDateFin(min_date) {
      if (!min_date) {
        return this.min_date;
      }
      return min_date;
    },
    FilterAdd() {
      this.filters.push(Utilities.filter());
    },
    FilterRemove(i) {
      if (this.filters[i]) {
        this.filters.splice(i, 1);
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>

<!--
 //nom du fichier en pascal.
 //<template>
 - le nom des attributs en kebab-case;
 - la valeur des attributs et des variables en camelCase;
 - function en PascalCase
 //props, data
 - variable en camelCase
 //methods
 - variable en PascalCase
-->
