<template>
  <creneau></creneau>
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
export default {
  name: "App",
  components: {
    creneau: function() {
      return new Promise(resolv => {
        const callbackJquery = () => {
          console.log("Chargement du module creneau");
          resolv(import("./App/index.vue"));
        };
        //on verifie la presence de Jquery;
        if (window.jQuery) {
          callbackJquery();
        } else {
          console.log(" window.jQuery not installed ");
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
          //on ajoute momment
          if (window.moment) {
            //
          }
        }
      });
    }
  }
};
</script>
