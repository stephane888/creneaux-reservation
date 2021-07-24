<script>
export default {
  name: "HelloWorld",
  render: function (createElement) {
    var el = createElement;
    var val = [
      el(
        "h2",
        { style: { background: "light", fontSize: "2rem" } },
        "je le sais"
      ),

      el("span", { style: { color: "olive", fontSize: "3rem" } }, [
        el(
          "div",
          {
            style: {
              padding: "20px",
              "margin-bottom": "100px",
              color: "pink",
              background: "#39f",
            },
          },
          "somme text to do"
        ),
        el(
          "strong",
          {
            style: {
              display: "block",
              padding: "10px",
              color: "green",
              background: "olive",
            },
          },
          "somme text to do"
        ),
      ]),
    ];
    return el("div", val);
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
