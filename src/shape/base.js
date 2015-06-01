"use strict";

var shapeNamespace = {
  registry: {}
};


let s4 = function() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}
let getGUID = function() {
  return (s4() + s4() + '-' +
      s4() + '-' +
      s4() + '-' +
      s4() + '-' +
      s4() + s4() + s4());
}

let Shape = shapeNamespace.Shape = class Shape {
  constructor(typeId, attributes, id) {
    if (!typeId || !id || !attributes) {
      throw "Shapes must be initialized with attributes.";
    }
    this.typeId = typeId;
    this.id = id;
    this.attributes = attributes;
  }
}


let registerShape = shapeNamespace.registerShape = function(typeId, cls) {
  shapeNamespace.registry[typeId] = cls;
};


let createShape = shapeNamespace.createShape = function(typeId, attributes, id) {
  if (!shapeNamespace.registry[typeId]) {
    throw ("There is no shape type " + typeId)
  }
  if (!id) id = getGUID();
  return new shapeNamespace.registry[typeId](typeId, attributes, id)
};


/*
{
  dimensions: {xmin, xmax, ymin, ymax},
  style: {strokeColor, strokeWidth, fillColor}
}
*/
registerShape('Rectangle', class Rectangle extends Shape { });

/*
{
{
  dimensions: {xmin, xmax, ymin, ymax},
  style: {strokeColor, strokeWidth, fillColor}
}
*/
registerShape('Ellipse', class Ellipse extends Shape {});

/*
{
  program: [  // list of values of one of these types:
    [x, y]
    {(strokeColor: 'black')?, (strokeWidth: 5)?}
  ]
  cap1: {style: 'round', shape: null or shape, offset: amount}
  cap2: {style: 'round', shape: null or shape, offset: amount}
  dash: null
}
*/
registerShape('Path', class Path extends Shape {});

/*
{
  program: [          // list of values of one of these types:
    [x, y]
    {(strokeColor: 'black')?, (strokeWidth: 5)?}
  ]
  smoothedProgram: [  // like program, but points smoothed
  ]
  cap1: {style: 'round', shape: null or shape, offset: amount}
  cap2: {style: 'round', shape: null or shape, offset: amount}
  dash: null
}
*/
registerShape('SmoothedPath', class SmoothedPath extends Shape {});

/*
{
  program: [          // list of values of one of these types:
    [cpBackwardX, cpBackwardY, x, y, cpForwardX, cpForwardY]
    {(strokeColor: 'black')?, (strokeWidth: 5)?}
  ]
  cap1: {style: 'round', shape: null or shape, offset: amount}
  cap2: {style: 'round', shape: null or shape, offset: amount}
  dash: null
}
*/
registerShape('Bezier', class Bezier extends Shape {});


module.exports = shapeNamespace;