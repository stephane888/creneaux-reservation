<template lang="html">
  <div>
    <b-form>
      <b-form-group>
        <template #label>
          <strong> Selectionner les jours ouvrables. </strong>
        </template>
        <div class="d-flex flex-wrap align-items-center">
          <b-form-checkbox
            v-for="(checkbox, index) in creneau_configs.days"
            :key="index"
            :id="'checkbox-' + index"
            v-model="checkbox.value"
            :value="1"
            :unchecked-value="0"
            class="mr-3 d-inline-flex align-items-center"
          >
            {{ checkbox.text }}
          </b-form-checkbox>
        </div>
      </b-form-group>
      <b-form-group description="l'heure au format HH:MM, example : 15:30">
        <template #label>
          <strong> Definir l'heure de debut et de fin </strong>
        </template>
        <div class="d-flex flex-wrap ">
          <div
            class="d-flex mr-3"
            v-for="(input, index) in creneau_configs.heures"
            :key="index"
          >
            <b-form-group>
              <template #label>
                <span> {{ input.text }} </span>
              </template>
              <b-form-input
                v-model="input.debut"
                placeholder="Heure debut"
                class="mb-2"
              ></b-form-input>
              <b-form-input
                v-model="input.fin"
                placeholder="Heure fin"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>
      </b-form-group>
      <b-form-group label="Nombre semaine affichée sur le calendrier">
        <b-form-input
          v-model="creneau_configs.nombre_semaine"
          placeholder="Heure debut"
          type="number"
          class="mb-2"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Nombre reservation par creneau">
        <b-form-input
          v-model="creneau_configs.nombre_res_creneau"
          placeholder="Heure debut"
          type="number"
          class="mb-2"
        ></b-form-input>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "CreneauBase",
  props: {
    creneau_configs: {
      type: Object,
      default: function() {
        return {
          days: [],
          heures: [],
          nombre_semaine: "",
          nombre_res_creneau: ""
        };
      }
    }
  },
  components: {
    //
  },
  data() {
    return {
      jourInfo: [
        { text: "Lundi", value: 1, debut: "7:30", fin: "21:30", indice: 1 },
        { text: "Mardi", value: 1, debut: "7:30", fin: "21:30", indice: 2 },
        { text: "Mercredi", value: 1, debut: "7:30", fin: "21:30", indice: 3 },
        { text: "Jeudi", value: 1, debut: "7:30", fin: "21:30", indice: 4 },
        { text: "Vendredi", value: 1, debut: "7:30", fin: "21:30", indice: 5 },
        { text: "Samedi", value: 1, debut: "7:30", fin: "21:30", indice: 6 },
        { text: "Dimanche", value: 0, debut: "7:30", fin: "21:30", indice: 0 }
      ]
      /*
      creneau_configs: {
        days: [],
        heures: []
      }
      /**/
    };
  },
  mounted() {
    this.BuildDays();
    this.BuildHaure();
  },
  watch: {
    //
  },
  computed: {
    //
  },
  methods: {
    BuildDays() {
      this.jourInfo.forEach(item => {
        this.creneau_configs.days.push(item);
      });
    },
    BuildHaure() {
      this.creneau_configs.heures = this.jourInfo;
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
