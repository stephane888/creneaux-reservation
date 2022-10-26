<template lang="html">
  <div>
    <b-form>
      <!-- Type de livraison -->
      <h4>Type de livraison</h4>
      <div class="accordion" role="tablist">
        <b-card v-for="(type, i) in creneauType" :key="i" no-body class="mb-2">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
              v-b-toggle="'config-accordion-' + i"
              block
              variant="transparent"
            >
              <strong>
                Type {{ i + 1 }} : <i>{{ type.titre }}</i>
              </strong>
            </b-button>
          </b-card-header>
          <b-collapse
            :id="'config-accordion-' + i"
            :visible="i === 0 ? true : false"
            accordion="my-accordion-type"
            role="tabpanel"
          >
            <b-card-body>
              <b-form-group>
                <template #label>
                  <strong class="mt-3 mb-2 d-block">
                    Type de livraison.
                  </strong>
                </template>
                <b-form-group label="Selectionner le type de livraison">
                  <b-form-input
                    v-model="type.titre"
                    placeholder="Titre du type de livraison"
                    class="mb-2"
                  ></b-form-input>
                </b-form-group>
              </b-form-group>
              <b-form-group label="Description">
                <template #description>
                  <div v-pre>
                    vous pouvez utiliser les champs dynamic suivants:
                    {{ titre }}, {{ montant }}, {{ creneau }},
                    {{ delai_next_creneau }}, {{ delai }}
                  </div>
                </template>
                <b-form-textarea
                  v-model="type.body"
                  placeholder="Enter something..."
                  rows="3"
                  max-rows="3"
                  class="mb-2"
                ></b-form-textarea>
              </b-form-group>

              <b-form-group label="Montant">
                <template #description>
                  <div v-pre>
                    Remplissez le montant avec la devise. Ex: 100€
                  </div>
                </template>
                <b-form-input
                  v-model="type.montant"
                  placeholder="montant"
                  class="mb-2"
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Type">
                <b-form-input
                  v-model="type.type"
                  placeholder="type"
                  class="mb-2"
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Durée d'un creneau">
                <b-form-input
                  v-model="type.creneau"
                  placeholder="creneau"
                  class="mb-2"
                  type="number"
                ></b-form-input>
              </b-form-group>
              <b-form-group label="interval entre les creneaux">
                <b-form-input
                  v-model="type.delai_next_creneau"
                  placeholder="delai_next_creneau"
                  class="mb-2"
                  type="number"
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Delai en jour(s)">
                <b-form-input
                  v-model="type.delai"
                  placeholder="delai"
                  class="mb-2"
                  type="number"
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Selectionner le produit">
                <b-form-select
                  v-model="type.id"
                  :options="products"
                ></b-form-select>
              </b-form-group>
              <b-form-group>
                <b-form-checkbox
                  v-model="type.active"
                  size="sm"
                  :value="true"
                  :unchecked-value="false"
                >
                  Activé par defaut
                </b-form-checkbox>
              </b-form-group>
              <hr />
              <!-- Surcharge du delais de livraison -->
              <h5>Surchagé le delai de livraison en function du jour.</h5>
              <div class="ctn-action-button d-flex justify-content-end mb-2">
                <b-button
                  variant="outline-info"
                  size="sm"
                  @click="OverrideAdd(i)"
                >
                  Ajouter une surcharge +
                </b-button>
              </div>
              <div class="accordion" role="tablist">
                <b-card
                  v-for="(override, ii) in type.delais_jour"
                  :key="ii"
                  no-body
                  class="mb-2"
                >
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button
                      v-b-toggle="'config-accordion-over' + ii"
                      block
                      variant="transparent"
                    >
                      <strong>
                        Surcharge {{ ii + 1 }} : {{ getJour(override.day) }}
                      </strong>
                    </b-button>
                  </b-card-header>
                  <b-collapse
                    :id="'config-accordion-over' + ii"
                    :visible="ii === 0 ? false : false"
                    accordion="my-accordion-surcharge"
                    role="tabpanel"
                  >
                    <b-card-body>
                      <b-form-group>
                        <template #label>
                          <strong class="mt-3 mb-2 d-block">
                            Surcharger un delai de livraison.
                          </strong>
                        </template>
                        <b-row>
                          <b-col sm="4">
                            <b-form-group
                              label="Selectionner le jour de la semaine"
                            >
                              <b-form-select
                                v-model="override.day"
                                :options="joursActiveOptions"
                              ></b-form-select>
                            </b-form-group>
                          </b-col>
                          <b-col sm="4">
                            <b-form-group label="Delai en jour(s)">
                              <b-form-input
                                v-model="override.delai"
                                placeholder="delai"
                                class="mb-2"
                                type="number"
                              ></b-form-input>
                            </b-form-group>
                          </b-col>
                        </b-row>
                      </b-form-group>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
      <!-- -->
      <hr />
    </b-form>
    conf:
    <pre>{{ creneauType }}</pre>
  </div>
</template>

<script>
import { mapState } from "vuex";
//
// import magentoSynchroListSites from "./ListSites.vue";
import Utilities from "../../../js/Utilities";
export default {
  name: "TypeLivraion",
  props: {
    joursActive: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      products: [
        { text: "32583132807228", value: "32583132807228" },
        { text: "32583132839996", value: "32583132839996" },
        { text: "32583132872764", value: "32583132872764" },
      ],
    };
  },
  computed: {
    ...mapState(["creneauType"]),
    joursActiveOptions() {
      const result = [];
      this.joursActive.forEach((jour) => {
        result.push({ text: jour.text, value: jour.indice });
      });
      return result;
    },
  },
  methods: {
    OverrideAdd(i) {
      if (this.creneauType[i]) {
        this.creneauType[i].delais_jour.push(
          Utilities.getDefaultDelaiOverride()
        );
      }
    },
    DeleteOverride(i, ii) {
      if (this.creneauType[i] && this.creneauType[i].delais_jour[ii]) {
        this.creneauType[i].delais_jour.splice(ii, 1);
      }
    },
    getJour(indice) {
      for (const i in this.joursActive) {
        if (this.joursActive[i].indice === indice) {
          return this.joursActive[i].text;
        }
      }
    },
  },
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
