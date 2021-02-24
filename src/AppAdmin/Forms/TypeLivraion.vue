<template lang="html">
  <div>
    <b-form>
      <!-- Type de livraison -->
      <h4>Type de livraison</h4>
      <div class="accordion" role="tablist">
        <b-card
          no-body
          class="mb-2"
          v-for="(type, i) in typesLivraison.typelivraison"
          :key="i"
        >
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
              block
              v-b-toggle="'config-accordion-' + i"
              variant="transparent"
            >
              <strong>
                Type {{ i + 1 }} : <i>{{ type.titre }}</i>
              </strong>
            </b-button>
          </b-card-header>
          <b-collapse
            :id="'config-accordion-' + i"
            :visible="i === 0 ? false : false"
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
                <b-form-textarea
                  v-model="type.body"
                  placeholder="Enter something..."
                  rows="3"
                  max-rows="3"
                  class="mb-2"
                ></b-form-textarea>
              </b-form-group>
              <b-form-group label="Montant">
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
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
      <hr />
      <!-- Surcharge du delais de livraison -->
      <h4>Surchagé le delai de livraison en function du jour.</h4>
      <div class="ctn-action-button d-flex justify-content-end mb-2">
        <b-button variant="outline-info" size="sm" @click="OverrideAdd()">
          Ajouter une surcharge +
        </b-button>
      </div>
      <div class="accordion" role="tablist">
        <b-card
          no-body
          class="mb-2"
          v-for="(override, ii) in typesLivraison.delais_jour"
          :key="ii"
        >
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
              block
              v-b-toggle="'config-accordion-' + ii"
              variant="transparent"
            >
              <strong> Surcharge {{ ii + 1 }} </strong>
            </b-button>
          </b-card-header>
          <b-collapse
            :id="'config-accordion-' + ii"
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
                <b-form-group label="Selectionner le type de livraison">
                  <b-form-select
                    v-model="override.type"
                    :options="type_options"
                  ></b-form-select>
                </b-form-group>
                <b-form-group label="Selectionner le jour de la semaine">
                  <b-form-select
                    v-model="override.day"
                    :options="jour_actif_semaine"
                  ></b-form-select>
                </b-form-group>
                <b-form-group label="Delai en jour(s)">
                  <b-form-input
                    v-model="override.delai"
                    placeholder="delai"
                    class="mb-2"
                    type="number"
                  ></b-form-input>
                </b-form-group>
              </b-form-group>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
      <!-- -->
      <hr />
    </b-form>
  </div>
</template>

<script>
//
//import magentoSynchroListSites from "./ListSites.vue";
import Utilities from "../Utilities";
export default {
  name: "TypeLivraion",
  props: {
    typesLivraison: {
      type: Object,
      resuired: true
    }
  },
  components: {
    //
  },
  data() {
    return {
      products: []
    };
  },
  mounted() {
    //
  },
  watch: {
    //
  },
  computed: {
    type_options() {
      var result = [];
      this.typesLivraison.typelivraison.forEach(type => {
        result.push({ text: type.titre, value: type.type });
      });
      return result;
    },
    jour_actif_semaine() {
      return [];
    }
  },
  methods: {
    OverrideAdd() {
      this.typesLivraison.delais_jour.push(Utilities.getDefaultDelaiOverride());
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
