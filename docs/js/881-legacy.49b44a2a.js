"use strict";(self["webpackChunkcolors_to_color_palette"]=self["webpackChunkcolors_to_color_palette"]||[]).push([[881],{9773:function(e,t,n){n.r(t),n.d(t,{default:function(){return y}});var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"chartjs3-view"},[n("canvas",{ref:"canvas"}),n("div",[n("button",{on:{click:function(t){return e.exportChartToSvg()}}},[e._v("Exportar SVG")]),n("button",{on:{click:function(t){return e.handleOpenPDF()}}},[e._v("Abrir PDF")])])])},r=[];n(1539);function a(e,t,n,o,r,a,i){try{var s=e[a](i),c=s.value}catch(u){return void n(u)}s.done?t(c):Promise.resolve(c).then(o,r)}function i(e){return function(){var t=this,n=arguments;return new Promise((function(o,r){var i=e.apply(t,n);function s(e){a(i,o,r,s,c,"next",e)}function c(e){a(i,o,r,s,c,"throw",e)}s(void 0)}))}}n(8975),n(3371),n(8783),n(3948),n(285),n(1637);var s=n(3706),c=n(7368),u=n(6607),l=(n(9714),n(9139)),g=n.n(l),h=n(4573),f=n.p+"img/img-png.c978c711.png",d=n.p+"img/img-jpg.e0e0bc85.jpg",v=n.p+"img/img-svg.88c83663.svg";function p(e){return m.apply(this,arguments)}function m(){return m=i(regeneratorRuntime.mark((function e(t){var n,o,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch(v);case 2:return e.next=4,e.sent.text();case 4:return n=e.sent,o={info:{title:"Criando PDF com gráficos SVG.",author:"guilhermerodrigues680",subject:"Criando PDF com gráficos SVG usando PDFMake, Chart.js v3 e canvas2svg. Esse projeto é apenas uma prova de conceito.",creator:"github.com/guilhermerodrigues680/pdfmake-with-chart"},content:[{columns:[{image:"img1",width:"*",fit:[80,80],alignment:"left"},{svg:n,width:"*",fit:[50,50],alignment:"right",margin:[0,15,0,0]}]},{margin:[0,64,0,32],columns:[{text:"Multiple styles applied",fontSize:35,bold:!0,color:"#4297FA",width:"*"},{image:"img2",fit:[226,180],width:"*",alignment:"right"}]},"SVG nodes behave similar to images by supporting width/height or fit","It is however not yet possible to use svg files or to have a library of svgs in the document definition","\n","Note that before you can use SVG nodes you must install svg-to-pdfkit as it is not included with pdfmake to keep bundle size down",{text:"You can also fit the svg inside a rectangle",pageBreak:"after"},"Gráfico SVG",{svg:t,fit:[300,300],absolutePosition:{x:0,y:420.945}}],images:{img1:new URL(d,window.location).toString(),img2:new URL(f,window.location).toString()}},r=g().createPdf(o),e.abrupt("return",new Promise((function(e){return r.getBlob((function(t){return e(t)}))})));case 8:case"end":return e.stop()}}),e)}))),m.apply(this,arguments)}g().vfs=h.I.vfs;var b={labels:[0,1,2,3,4],datasets:[{label:"Dataset 1",data:[10,11,12,13,14],backgroundColor:"#FF0000"},{label:"Dataset 2",data:[20,21,22,23,24],backgroundColor:"#0000FF"},{label:"Dataset 3",data:[30,31,32,33,34],backgroundColor:"#00FF00"}]},w={type:"bar",data:b,options:{plugins:{title:{display:!0,text:"Chart.js Bar Chart - Stacked"}},responsive:!1,animation:!1,scales:{x:{stacked:!0},y:{stacked:!0}}}},S={name:"Chartjs3View",data:function(){return{chart:Object.freeze({chart:null})}},mounted:function(){this.run()},methods:{run:function(){var e=300,t=200,n=this.$refs.canvas;n.width=e,n.height=t;var o=new c.Z(n,w);this.chart=Object.freeze({chart:o}),console.debug({chart:o})},handleOpenPDF:function(){var e=this;return i(regeneratorRuntime.mark((function t(){var n,o,r,a,i,s,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n=e.chart.chart,console.debug({chart:n}),!1===n.options.animation){t.next=5;break}return console.warn('Cannot create SVG: "animation" is not set to false (see the options section)'),t.abrupt("return");case 5:if(!1===n.options.responsive){t.next=8;break}return console.warn('Cannot create SVG: "responsive" is not set to false (see the options section)'),t.abrupt("return");case 8:return o=e.$refs.canvas,r=o,a=new u.Z(r.offsetWidth,r.offsetHeight),new c.Z(a,w),i=a.getSerializedSvg(),s=a.getSvg(),console.debug({mySerializedSVG:i,svg:s}),t.next=17,p(i);case 17:l=t.sent,window.open(URL.createObjectURL(l),"_blank");case 19:case"end":return t.stop()}}),t)})))()},exportChartToSvg:function(){var e=this.chart.chart;if(console.debug({chart:e}),!1===e.options.animation)if(!1===e.options.responsive){console.debug({C2S:u.Z});var t=this.$refs.canvas,n=t,o=new u.Z(n.offsetWidth,n.offsetHeight);console.debug({svgContext:o});var r=new c.Z(o,w);console.debug({svgChart:r});var a=o.getSerializedSvg(),i=o.getSvg();console.debug({mySerializedSVG:a,svg:i});var l="mySerializedSVG.svg",g=new Blob([a],{type:"image/svg+xml"});(0,s.saveAs)(g,l)}else console.warn('Cannot create SVG: "responsive" is not set to false (see the options section)');else console.warn('Cannot create SVG: "animation" is not set to false (see the options section)')}}},k=S,C=n(3736),x=(0,C.Z)(k,o,r,!1,null,"98382e9e",null),y=x.exports}}]);
//# sourceMappingURL=881-legacy.49b44a2a.js.map