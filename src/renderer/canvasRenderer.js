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
});


registerCanvasRenderer('Ellipse', function(shape, ctx) {
  var s = shape.attributes.style;
  var d = shape.attributes.dimensions;

  var width = d.xmax - d.xmin;
  var height = d.ymax - d.ymin;

  ctx.save();
  var halfWidth = Math.floor(width / 2);
  var halfHeight = Math.floor(height / 2);
  var centerX = (d.xmax + d.xmin) / 2;
  var centerY = (d.ymax + d.ymin) / 2;

  ctx.translate(centerX, centerY);
  ctx.scale(1, Math.abs(height / width));
  ctx.beginPath();
  ctx.arc(0, 0, Math.abs(halfWidth), 0, Math.PI * 2);
  ctx.closePath();
  ctx.restore();

  if (s.fillColor) {
    ctx.fillStyle = s.fillColor;
    ctx.fill();
  }

  if (s.strokeColor && s.strokeWidth) {
    ctx.lineWidth = s.strokeWidth;
    ctx.strokeStyle = s.strokeColor;
    ctx.stroke();
  }
});


module.exports = canvasRendererNamespace;