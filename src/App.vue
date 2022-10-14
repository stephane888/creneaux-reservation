<template>
  <div>
    <UserCreneau :date-du-jour="dateDuJour"></UserCreneau>
    <div class="creneaux-mbt">
      <admin-creneau></admin-creneau>
    </div>
  </div>
</template>

<script>
import AdminCreneau from './App/AdminCreneau.vue'
function loadScript (src) {
  return new Promise(resolv => {
    const s = document.createElement('script')
    s.setAttribute('src', src)
    s.onload = function () {
      console.log('Chargement du script ok : ', src)
      resolv(true)
    }
    document.head.appendChild(s)
  })
}

export default {
  name: 'App',
  components: {
    // UserCreneau: () => import("./App/UserCreneau.vue"),
    AdminCreneau,
    UserCreneau: () => {
      return new Promise(resolv => {
        const callbackJquery = () => {
          console.log('Chargement du module creneau')
          resolv(import('./App/UserCreneau.vue'))
        }
        // On verifie la presence de Moment;
        if (window.Moment) {
          callbackJquery()
        } else {
          loadScript(
            'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment-with-locales.min.js'
          ).then(status => {
            if (status) callbackJquery()
          })
        }
      })
    }
  },
  data () {
    return {
      dateDuJour: new Date() // "06-08-2021 04:00:00"
    }
  },
  mounted () {
    // this.dateDuJour = moment("25-05-2021 20:30:00", "DD-MM-YYYY HH:mm:ss");
  }
}
</script>
