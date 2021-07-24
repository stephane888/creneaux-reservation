<template>
  <div>
    <creneaux class="creneaux-mbt"></creneaux>
    <div class="creneaux-mbt" v-if="displayAdmin">
      <app-admin></app-admin>
    </div>
  </div>
</template>

<script>
//import creneau from "./App/index.vue";
function loadScript(src) {
  return new Promise(resolv => {
    var s = document.createElement("script");
    s.setAttribute("src", src);
    s.onload = function() {
      console.log("Chargement du script ok : ", src);
      resolv(true);
    };
    document.head.appendChild(s);
  });
}
/*
function loadstyle(src) {
  return new Promise(resolv => {
    var s = document.createElement("link");
    s.setAttribute("rel", "stylesheet");
    s.setAttribute("href", src);
    s.onload = function() {
      console.log("Chargement du Style ok : ", src);
      resolv(true);
    };
    document.head.appendChild(s);
  });
}
/**/

export default {
  name: "App",
  components: {
    creneaux: function() {
      return new Promise(resolv => {
        const callbackJquery = () => {
          console.log("Chargement du module creneau");
          resolv(import("./Creneaux.vue"));
        };
        //on verifie la presence de Jquery;
        if (window.jQuery && window.Moment) {
          callbackJquery();
        } else {
          console.log(" window.jQuery not installed ");
          /*
          loadstyle(
            "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          );
          /**/
          loadScript("https://code.jquery.com/jquery-3.5.1.min.js").then(
            status => {
              if (status) {
                loadScript(
                  "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment-with-locales.min.js"
                ).then(status2 => {
                  if (status2) {
                    callbackJquery();
                  }
                });
              }
            }
          );
        }
      });
    },
    "app-admin": () => import("./AppAdmin/Admin")
  },
  props: {
    // Pour activer le chargement de l'admin.
    displayAdmin: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  }
};
</script>
