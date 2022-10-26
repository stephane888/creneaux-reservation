<template lang="html">
  <div>
    <b-form>
      <b-form-group>
        <template #label>
          <strong> Selectionner les jours ouvrables. </strong>
        </template>
        <div class="d-flex flex-wrap align-items-center">
          <b-form-checkbox
            v-for="(checkbox, index) in creneauConfigs.days"
            :id="'checkbox-' + index"
            :key="index"
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
        <div class="d-flex flex-wrap">
          <div
            v-for="(input, index) in creneauConfigs.days"
            :key="index"
            class="d-flex mr-3"
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
      <!-- -->
      <b-form-group label="Nombre semaine affichée sur le calendrier">
        <b-form-input
          v-model="creneauConfigs.nombre_semaine"
          placeholder="Heure debut"
          type="number"
          class="mb-2"
        ></b-form-input>
      </b-form-group>
      <!-- -->
      <b-form-group label="Nombre reservation par creneau">
        <b-form-input
          v-model="creneauConfigs.nombre_res_creneau"
          placeholder="Heure debut"
          type="number"
          class="mb-2"
        ></b-form-input>
      </b-form-group>
      <!-- -->
      <b-form-group label="Titre de l'application">
        <b-form-input
          v-model="creneauConfigs.title"
          placeholder="titre du block"
          class="mb-2"
        ></b-form-input>
      </b-form-group>
      <!-- -->
      <b-form-group
        label="Decallage entre l'heure reelle et le premier creneau (en minutes)"
      >
        <b-form-input
          v-model.number="creneauConfigs.deccalage_creneau_depart"
          type="number"
          class="mb-2"
        ></b-form-input>
      </b-form-group>
      <!-- -->
      <b-form-group label="Montant min d'une commande (en euros)">
        <b-form-input
          v-model.number="creneauConfigs.montant_min"
          type="number"
          class="mb-2"
        ></b-form-input>
      </b-form-group>
      <!-- -->
      <b-form-group label="Texte alert montant min">
        <b-form-input
          v-model="creneauConfigs.text_alert_montant_min"
          class="mb-2"
        ></b-form-input>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CreneauBase",
  props: {},

  data() {
    return {};
  },
  computed: {
    ...mapState(["creneauConfigs"]),
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
