<template lang="html">
  <div>
    <b-form>
      <b-form-group>
        <template #label>
          <strong>Selectionner les jours ouvrables.</strong>
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
      <b-form-group>
        <template #label>
          <strong>Definir l'heure de debut et de fin</strong>
        </template>
        <div class="d-flex flex-wrap ">
          <div
            class="d-flex mr-3"
            v-for="(input, index) in creneau_configs.heures"
            :key="index"
          >
            <b-form-group>
              <template #label>
                {{ input.text }}
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
      <b-form-group
        description="Cela vous permet de desactiver les jours ou vous seriez indisponible, example le 25 decembre."
      >
        <template #label>
          <strong>Desactiver certanines dates</strong>
        </template>
        <div>
          <div>
            <b-button
              size="sm"
              variant="outline-info"
              @click="add_date_disabled"
              >+</b-button
            >
          </div>
          <div v-for="(date, index) in date_desactivee" :key="index">
            <b-form-datepicker
              :id="'example-datepicker-' + index"
              v-model="date.date"
              class="mb-2"
            ></b-form-datepicker>
          </div>
        </div>
      </b-form-group>
    </b-form>
    <pre>
      {{ jourInfo }}
    </pre>
  </div>
</template>

<script>
export default {
  name: "CreneauConfigs",
  props: {
    //
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
      ],
      creneau_configs: {
        days: [],
        heures: []
      },
      date_desactivee: []
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
    },
    add_date_disabled() {
      this.date_desactivee.push({ date: "" });
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
