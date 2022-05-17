<template>
  <div class="wrapper">
    <canvas ref="canvas"></canvas>
    <button @click="run()">Run</button>
    <button @click="exportChartToSvg()">exportChartToSvg</button>
  </div>
</template>

<script>
// import Swal from "sweetalert2";
import { saveAs } from "file-saver";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Chart from "chart.js";
// import C2S from "canvas2svg";
// import { tweakLib } from "@/modules/export/helpers/chartjs-to-svg";

/*
 * Como o canvas2svg no npm está na versão `canvas2svg 1.0.16`
 * Precisei instalar globalmente o `Canvas 2 Svg v1.0.19`
 * https://github.com/gliffy/canvas2svg/blob/eaab317a36a57421711a297d996bc80318185e44/canvas2svg.js
 TODO: Criar modulo com código fonte
  */
const C2S = window.C2S;

console.debug({ C2S });

function tweakLib() {
  C2S.prototype.getContext = function (contextId) {
    if (contextId === "2d" || contextId === "2D") {
      return this;
    }
    return null;
  };
  C2S.prototype.style = function () {
    return this.__canvas.style;
  };
  C2S.prototype.getAttribute = function (name) {
    return this[name];
  };
  C2S.prototype.addEventListener = function (/*type, listener, eventListenerOptions*/) {
    // nothing to do here, but we need this function :)
  };
}

tweakLib();

// https://stackoverflow.com/questions/46856550/pdfmake-roboto-regular-ttf-not-found-in-virtual-file-system-only-after-gulp
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// FIXME
// (scroll down for more details...)
let data = [585, 660, 710, 978, 1650, 6127, 8549, 10152, 10875];
let labels = [1500, 1600, 1700, 1800, 1900, 2000, 2030, 2060, 2100];
let title = "World Population (in millions)";
let options = {
  type: "bar",
  data: {
    labels: labels,
    datasets: [
      {
        backgroundColor: "rgb(255,150,0)",
        barPercentage: 1.0,
        data: data,
        label: "Population (in millions)",
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: title,
    },
    legend: {
      display: false,
    },

    // these need to be set to false
    // for export!
    animation: false,
    responsive: false,
  },
};

export default {
  name: "HomeView",

  data: () => ({
    chart: Object.freeze({ chart: null }),
  }),

  mounted() {},

  methods: {
    run() {
      // set the output dimensions (helpful
      // especially for PNG)
      let width = 900;
      let height = 600;

      // set the chart's size based on the
      // values we set at the top
      /** @type {{canvas: HTMLCanvasElement}} */
      const { canvas } = this.$refs;
      let context = canvas;
      context.width = width;
      context.height = height;

      // create the chart
      let chart = new Chart(canvas, options);
      this.chart = Object.freeze({ chart });

      // and generate the PNG and SVG links!
      // (the code that does this is in the 'libs'
      // folder > export.js)

      // arguments: filename, link text, chart we created
      // createPngLink("chart.png", "Export PNG, ", chart);

      // arguments: filename, link text, the chart, and its settings
      // createSvgLink("chart.svg", "SVG", chart, options);

      console.debug({ chart });
    },

    exportChartToSvg() {
      const { chart } = this.chart;
      console.debug({ chart });
      if (chart.options.animation !== false) {
        console.warn(
          'Cannot create SVG: "animation" is not set to false (see the options section)'
        );
        return;
      }
      if (chart.options.responsive !== false) {
        console.warn(
          'Cannot create SVG: "responsive" is not set to false (see the options section)'
        );
        return;
      }

      // tweakLib(C2S);
      console.debug({ C2S });

      // get the dimensions of our original chart
      /** @type {{canvas: HTMLCanvasElement}} */
      const { canvas } = this.$refs;
      let chartCanvas = canvas;
      let width = chartCanvas.offsetWidth;
      let height = chartCanvas.offsetHeight;

      // create an svg version of the chart
      let svgContext = new C2S(width, height);
      console.debug({ svgContext });
      let chartSettings = options;

      console.debug({ chartSettings });
      let svgChart = new Chart(svgContext, chartSettings);

      console.debug({ svgChart });

      //serialize your SVG
      const mySerializedSVG = svgContext.getSerializedSvg(); //true here, if you need to convert named to numbered entities.
      //If you really need to you can access the shadow inline SVG created by calling:
      const svg = svgContext.getSvg();
      console.debug({ mySerializedSVG, svg });

      //https://stackoverflow.com/questions/45563420/exporting-chart-js-charts-to-svg-using-canvas2svg-js

      // create download link
      // let link = document.createElement("a");
      // link.href = "data:image/svg+xml;utf8," + encodeURIComponent(svgContext.getSerializedSvg());
      // link.download = filename;
      // link.text = linkText;

      const filename = "mySerializedSVG.svg";
      const blob = new Blob([mySerializedSVG], { type: "image/svg+xml" });
      saveAs(blob, filename);

      // // add link to the page
      // document.getElementById("wrapper").appendChild(link);
    },
  },
};
</script>

<style lang="scss" scoped>
canvas {
  display: block;
}

.wrapper {
  width: 90%;
  margin: 2em auto 0 auto;
}
</style>
