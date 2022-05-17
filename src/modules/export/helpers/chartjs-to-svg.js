// some tweaks to the canvas2svg library are required for this to work
// via: https://stackoverflow.com/questions/62249315/export-canvas-to-svg-file
function tweakLib(C2S) {
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

export { tweakLib };
