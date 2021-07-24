import { AjaxToastBootStrap as axios } from "wbuutilities";

export default {
  // baseUrl: "http://gestion-tache-new.kksa",
  ModeDebug: true,
  post: function(request, datas = {}) {
    return new Promise(resolv => {
      var configs = {
        headers: {}
      };
      axios
        .post(request + "?" + this.GetQuery(), datas, configs)
        .then(reponse => {
          console.log("Config success : ", reponse);
          resolv({ status: true, data: reponse.data, reponse: reponse });
        })
        .catch(error => {
          resolv({ status: false, error: error.response });
        });
    });
  },
  /**
   * @param datas Array
   */
  saveMetaFields: function(
    datas,
    namespace = "wbu_creneaux",
    endPoint = "/admin/metafields.json"
  ) {
    var metafields = [];
    datas.forEach(item => {
      metafields.push({
        namespace: namespace,
        key: item.key,
        value: item.value,
        value_type: item.value_type
      });
    });
    this.post("/app/creneaux/shopify/request/SaveMetafields", {
      endPoint: endPoint,
      metafields: metafields
    });
  },
  get: function(request) {
    console.log("ssss");
    return new Promise(resolv => {
      var configs = {
        headers: {}
      };
      axios
        .get(request, configs)
        .then(reponse => {
          console.log("Config get success : ", reponse);
          resolv({ status: true, data: reponse.data, reponse: reponse });
        })
        .catch(error => {
          resolv({ status: false, error: error.response });
        });
    });
  },
  GetQuery: function() {
    var string = window.location.search;
    var stringA = string.split("?");
    if (stringA[1]) {
      return stringA[1];
    } else {
      return "";
    }
  },
  SaveConfigsTest: function(datas) {
    return axios.post(
      "/creneaux-shopify/test-config?" + this.GetQuery(),
      datas
    );
  }
};
