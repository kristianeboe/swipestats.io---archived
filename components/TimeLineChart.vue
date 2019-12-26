<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ["chartData", "options"],
  data() {
    return {
      defaultOptions: {
        fill: false,
        maintainAspectRatio: false,
        responsive: true
      }
    };
  },
  methods: {
    formatNumber(num) {
      let numString = Math.round(num).toString();
      let numberFormatMapping = [[6, "m"], [3, "k"]];
      for (let [numberOfDigits, replacement] of numberFormatMapping) {
        if (numString.length > numberOfDigits) {
          let decimal = "";
          if (numString[numString.length - numberOfDigits] !== "0") {
            decimal = "." + numString[numString.length - numberOfDigits];
          }
          numString =
            numString.substr(0, numString.length - numberOfDigits) +
            decimal +
            replacement;
          break;
        }
      }
      return numString;
    }
  },
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, {
      ...this.defaultOptions,
      ...this.options,
      responsive: true,
      maintainAspectRatio: false
    });
  }
};
</script>

<style>
</style>