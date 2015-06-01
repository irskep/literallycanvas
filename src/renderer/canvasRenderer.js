"use strict";

var canvasRendererNamespace = {
  registry: {}
};


// registerCanvasRenderer('Ellipse', function(shape, ctx))
let registerCanvasRenderer = canvasRendererNamespace.registerCanvasRenderer =
  function(typeId, renderShape) {
    canvasRendererNamespace.registry[typeId] = renderShape;
  };


canvasRendererNamespace.renderShapeToCanvas = function(shape, ctx) {
  if (!canvasRendererNamespace.registry[typeId]) {
    throw ("There is no renderer for " + typeId)
  }
  canvasRendererNamespace.registry[typeId](shape, ctx)
}


module.exports = canvasRendererNamespace;