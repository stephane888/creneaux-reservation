const Utilities = {
  jours_semaine: [
    { text: "Lundi", value: 1 },
    { text: "Mardi", value: 2 },
    { text: "Mercredi", value: 3 },
    { text: "Jeudi", value: 4 },
    { text: "Vendredi", value: 5 },
    { text: "Samedi", value: 6 },
    { text: "Dimanche", value: 0 }
  ],
  filter: function() {
    return {
      h_debut: "",
      h_fin: "",
      jour_type: "",
      show_select_date_indice_all: null,
      select_jour_indice: "",
      jourmode: "manuel",
      jours_select: [],
      jours_select_options: this.jours_semaine,
      date_desactivee: [{ date: "" }],
      periode_desactivee: [{ debut: "", fin: "" }],
      dates_disable: []
    };
  },
  GetUniqueDays: function() {
    var result = [];
    this.jours_selects.forEach(item => {
      if (item.value !== "all") {
        result.push(item);
      }
    });
    return result;
  },
  getDefaultDelaiOverride: function() {
    return {
      type: "",
      day: "",
      delai: "5"
    };
  },
  getDefaultTypeLivraion: function() {
    return [
      {
        titre: "Gratuit",
        body: "Créneau horaire de XXXX min Délai de traitement de XXXX heures",
        montant: "0",
        type: "free",
        creneau: 120, // la durée d'un creneaux.
        delai_next_creneau: 30, // la durée entre les creneaux.
        delai: 3, // delai de traitement entre la collecte et la livraion.
        //permet de surcharger le delai de traitement en fonction des jours de la semaine.
        delais_jour: [
          {
            day: 4,
            delai: 4
          },
          {
            day: 5,
            delai: 4
          }
        ],
        id: 31058498125884,
        active: true
        //delai_override est ajoute de maniere dynamique à object, il permet de partager la valeur dynamique du delai.
        // il a pour avantages d'etre court donc plus performant qu'un $emit.
      },
      {
        titre: "Plus",
        body: "Créneau horaire de XXXX min Délai de traitement de XXXX heures",
        montant: "9.99",
        type: "plus",
        creneau: 60,
        delai_next_creneau: 30, // la durée entre les creneaux.
        delai: 2,
        id: 31058498158652,
        active: false
      },
      {
        titre: "Express",
        body: "Créneau horaire de XXXX min Délai de traitement de XXXX heures",
        montant: "19.99",
        type: "express",
        creneau: 30,
        delai_next_creneau: 30, // la durée entre les creneaux.
        delai: 1,
        id: 31058498191420,
        active: false
      }
    ];
  }
};
export default Utilities;
