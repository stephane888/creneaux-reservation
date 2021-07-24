<script>
import { mapState } from "vuex";

export default {
  name: "AppTitle",
  render: function(createElement) {
    let elt = createElement;
    var content = this.creneauConfigs.title;
    var attr = {
      class: {
        "text-left": true,
        "font-weight-bold": true
      }
    };
    var titre = [elt("h1", attr, content)];
    return elt("div", titre);
  },
  computed: {
    ...mapState(["creneauConfigs"])
  }
};
</script>
