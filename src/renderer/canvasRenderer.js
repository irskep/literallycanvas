"use strict";

var canvasRendererNamespace = {
  registry: {}
};


// registerCanvasRenderer('Ellipse', function(shape, ctx))
var registerCanvasRenderer = canvasRendererNamespace.registerCanvasRenderer =
  function(typeId, renderShape) {
    canvasRendererNamespace.registry[typeId] = renderShape;
  };


canvasRendererNamespace.renderShapeToCanvas = function(shape, ctx) {
  if (!canvasRendererNamespace.registry[shape.typeId]) {
    throw ("There is no renderer for " + shape.typeId)
  }
  canvasRendererNamespace.registry[shape.typeId](shape, ctx)
}

registerCanvasRenderer('Rectangle', function(shape, ctx) {
  var s = shape.attributes.style;
  var d = shape.attributes.dimensions;

  if (s.fillColor) {
    ctx.fillStyle = s.fillColor;
    ctx.fillRect(d.xmin, d.ymin, d.xmax - d.xmin, d.ymax - d.ymin);
  }

  if (s.strokeColor && s.strokeWidth) {
    ctx.lineWidth = s.strokeWidth;
    ctx.strokeStyle = s.strokeColor;
    if (s.strokeWidth % 2 == 0) {
      ctx.strokeRect(d.xmin, d.ymin, d.xmax - d.xmin, d.ymax - d.ymin);
    } else {
      // fix single-pixel offset
      ctx.strokeRect(
        d.xmin + 0.5, d.ymin + 0.5, d.xmax - d.xmin, d.ymax - d.ymin);
    }
  }
})


module.exports = canvasRendererNamespace;