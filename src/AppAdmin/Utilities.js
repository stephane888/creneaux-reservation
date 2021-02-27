const Utilities = {
  JourInfos: function() {
    return [
      { text: "Lundi", value: 1, debut: "7:30", fin: "21:30", indice: 1 },
      { text: "Mardi", value: 1, debut: "7:30", fin: "21:30", indice: 2 },
      { text: "Mercredi", value: 1, debut: "7:30", fin: "21:30", indice: 3 },
      { text: "Jeudi", value: 1, debut: "7:30", fin: "21:30", indice: 4 },
      { text: "Vendredi", value: 1, debut: "7:30", fin: "21:30", indice: 5 },
      { text: "Samedi", value: 1, debut: "7:30", fin: "21:30", indice: 6 },
      { text: "Dimanche", value: 0, debut: "7:30", fin: "21:30", indice: 0 }
    ];
  },
  DefaultCreneauConfigs: function() {
    return {
      days: [],
      nombre_semaine: 4,
      nombre_res_creneau: 2,
      title: "Finaliser la commande",
      deccalage_creneau_depart: 0
    };
  },
  DefaultCreneauTypes: function() {
    return {
      typelivraison: this.getDefaultTypeLivraion()
    };
  },
  filter: function() {
    return {
      titre: "Indisponibilité, congé",
      h_debut: "",
      h_fin: "",
      jour_type: "",
      show_select_date_indice_all: null,
      select_jour_indice: "",
      jourmode: "manuel",
      jours_select: [],
      date_desactivee: [{ date: "" }],
      periode_desactivee: [{ debut: "", fin: "" }]
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
      day: "",
      delai: 4
    };
  },
  getDefaultTypeLivraion: function() {
    return [
      {
        titre: "Gratuit",
        body: `<div class="d-flex justify-content-between"> <span>Créneau horaire de {{ creneau }} min </span> <span>Délai de traitement de {{ delai }} Jours </span> </div>`,
        montant_libele: "Frais de livraison : {{montant}}",
        montant: "Gratuit",
        type: "free",
        creneau: 120, // la durée d'un creneaux.
        delai_next_creneau: 30, // la durée entre les creneaux.
        delai: 3, // delai de traitement entre la collecte et la livraion.
        //permet de surcharger le delai de traitement en fonction des jours de la semaine.
        /*
        example:
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
        /**/
        delais_jour: [],
        id: 31058498125884,
        active: true
        //delai_override est ajoute de maniere dynamique à object, il permet de partager la valeur dynamique du delai.
        // il a pour avantages d'etre court donc plus performant qu'un $emit.
      },
      {
        titre: "Plus",
        body: `<div class="d-flex justify-content-between"> <span>Créneau horaire de {{ creneau }} min </span> <span>Délai de traitement de {{ delai }} jours </span> </div>`,
        montant_libele: "Frais de livraison : {{montant}}€",
        montant: "9.99",
        type: "plus",
        creneau: 60,
        delai_next_creneau: 30, // la durée entre les creneaux.
        delai: 2,
        delais_jour: [],
        id: 31058498158652,
        active: false
      },
      {
        titre: "Express",
        body: `<div class="d-flex justify-content-between"> <span>Créneau horaire de {{ creneau }} min </span> <span>Délai de traitement de {{ delai }} jours </span> </div>`,
        montant_libele: "Frais de livraison : {{montant}}€",
        montant: "19.99",
        type: "express",
        creneau: 30,
        delai_next_creneau: 30, // la durée entre les creneaux.
        delai: 1,
        delais_jour: [],
        id: 31058498191420,
        active: false
      }
    ];
  }
};
export default Utilities;
