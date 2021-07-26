<template>
  <div
    :class="classes"
    class="rectangle mx-2 mx-md-0 mb-3 mb-md-0 mx-3 pt-4 pl-sm-3 col-md-6"
  >
    <div class="title-creneau h2">{{ title }}</div>
    <div
      class=" d-flex justify-content-between justify-content-md-start line-creneau h1 "
    >
      <!--
      <hours></hours>
       -->
      <i
        class="icone-svg mb-md-1 mb-lg-2 cursor-pointer"
        @click="showCalandar = !showCalandar"
      >
        <SvgCalandar></SvgCalandar>
      </i>
    </div>

    <calendar :show-calandar="showCalandar" :type="type"></calendar>
    <p class="cursor-pointer">Mercredi 7 juillet</p>
    <div
      class="over-container-date"
      v-if="showCalandar"
      @click="showCalandar = !showCalandar"
    ></div>
  </div>
</template>
<script>
//import hours from "./Hours.vue";
import calendar from "./calendar.vue";
import SvgCalandar from "./SvgCalandar.vue";
export default {
  name: "Creneau",
  props: {
    title: {
      type: String,
      required: true
    },
    classes: {
      type: String,
      default: "rond-left"
    },
    type: {
      type: String,
      required: true
    }
  },
  components: {
    //hours,
    calendar,
    SvgCalandar
  },
  data() {
    return {
      showCalandar: false
    };
  }
};
</script>
