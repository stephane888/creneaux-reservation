import store from "../../store/index";
import { AjaxBasic } from "wbuutilities";
export default {
  show_cover: false,
  cart: null,
  creneauTypes: store.state.creneauType,
  creneauConfigs: store.state.creneauConfigs,
  /**
   * Coontient la valeur de type de livraison dans la panier.
   */
  CartTypeLivraison: "",
  /**
   * Contient la valeur courante de type de livraiosn.( valeur fournit par la configuration ).
   * ne doit pas etre vide avant la vilidation.
   * (sinitialise des le debut)
   */
  TypeLivraison: {},
  show_alert: false,
  creneauCollecte: store.state.creneauCollecte,
  creneauLivraison: store.state.creneauLivraison,
  location: store.state.location,
  alert_attribut_class: "alert-primary",
  /**
   *
   * @param {*} cents
   * @param {*} format
   * @returns
   */
  ShopifyFormatMoney(cents, format) {
    var value = "",
      placeholderRegex = /\{\{\s*(\w+)\s*\}\}/,
      formatString = format || this.money_format;
    if (typeof cents == "string") {
      cents = cents.replace(".", "");
    }
    function defaultOption(opt, def) {
      return typeof opt == "undefined" ? def : opt;
    }
    function formatWithDelimiters(number, precision, thousands, decimal) {
      precision = defaultOption(precision, 2);
      thousands = defaultOption(thousands, ",");
      decimal = defaultOption(decimal, ".");
      if (isNaN(number) || number == null) {
        return 0;
      }
      number = (number / 100.0).toFixed(precision);
      var parts = number.split("."),
        dollars = parts[0].replace(
          /(\d)(?=(\d\d\d)+(?!\d))/g,
          "$1" + thousands
        ),
        cents = parts[1] ? decimal + parts[1] : "";
      return dollars + cents;
    }
    switch (formatString.match(placeholderRegex)[1]) {
      case "amount":
        value = formatWithDelimiters(cents, 2);
        break;
      case "amount_no_decimals":
        value = formatWithDelimiters(cents, 0);
        break;
      case "amount_with_comma_separator":
        value = formatWithDelimiters(cents, 2, ".", ",");
        break;
      case "amount_no_decimals_with_comma_separator":
        value = formatWithDelimiters(cents, 0, ".", ",");
        break;
    }
    return formatString.replace(placeholderRegex, value);
  },
  addProduct: function(id_product, qte = 1) {
    this.show_cover = true;
    return new Promise((resolv, reject) => {
      this.show_cover = true;
      AjaxBasic.post("/cart/add", {
        id: id_product,
        quantity: qte
      })
        .then(resp => {
          this.show_cover = false;
          resolv(resp);
        })
        .catch(() => {
          this.show_cover = false;
          reject(false);
        });
    });
  },
  async verification() {
    store.state.alert_message = "";
    this.show_alert = false;
    //var test1 = await this.verificationTypeLivraison();
    var test2 = await this.VerificationCrenaux();
    var test3 = await this.VerificationAddress();
    var test4 = await this.ValidationMontant();
    if (test2 && test3 && test4) {
      return true;
    } else {
      this.show_alert = true;
      this.alert_attribut_class = "alert-danger ml-md-4";
      return false;
    }
  },
  async VerificationCrenaux() {
    var livraison = true;
    var collecte = true;
    if (!this.creneauCollecte.date || !this.creneauCollecte.hour) {
      collecte = false;
      store.state.alert_message +=
        "- Vous devez selectionner un creneau pour la collecte.<br />";
    }
    if (!this.creneauLivraison.date || !this.creneauLivraison.date) {
      livraison = false;
      store.state.alert_message +=
        "- Vous devez selectionner un creneau pour la livraison.<br />";
    }

    if (livraison && collecte) return true;
    else return false;
  },
  /**
   *
   * @returns
   */
  async VerificationAddress() {
    if (this.location.current_address) {
      return true;
    } else {
      store.state.alert_message +=
        " - Vous devez selectionner une adresse. <br /> ";
      return false;
    }
  },
  /**
   * Valide le montant dans le panier.
   */
  async ValidationMontant() {
    const montantMin = parseFloat(this.creneauConfigs.montant_min) * 10;
    var formatString = str => {
      var regex = /\{\{(.*?)\}\}/g;
      let found;
      var int = 0;
      while ((found = regex.exec(str)) !== null && int < 10) {
        int++;
        var attr = found[1].trim(" ");
        str = str.replace(
          found[0],
          this.creneauConfigs[attr] !== undefined
            ? this.creneauConfigs[attr]
            : "..."
        );
      }
      return str;
    };
    if (montantMin >= this.cart.total_price) {
      store.state.alert_message += formatString(
        this.creneauConfigs.text_alert_montant_min
      );
      return false;
    }
    return true;
  },
  async buildAttribut() {
    //
    var livraison = "Livraison";
    livraison += "\r\n";
    livraison +=
      "Date :" + this.creneauLivraison.date.format("DD-MM-YYYY HH:mm:ss");
    livraison += "\r\n";
    livraison +=
      "Creneau :" +
      this.creneauLivraison.hour.begin +
      " - " +
      this.creneauLivraison.hour.end;
    //
    var collecte = "Collecte";
    collecte += "\r\n";
    collecte +=
      "Date :" + this.creneauCollecte.date.format("DD-MM-YYYY HH:mm:ss");
    collecte += "\r\n";
    collecte +=
      "Creneau :" +
      this.creneauCollecte.hour.begin +
      " - " +
      this.creneauCollecte.hour.end;
    /**
     * Données pour format Zapier
     */
    var z_collecte_date = this.creneauCollecte.date.format("DD-MM-YYYY");
    var z_collecte_heure =
      this.creneauCollecte.hour.begin + " - " + this.creneauCollecte.hour.end;
    //
    var z_livraison_date = this.creneauLivraison.date.format("DD-MM-YYYY");
    var z_livraison_heure =
      this.creneauLivraison.hour.begin + " - " + this.creneauLivraison.hour.end;
    return {
      attributes: {
        localisation: this.location.current_address,
        recuperation: collecte,
        livraison: livraison,
        z_collecte_date: z_collecte_date,
        z_collecte_heure: z_collecte_heure,
        z_livraison_date: z_livraison_date,
        z_livraison_heure: z_livraison_heure
      }
    };
  },
  SaveAttributeCart(datas) {
    return new Promise((resolv, reject) => {
      this.show_cover = true;
      AjaxBasic.post("/cart/update", datas)
        .then(r => {
          this.show_cover = false;
          resolv(r);
        })
        .catch(e => {
          this.show_cover = false;
          if (AjaxBasic.isLocalDev) resolv(e);
          else reject();
        });
    });
  },
  /**
   * -
   */
  saveOnExternalServer(datas) {
    return new Promise((resolv, reject) => {
      AjaxBasic.post(
        "https://habeuk.online/shopify-api-rest/add-creneau-reserve",
        datas.attributes,
        { params: { shop: window.ShopId } }
      )
        .then(r => {
          resolv(r);
        })
        .catch(e => {
          reject();
        });
    });
  },
  triggerCheckout() {
    document.querySelector(".creneaux-mbt .cart-checkout .submit-cart").click();
    console.log(
      "verfication de la presence du bouton formulaire ",
      document.querySelector(".creneaux-mbt .cart-checkout .submit-cart")
    );
  },
  /**
   * Supprime un produit / ou supprime et ajoute un autre.( modifier la variante)
   */
  deleteUpdateProduct(id_product, new_product = null) {
    return new Promise((resolve, reject) => {
      var product = {
        updates: {}
      };
      this.show_cover = true;
      product.updates[id_product] = 0;
      AjaxBasic.post("/cart/update", product)
        .then(() => {
          if (new_product) {
            resolve(this.addProduct(new_product));
          } else {
            this.show_cover = false;
            resolve(true);
          }
        })
        .catch(() => {
          this.show_cover = false;
          reject();
        });
    });
  }
};
