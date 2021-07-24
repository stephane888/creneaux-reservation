<template>
  <div
    :class="class_alert"
    :attribut="alert_attribut_class"
    role="alert"
    :id="alert_id_html"
    v-if="show_alert"
  >
    <div v-html="alert_message"></div>
    <component
      v-bind:is="alert_template"
      @ev_alert_action="alert_action"
      :sub_datas="datas"
    ></component>
    <slot> </slot>
    <button type="button" class="close" aria-label="Close">
      <span aria-hidden="true" @click="closeByParent">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    alert_message: {
      type: String,
      default: "alert primary"
    },
    alert_id_html: {
      type: String,
      default: "id-alert"
    },
    show_alert: {
      type: Boolean,
      default: true
    },
    alert_attribut_class: {
      type: String,
      default: "alert-primary"
    },
    alert_template: {
      type: String,
      default: ""
    },
    datas: {
      type: [Object, Array, String, Number],
      default: "datas_vide"
    }
  },
  data: function() {
    return {
      // name:'',
    };
  },
  computed: {
    class_alert: {
      get: function() {
        var classe = "alert alert-dismissible fade show";
        classe += " " + this.alert_attribut_class;
        return classe;
      }
    }
  },
  methods: {
    closeByParent: function() {
      this.$emit("ev_alert_close");
    },
    alert_action: function(datas) {
      this.$emit("ev_alert_action", datas);
    }
  }
};
</script>
