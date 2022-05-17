<template>
  <div class="chartjs3-view">
    <canvas ref="canvas"></canvas>
    <div>
      <button @click="exportChartToSvg()">Exportar SVG</button>
      <button @click="handleOpenPDF()">Abrir PDF</button>
    </div>
  </div>
</template>

<script>
import { saveAs } from "file-saver";
import Chart from "chart.js/auto";
import C2S from "@/modules/export/helpers/canvas2svg-with-tweak";
import { generatePDF } from "@/modules/pdf-generator/helpers/pdf-generator";

const data = {
  labels: [0, 1, 2, 3, 4],
  datasets: [
    {
      label: "Dataset 1",
      data: [10, 11, 12, 13, 14],
      backgroundColor: "#FF0000",
    },
    {
      label: "Dataset 2",
      data: [20, 21, 22, 23, 24],
      backgroundColor: "#0000FF",
    },
    {
      label: "Dataset 3",
      data: [30, 31, 32, 33, 34],
      backgroundColor: "#00FF00",
    },
  ],
};

/** @type {import('chart.js').ChartConfiguration} */
const config = {
  type: "bar",
  data: data,
  options: {
    plugins: {
      title: {
        display: true,
        text: "Chart.js Bar Chart - Stacked",
      },
    },
    // desablitar maintainAspectRatio permite criar gráficos de qualquer tamanho.
    // maintainAspectRatio: false,
    // desabilitar responsive e animations faz o canvas2svg funcionar.
    responsive: false,
    animation: false,

    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  },
};

export default {
  name: "Chartjs3View",

  data: () => ({
    // Técnica para o vue não deixar o objeto reativo
    chart: Object.freeze({ chart: null }),
  }),

  mounted() {
    this.run();
  },

  methods: {
    run() {
      // set the output dimensions (helpful especially for PNG)
      const width = 300;
      const height = 200;

      // set the chart's size based on the values we set at the top
      /** @type {{canvas: HTMLCanvasElement}} */
      const { canvas } = this.$refs;
      canvas.width = width;
      canvas.height = height;

      // create the chart
      const chart = new Chart(canvas, config);
      this.chart = Object.freeze({ chart });

      console.debug({ chart });
    },

    async handleOpenPDF() {
      // TODO: refatorar
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

      /** @type {{canvas: HTMLCanvasElement}} */
      const { canvas } = this.$refs;
      const chartCanvas = canvas;
      const svgContext = new C2S(chartCanvas.offsetWidth, chartCanvas.offsetHeight);
      new Chart(svgContext, config);
      const mySerializedSVG = svgContext.getSerializedSvg();
      const svg = svgContext.getSvg();
      console.debug({ mySerializedSVG, svg });

      const blob = await generatePDF(mySerializedSVG);
      window.open(URL.createObjectURL(blob), "_blank");
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

      console.debug({ C2S });

      /** @type {{canvas: HTMLCanvasElement}} */
      const { canvas } = this.$refs;
      const chartCanvas = canvas;

      // get the dimensions of our original chart
      // create an svg version of the chart
      const svgContext = new C2S(chartCanvas.offsetWidth, chartCanvas.offsetHeight);

      console.debug({ svgContext });

      const svgChart = new Chart(svgContext, config);

      console.debug({ svgChart });

      //serialize your SVG
      const mySerializedSVG = svgContext.getSerializedSvg(); //true here, if you need to convert named to numbered entities.
      //If you really need to you can access the shadow inline SVG created by calling:
      const svg = svgContext.getSvg();
      console.debug({ mySerializedSVG, svg });

      const filename = "mySerializedSVG.svg";
      const blob = new Blob([mySerializedSVG], { type: "image/svg+xml" });
      saveAs(blob, filename);
    },
  },
};
</script>

<style lang="scss" scoped>
.chartjs3-view {
  width: 90%;
  margin: 2em auto 0 auto;
}

canvas {
  display: block;
}
</style>
