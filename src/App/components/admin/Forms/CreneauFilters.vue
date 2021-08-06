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
          v-for="(filter, index) in creneauFilters"
          :key="index"
        >
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
              block
              v-b-toggle="'config-accordion-' + index"
              variant="transparent"
            >
              <strong> Filtre {{ index + 1 }}: {{ filter.titre }} </strong>
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
                <b-form-group label="Titre du filtre">
                  <b-form-input
                    v-model="filter.titre"
                    class="mb-2"
                  ></b-form-input>
                </b-form-group>
                <!-- -->
                <b-form-group label="Données à desactiver">
                  <b-form-radio-group
                    v-model="filter.type_disabled"
                    :options="type_disabled_options"
                    name="radio-options"
                    debounce="2000"
                  ></b-form-radio-group>
                </b-form-group>
                <!-- -->
                <div v-if="filter.type_disabled === 'hours'">
                  <h3 class="border-bottom pb-2 mb-2 mt-4">
                    desactiver une plage d'heures.
                  </h3>
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
                          debounce="2000"
                        ></b-form-input>
                      </b-col>
                      <b-col sm="6">
                        <b-form-input
                          v-model="filter.h_fin"
                          placeholder="Heure fin"
                          size="sm"
                          debounce="2000"
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
                          SelectAllDate($event, index, filter.jours_select)
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
                        :options="joursActiveOptions"
                        :aria-describedby="ariaDescribedby"
                        size="sm"
                      ></b-form-checkbox-group>
                    </b-form-group>
                  </b-form-group>
                  <hr />
                </div>
                <!-- -->

                <h3
                  class="border-bottom pb-2 mb-2 mt-4"
                  v-if="filter.type_disabled === 'days'"
                >
                  Desactivation des jours
                </h3>
                <!--  -->
                <div v-if="filter.type_disabled !== ''">
                  <b-form-group>
                    <template #label>
                      <div
                        class="
                        d-flex
                        justify-content-between
                        aligns-items-center
                        mt-3
                      "
                      >
                        <strong> Selectionner les dates </strong>
                        <div class="ctn-action-button">
                          <b-button
                            variant="outline-info"
                            size="sm"
                            @click="
                              FilterAddDatedisabled(filter.date_desactivee)
                            "
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
                              locale="fr"
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
                        class="
                        d-flex
                        justify-content-between
                        aligns-items-center
                        mt-3
                      "
                      >
                        <strong> Selectionner les periodes </strong>
                        <div class="ctn-action-button">
                          <b-button
                            variant="outline-info"
                            size="sm"
                            @click="
                              FilterAddPeriodedisabled(
                                filter.periode_desactivee
                              )
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
                </div>
                <!--  -->
              </b-form-group>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
    </b-form>
    <pre>creneauFilters {{ creneauFilters }} </pre>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Utilities from "../../../js/Utilities";
export default {
  name: "CreneauBase",
  props: {
    joursActive: {
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
      min_date: minDate,
      type_disabled_options: [
        { text: "Desactive les plages d'heures", value: "hours" },
        { text: "Desactive les jours", value: "days" }
      ]
    };
  },
  mounted() {
    //
  },
  watch: {
    //
  },
  computed: {
    ...mapState(["creneauFilters"]),
    joursActiveOptions() {
      var result = [];
      this.joursActive.forEach(jour => {
        result.push({ text: jour.text, value: jour.indice });
      });
      return result;
    }
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
    SelectAllDate(check, i) {
      if (this.creneauFilters[i]) {
        this.creneauFilters[i].jours_select = [];
        if (check === "all") {
          this.joursActive.forEach(item => {
            this.creneauFilters[i].jours_select.push(item.indice);
          });
        }
      }
    },
    SelectOneDate(i) {
      if (this.creneauFilters[i]) {
        if (
          this.creneauFilters[i].jours_select.length >= this.joursActive.length
        ) {
          this.creneauFilters[i].jourmode = "all";
        } else {
          this.creneauFilters[i].jourmode = "manuel";
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
      //this.creneauFilters.push(Utilities.filter());
      this.$store.dispatch("SetFilterAdd");
    },
    FilterRemove(i) {
      if (this.creneauFilters[i]) {
        this.creneauFilters.splice(i, 1);
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
