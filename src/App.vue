<template>
  <div>
    <UserCreneau class="creneaux-mbt"></UserCreneau>
    <div class="creneaux-mbt">
      <admin-creneau></admin-creneau>
    </div>
  </div>
</template>

<script>
import AdminCreneau from "./App/AdminCreneau.vue";
//import UserCreneau from "./App/UserCreneau.vue";
//import "./shopify.js";

export default {
  name: "App",
  components: {
    UserCreneau: () => import("./App/UserCreneau.vue"),
    AdminCreneau
  }
};
</script>

<style></style>
