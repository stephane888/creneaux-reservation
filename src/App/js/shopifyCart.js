import defaultOptions from "./defaultOptions";
import { AjaxBasic } from "wbuutilities";
import store from "../../store";
AjaxBasic.TestDomain = "http://habeuk.kksa";

export default {
  ...defaultOptions,
  /**
   *
   * @param {*} prefertCartProductLivraison
   */
  async initcreneau(prefertCartProductLivraison) {
    //on modifie les html
    this.HideStaticLoading();
    // On charge la panier.
    var status_cart = await this.loadcart();
    if (status_cart) {
      await this.getProductType();
      /**
       * Si les deux id sont different cela peut traduire que l'utilisateur a precedamant fait * une autre selection.
       * Bref : on concerve la valeur presente dans la panier.
       */
      if (this.TypeLivraison) {
        if (
          this.CartTypeLivraison &&
          this.CartTypeLivraison.id &&
          this.CartTypeLivraison.id !== this.TypeLivraison.id
        ) {
          // si le produit qui est dans la panier est different de celui qui est selectionné, et que nous sommes à l'initialisation,
          // on garde la valeur dans le panier.
          if (prefertCartProductLivraison)
            this.apply_type_livraison_by_id(this.CartTypeLivraison.id);
          // si non, on retire le produit qui est dans le panier et on applique le nouveau.
          await this.deleteUpdateProduct(
            this.CartTypeLivraison.id,
            this.TypeLivraison.id
          );
          // on met à jour le panier.
          await this.loadcart();
        }
        // si le panier ne contient pas de produit de livraison.
        else if (this.TypeLivraison && !this.CartTypeLivraison.id) {
          await this.addDefaultProductTypeLivraison();
        }
        // on ecoute l'evenement
        this.setEvant();
      }
    }
  },
  HideStaticLoading() {
    //$(".londing-cover.static").fadeOut(600);
  },
  /**
   * Charge le panier.
   * Retourne true si la requte est terminée avec succes et false si non.
   */
  loadcart() {
    return new Promise((resolve, reject) => {
      this.show_cover = true;
      AjaxBasic.get("/cart.js")
        .then(cart => {
          console.log("Panier textStatus : ", cart);
          this.show_cover = false;
          this.cart = cart.data;
          resolve(true);
        })
        .catch(() => {
          if (AjaxBasic.isLocalDev) resolve(false);
          else reject();
        });
    });
  },

  /**
   * Permet de comparer le type de livraison dans le panier et celui en affichage.
   * Retourne  le product (type de livraison) actuelement present dans le panier.
   * @return l'object (type de livraison) ou false, si cest vide.
   */
  async getProductType() {
    if (this.cart && this.cart.item_count > 0) {
      const typeLivraisonIds = this.typeLivraisonIds();
      for (const i in this.cart.items) {
        var product = this.cart.items[i];
        if (typeLivraisonIds.includes(product.id)) {
          this.CartTypeLivraison = product;
          return product;
        }
      }
    } else {
      return false;
    }
  },
  typeLivraisonIds() {
    var ids = [];
    this.creneauTypes.forEach(type => {
      ids.push(type.id);
    });
    return ids;
  },
  /**
   * Applique un type de livraison.
   * Ce type de livraison est fournit par le panier.(produit precedament selectionne par le client )
   */
  apply_type_livraison_by_id(id) {
    for (const i in this.creneauTypes) {
      if (id == this.creneauTypes[i].id) {
        store.dispatch("SelectTypeTab", parseInt(i));
      }
    }
  },
  /**
   * Ajoute le produit permettant de definir le mode de livraiosn,
   * s"execute si le mode de livraiosn n'est pas definit.
   */
  async addDefaultProductTypeLivraison() {
    await this.addProduct(this.TypeLivraison.id);
    await this.loadcart();
    //await this.getProductType();
  },
  /**
   * Permet à un programme externe/interne d'execute le processus de sauvegarde.
   */
  setEvant() {
    document.addEventListener("SaveCreneauxChechout", () => {
      this.SaveCreneau(elem);
    });
  },
  /**
   * Processus de sauvegarde.
   */
  async SaveCreneau(elem = null) {
    var test = await this.verification();
    if (test) {
      var attribut = await this.buildAttribut();
      await this.SaveAttributeCart(attribut);
      //on verifie que le panier est ok.
      await this.loadcart();
      if (
        (this.cart && this.cart.attributes && this.cart.attributes.livraison) ||
        !this.app_env_prod
      ) {
        //$(".cart-checkout .loadding", elem.target).removeClass("fa-spin");
        console.log("elem.target : ", elem.target);
        alert("triggerCheckout");
        this.triggerCheckout();
      } else {
        this.show_alert = true;
        this.alert_attribut_class = "alert-danger ml-md-4";
        this.alert_message +=
          '- Une erreur s"est produite lors de la sauvegarde de vos informations. <br /> Verifier votre connexion et actualiser la page <br />';
        return false;
      }
    } else {
      if (elem && elem.target) {
        alert("error");
        // $(".cart-checkout .submit-cart-test", elem.target).addClass(
        //   "bg-danger"
        // );
        // $(".cart-checkout .loadding", elem.target).removeClass("fa-spin");
      }
    }
  }
};
