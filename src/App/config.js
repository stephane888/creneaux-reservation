function DisableHeuredate() {
  // Plage d'heure desactivée en function d'une date.
  var disable_heuredate = [];
  if (window.creneau_heures && window.creneau_heures.heuredate.length > 0) {
    disable_heuredate = window.creneau_heures.heuredate;
  }
  return disable_heuredate;
}
// Plage d'heure desactivée en function du jour
function DisableHeureday() {
  var disable_heureday = [];
  if (window.creneau_heures && window.creneau_heures.heureday.length > 0) {
    disable_heureday = window.creneau_heures.heureday;
  }
  return disable_heureday;
}

// date desactivée
function DateDesactivee() {
  var date_desactivee = [];
  if (
    window.creneau_configs &&
    window.creneau_configs.date_desactivee.length > 0
  ) {
    date_desactivee = window.creneau_configs.date_desactivee;
  }
  return date_desactivee;
}
//jour_desactivee
function JourDesactivee() {
  var jour_desactivee = [0, 6];
  if (window.creneau_configs && window.creneau_configs.days.length > 0) {
    jour_desactivee = [];
    for (const i in window.creneau_configs.days) {
      if (!window.creneau_configs.days[i]) {
        jour_desactivee.push(parseInt(i));
      }
    }
  }
  return jour_desactivee;
}
// definie les plages d'heuress valide avec en indice le jour.
function PlageHeuresValide() {
  return window.creneau_configs && window.creneau_configs.heures.length > 0
    ? window.creneau_configs.heures
    : [];
}

// Nombre de semaine
function NombreSemaine() {
  return window.creneau_configs && window.creneau_configs.nombre_semaine
    ? parseInt(window.creneau_configs.nombre_semaine)
    : 4;
}

// Date courante.
function CurrentDate() {
  return window.wbu_current_date
    ? window.moment(window.wbu_current_date, "DD-MM-YYYY HH:mm:ss")
    : window.moment();
}

// Type de livraison.
function BlocksTypeLivraisons() {
  var blocks_type_livraisons = [
    {
      titre: "Gratuit",
      body: [
        "Créneau horaire de XXXX min",
        "Délai de traitement de XXXX heures"
      ],
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
      body: [
        "Créneau horaire de XXXX min",
        "Délai de traitement de XXXX heures"
      ],
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
      body: [
        "Créneau horaire de XXXX min",
        "Délai de traitement de XXXX heures"
      ],
      montant: "19.99",
      type: "express",
      creneau: 30,
      delai_next_creneau: 30, // la durée entre les creneaux.
      delai: 1,
      id: 31058498191420,
      active: false
    }
  ];
  //
  if (window.creneau_types && window.creneau_types.typelivraison.length > 0) {
    for (const i in window.creneau_types.typelivraison) {
      window.creneau_types.typelivraison[
        i
      ].body = window.creneau_types.typelivraison[i].body.split("<br />");
      window.creneau_types.typelivraison[i].id = parseInt(
        window.creneau_types.typelivraison[i].id
      );
      window.creneau_types.typelivraison[i].creneau = parseInt(
        window.creneau_types.typelivraison[i].creneau
      );
      window.creneau_types.typelivraison[i].delai_next_creneau = parseInt(
        window.creneau_types.typelivraison[i].delai_next_creneau
      );
      window.creneau_types.typelivraison[i].delai = parseInt(
        window.creneau_types.typelivraison[i].delai
      );
      //on ajoute les delais surchargés.
      var type = window.creneau_types.typelivraison[i].type;
      if (
        window.creneau_types.delais_jour[type] &&
        window.creneau_types.delais_jour[type].length > 1
      ) {
        window.creneau_types.typelivraison[i].delais_jour =
          window.creneau_types.delais_jour[type];
      }
    }
    blocks_type_livraisons = window.creneau_types.typelivraison;
  }
  //on ajoute la veleur dynamique delai_override
  //delai_override est ajoute de maniere dynamique à object, il permet de partager la valeur dynamique du delai.
  // il a pour avantages d'etre court donc plus performant qu'un $emit.
  for (const i in blocks_type_livraisons) {
    blocks_type_livraisons[i].delai_override = blocks_type_livraisons[i].delai;
  }

  return blocks_type_livraisons;
}
/**
 * Determine le nombre de reservation par creneaux.
 */
function NombreResCreneau() {
  return window.creneau_configs && window.creneau_configs.nombre_res_creneau
    ? parseInt(window.creneau_configs.nombre_res_creneau)
    : 2;
}

function IsProdEnvir() {
  if (
    window.location.host.includes(".kksa") ||
    window.location.host.includes("localhost")
  ) {
    return false;
  } else {
    return true;
  }
}
function UrlSaveCreneau() {
  // url de sauvegarde des creneaux.
  var url_save_creneau =
    "https://www.habeuk.online/api/shopify/creneaux/add.js";
  if (IsProdEnvir()) {
    url_save_creneau = "http://habeuk.kksa/api/shopify/creneaux/add.js";
  }
  return url_save_creneau;
}
function UrlGetCreneau() {
  // url de sauvegarde des creneaux.
  var url_get_creneau =
    "https://www.habeuk.online/api/shopify/creneaux/checks.js";
  if (IsProdEnvir()) {
    url_get_creneau = "http://habeuk.kksa/api/shopify/creneaux/checks.js";
  }
  return url_get_creneau;
}
const configApp = {
  IsProduction: IsProdEnvir(),
  nombre_res_creneau: NombreResCreneau(),
  blocks_type_livraisons: BlocksTypeLivraisons(),
  current_date: CurrentDate(),
  nombre_semaine: NombreSemaine(),
  plage_heures_valide: PlageHeuresValide(),
  jour_desactivee: JourDesactivee(),
  date_desactivee: DateDesactivee(),
  disable_heureday: DisableHeureday(),
  disable_heuredate: DisableHeuredate(),
  url_save_creneau: UrlSaveCreneau(),
  url_get_creneau: UrlGetCreneau()
};
export default configApp;
