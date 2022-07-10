import config from "../components/admin/configs/config";
const Utilities = {
  getDefaultCreneauConfig() {
    if (window.creneauConfigs) return window.creneauConfigs;
    return {
      days: [
        {
          text: "Lundi",
          value: 1,
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
          value: 1,
          debut: "7:30",
          fin: "21:30",
          indice: 0
        }
      ],
      nombre_semaine: 5,
      nombre_res_creneau: 2,
      title: "Finaliser la commande",
      deccalage_creneau_depart: 0,
      montant_min: 0,
      text_alert_montant_min:
        " le moment de la commande doit etre > à {{ montant_min }} €"
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
      periode_desactivee: [], //{ debut: "", fin: "" }
      type_disabled: "", // Permet de désactiver les heures ou les dates.
      pobox: []
    };
  },
  /**
   * Reinitialise le filtre.
   */
  filter: function() {
    if (window.creneauFilters) return window.creneauFilters;
    return [this.getDefaultFilter()];
  },
  /**
   *
   * @returns
   */
  GetUniqueDays: function() {
    var result = [];
    this.jours_selects.forEach(item => {
      if (item.value !== "all") {
        result.push(item);
      }
    });
    return result;
  },
  /**
   *
   * @returns
   */
  getDefaultDelaiOverride: function() {
    return {
      day: "",
      delai: 4
    };
  },
  getDefaultTypeLivraion() {
    if (window.creneauType) return window.creneauType;
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
  },
  crex1: {
    label: "Collecte",
    id: "collecte"
  },
  crex2: {
    label: "Livraison",
    id: "livraison"
  },
  getLocation() {
    const l =
      window.location.host === "habeuk.online"
        ? null
        : localStorage.getItem("wbu-google-location");
    return l !== null && l !== undefined ? JSON.parse(l) : "";
  },
  LoadValues(shop) {
    return new Promise(resolv => {
      config
        .bGet("/shopify-api-rest/load-configs", {
          params: { key: "creneaux-configs", shop: shop }
        })
        .then(resp => {
          if (resp.data && resp.data.value) {
            resolv(JSON.parse(resp.data.value));
          } else resolv(false);
        });
    });
  },
  LoadCreneauxExterne(param) {
    return new Promise(resolv => {
      config
        .post(
          "https://habeuk.online/shopify-api-rest/load-creneau-reserve",
          {},
          {
            params: param
          }
        )
        .then(resp => {
          if (resp.data) {
            resolv(resp.data);
          } else resolv(false);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
};
export default Utilities;

// Les ids de produits.
// 32583132807228
// 32583132839996
// 32583132872764
