"use strict";

// callback = function(div, ctx)
var withCanvas = function(w, h, heading, desc, callback) {
  var div = document.createElement('div');
  div.className = 'canvas-test';
  div.innerHTML = '<h2>' + heading + '</h2>' + desc;

  var canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  canvas.style.width = w;
  canvas.style.height = h;

  div.appendChild(canvas);
  document.body.appendChild(div);

  var ctx = canvas.getContext('2d');
  callback(ctx);
}


var renderShapes = function(w, h, label, shapes) {
  var desc = '<pre>' + shapes.map(function(s) {
    return JSON.stringify(s, null, 2);
  }).join('\n') + '</pre>';
  withCanvas(w, h, label, desc, function(ctx) {
    for (var i in shapes) {
      LC.renderer.canvasRenderer.renderShapeToCanvas(shapes[i], ctx);
    }
  });
}


renderShapes(120, 120, 'Basic rect', [
  LC.shape.createShape(
    'Rectangle', {
      dimensions: {xmin: 10, ymin: 10, xmax: 110, ymax: 110},
      style: {strokeColor: 'black', strokeWidth: 1, fillColor: 'red'}
    })
]);
