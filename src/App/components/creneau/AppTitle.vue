<script>
import { mapState } from "vuex";

export default {
  name: "AppTitle",
  computed: {
    ...mapState(["creneauConfigs"]),
  },
  render(createElement) {
    const elt = createElement;
    const content = this.creneauConfigs.title;
    const attr = {
      class: {
        "text-left": true,
        "font-weight-bold": true,
      },
    };
    const titre = [elt("h1", attr, content)];
    return elt("div", titre);
  },
};
</script>
