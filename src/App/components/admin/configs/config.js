import { AjaxToastBootStrap } from 'wbuutilities'
AjaxToastBootStrap.TestDomain = 'http://habeuk.kksa'
export default {
  ...AjaxToastBootStrap,
  apiVersion: '2021-07',
  namespace: 'wbu_myl_creneaux',
  SfPost (token, datas, param = {}) {
    return this.post(
      '/shopify-api-rest/request/save-' + token + window.location.search,
      {
        endPoint: this.buildEndPoint(param) + token + '.json',
        [token]: datas
      }
    )
  },
  /**
   * Load data from shopify
   * @param {*} token
   * @param {*} param
   * @returns
   */
  SfGet (token, param = {}) {
    return this.post(
      '/shopify-api-rest/request/load-' + token + window.location.search,
      {
        endPoint: this.buildEndPoint(param) + token + '.json'
      }
    )
  },
  /**
   *
   * @param {*} key
   * @param {*} value
   * @param {*} value_type
   * @returns
   */
  AddMetafield (key, value, value_type = 'json_string') {
    return {
      namespace: this.namespace,
      key: key,
      value: value,
      value_type: value_type
    }
  },
  buildEndPoint (param) {
    let endPoint = '/admin/api/' + this.apiVersion + '/'
    if (param.entity && param.entityId) {
      endPoint += param.entity + '/'
      endPoint += param.entityId + '/'
    } else if (param.entityId) {
      endPoint += param.entityId + '/'
    }
    return endPoint
  }
}
