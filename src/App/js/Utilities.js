const Utilities = {
  getDefaultCreneauConfig() {
    return {
      days: [
        {
          text: "Lundi",
          value: 0,
          debut: "7:30",
          fin: "21:30",
          indice: 1
        },
        {
          text: "Mardi",
          value: 1,
          debut: "7:30",
          fin: "21:30",
          indice: 2
        },
        {
          text: "Mercredi",
          value: 1,
          debut: "7:30",
          fin: "21:30",
          indice: 3
        },
        {
          text: "Jeudi",
          value: 1,
          debut: "7:30",
          fin: "21:30",
          indice: 4
        },
        {
          text: "Vendredi",
          value: 1,
          debut: "7:30",
          fin: "21:30",
          indice: 5
        },
        {
          text: "Samedi",
          value: 1,
          debut: "7:30",
          fin: "21:30",
          indice: 6
        },
        {
          text: "Dimanche",
          value: 0,
          debut: "7:30",
          fin: "21:30",
          indice: 0
        }
      ],
      nombre_semaine: 5,
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
  /**
   * Retourne le model de filtre par defaut.
   * @returns
   */
  getDefaultFilter: function() {
    return {
      titre: "Indisponibilité, congé",
      h_debut: "",
      h_fin: "",
      jour_type: "",
      show_select_date_indice_all: null,
      select_jour_indice: "",
      jourmode: "manuel",
      jours_select: [],
      date_desactivee: [], //{ date: "" }
      periode_desactivee: [] //{ debut: "", fin: "" }
    };
  },
  /**
   * Reinitialise le filtre.
   */
  filter: function() {
    return [this.getDefaultFilter()];
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
  getDefaultTypeLivraion() {
    return [
      {
        titre: "Gratuit",
        body:
          '<div class="col-12 col-sm-6 col-md-4 my-2">Créneau horaire de aeieaeaeie {{ creneau }} min</div><div class="col-12 col-sm-6 col-md-4 my-2">Délai de aeieieiea traitement de {{ delai }} jours</div><div class="col-12 col-sm-6 col-md-4 my-2">Frais de livraison : {{montant}}</div>',
        montant: "Gratuit",
        type: "free",
        creneau: 120,
        delai_next_creneau: 30,
        delai: 3,
        delais_jour: [],
        id: 32583132807228,
        active: true
      },
      {
        titre: "Plus",
        body:
          '<div class="col-12 col-sm-6 col-md-4 my-2">Créneau horaire de {{ creneau }} min</div><div class="col-12 col-sm-6 col-md-4 my-2">Délai de traitement de {{ delai }} jours</div><div class="col-12 col-sm-6 col-md-4 my-2">Frais de livraison : {{montant}}</div>',
        montant_libele: "Frais de livraison : {{montant}}€",
        montant: "9.99€",
        type: "plus",
        creneau: 60,
        delai_next_creneau: 30,
        delai: 2,
        delais_jour: [],
        id: 32583132839996,
        active: false
      },
      {
        titre: "Express",
        body:
          '<div class="col-12 col-sm-6 col-md-4 my-2">Créneau horaire de {{ creneau }} min</div><div class="col-12 col-sm-6 col-md-4 my-2">Délai de traitement de {{ delai }} jours</div><div class="col-12 col-sm-6 col-md-4 my-2">Frais de livraison : {{montant}}</div>',
        montant: "19.99€",
        type: "express",
        creneau: 30,
        delai_next_creneau: 30,
        delai: 1,
        delais_jour: [],
        id: 32583132872764,
        active: false
      }
    ];
  }
};
export default Utilities;

// Les ids de produits.
// 32583132807228
// 32583132839996
// 32583132872764
