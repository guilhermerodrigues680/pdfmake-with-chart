import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Importa src das imagens no assets
import srcPngImg from "@/assets/images/img-png.png";
import srcJpgImg from "@/assets/images/img-jpg.jpg";
import srcSvgImg from "@/assets/images/img-svg.svg";

// https://stackoverflow.com/questions/46856550/pdfmake-roboto-regular-ttf-not-found-in-virtual-file-system-only-after-gulp
pdfMake.vfs = pdfFonts.pdfMake.vfs;

async function generatePDF(svgChart) {
  const srcSvgImgTxt = await (await fetch(srcSvgImg)).text();

  const docDefinition = {
    info: {
      title: "Criando PDF com gráficos SVG.",
      author: "guilhermerodrigues680",
      subject:
        "Criando PDF com gráficos SVG usando PDFMake, Chart.js v3 e canvas2svg. Esse projeto é apenas uma prova de conceito.",
      creator: "github.com/guilhermerodrigues680/pdfmake-with-chart",
    },
    // pageSize: {
    //   width: canvas.width,
    //   height: "auto",
    // },
    // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
    // pageMargins: [0, 0, 0, 0],
    content: [
      {
        columns: [
          {
            image: "img1",
            width: "*",
            fit: [80, 80],
            alignment: "left",
          },
          {
            svg: srcSvgImgTxt,
            width: "*",
            fit: [50, 50],
            alignment: "right",
            margin: [0, 15, 0, 0],
          },
        ],
      },
      {
        margin: [0, 64, 0, 32],
        columns: [
          {
            text: "Multiple styles applied",
            fontSize: 35,
            bold: true,
            color: "#4297FA",
            width: "*",
          },
          {
            image: "img2",
            fit: [226, 180],
            width: "*",
            alignment: "right",
          },
        ],
      },
      "SVG nodes behave similar to images by supporting width/height or fit",
      "It is however not yet possible to use svg files or to have a library of svgs in the document definition",
      "\n",
      "Note that before you can use SVG nodes you must install svg-to-pdfkit as it is not included with pdfmake to keep bundle size down",
      {
        text: "You can also fit the svg inside a rectangle",
        pageBreak: "after",
      },
      "Gráfico SVG",
      // {
      //   svg: svgChart,
      //   fit: [300, 300],
      // },
      // // https://github.com/bpampuch/pdfmake/blob/master/src/standardPageSizes.js
      // {
      //   text: "text 3",
      //   absolutePosition: { x: 595.28 / 2, y: 841.89 / 2 },
      // },
      {
        svg: svgChart,
        fit: [300, 300],
        absolutePosition: { x: 0, y: 841.89 / 2 },
      },
    ],

    images: {
      img1: new URL(srcJpgImg, window.location).toString(),
      img2: new URL(srcPngImg, window.location).toString(),
    },

    // styles: {
    //   rightme: {
    //     alignment: "right",
    //   },
    // },
  };

  const pdfDoc = pdfMake.createPdf(docDefinition);

  return new Promise((resolve) => pdfDoc.getBlob((blob) => resolve(blob)));
}

export { generatePDF };
