/**
 *recupere les données du jours en function de l'indice du jour.
 */
const getDayData = i => {
  const daysDatas = window.creneau_configs.days;
  for (const t in daysDatas) {
    if (daysDatas[t] && daysDatas[t].indice === i) {
      return daysDatas[t];
    }
  }
};

function DisableHeuredate() {
  // Plage d'heure desactivée en function d'une date.
  var disable_heuredate = [];
  if (window.creneau_heures && window.creneau_heures.heuredate.length > 0) {
    disable_heuredate = window.creneau_heures.heuredate;
  }
  return disable_heuredate;
}
/**
 * Plage d'heure desactivée en function du jour
 * @depreciate.
 */
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
    window.creneau_configs.date_desactivee &&
    window.creneau_configs.date_desactivee.length
  ) {
    date_desactivee = window.creneau_configs.date_desactivee;
  }
  return date_desactivee;
}

function GetTitleApp() {
  if (window.creneau_configs && window.creneau_configs.title) {
    return window.creneau_configs.title;
  }
  return "Finaliser la commande";
}
/**
 * Permet de desactivée certains jours de la semaine.
 * (Par defaut tous les jours sont activées.)
 * ok:
 */
function JourDesactivee() {
  var jour_desactivee = [0, 6];
  if (window.creneau_configs && window.creneau_configs.days) {
    jour_desactivee = [];
    /**
     * On parcourt les jours, de 0 à 6, (dimanche à samedi);
     */
    for (var i = 0; i <= 6; i++) {
      const daysDatas = getDayData(i);
      if (daysDatas.value === 0) {
        jour_desactivee.push(i);
      }
    }
  }
  return jour_desactivee;
}
/**
 * Definie les plages d'heuress valide avec en indice le jour.
 * l'heure de debut et de fin.
 * ok:
 */
function PlageHeuresValide() {
  var results = [];
  /**
   * On parcourt les jours, de 0 à 6, (dimanche à samedi);
   */
  if (
    window.creneau_configs &&
    window.creneau_configs.days &&
    window.creneau_configs.days.length
  ) {
    for (var i = 0; i <= 6; i++) {
      const daysDatas = getDayData(i);
      results.push({ debut: daysDatas.debut, fin: daysDatas.fin });
    }
  }
  return results;
}

/**
 * definie le nombre de semaine afficher sur le calendrier.
 * ok:
 */
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
  var blocks_type_livraisons = [];
  //
  if (window.creneau_types && window.creneau_types.typelivraison) {
    blocks_type_livraisons = window.creneau_types.typelivraison;
  }
  return blocks_type_livraisons;
}
/**
 * Determine le nombre de reservation par creneaux.
 * ok:
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

function DeccalageCreneauDepart() {
  return window.creneau_configs &&
    window.creneau_configs.deccalage_creneau_depart > 0
    ? window.creneau_configs.deccalage_creneau_depart
    : 0;
}

const configApp = {
  IsProduction: IsProdEnvir(),
  appTitle: GetTitleApp(),
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
  url_get_creneau: UrlGetCreneau(),
  deccalage_creneau_depart: DeccalageCreneauDepart(),
  filters:
    window.creneau_filters && window.creneau_filters.length
      ? window.creneau_filters
      : [],
  //contient les dates desactivés due à filter.date_desactivee
  filter_date_desactivee: {},
  //contient les dates desactivés due à filter.periode_desactivee
  filter_periode_desactivee: {}
};
export default configApp;
