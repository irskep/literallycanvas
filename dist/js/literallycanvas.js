(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.LC = {
  shape: require("./shape/base"),
  renderer: {
    canvasRenderer: require("./renderer/canvasRenderer")
  }
}

},{"./renderer/canvasRenderer":2,"./shape/base":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvc3RldmUvZGV2L2xpdGVyYWxseWNhbnZhcy9zcmMvaW5kZXguanN4IiwiL1VzZXJzL3N0ZXZlL2Rldi9saXRlcmFsbHljYW52YXMvc3JjL3JlbmRlcmVyL2NhbnZhc1JlbmRlcmVyLmpzIiwiL1VzZXJzL3N0ZXZlL2Rldi9saXRlcmFsbHljYW52YXMvc3JjL3NoYXBlL2Jhc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxNQUFNLENBQUMsRUFBRSxHQUFHO0VBQ1YsS0FBSyxFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUM7RUFDOUIsUUFBUSxFQUFFO0lBQ1IsY0FBYyxFQUFFLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQztHQUNyRDs7OztBQ0pILFlBQVksQ0FBQzs7QUFFYixJQUFJLHVCQUF1QixHQUFHO0VBQzVCLFFBQVEsRUFBRSxFQUFFO0FBQ2QsQ0FBQyxDQUFDO0FBQ0Y7O0FBRUEsMERBQTBEO0FBQzFELElBQUksc0JBQXNCLEdBQUcsdUJBQXVCLENBQUMsc0JBQXNCO0VBQ3pFLFNBQVMsTUFBTSxFQUFFLFdBQVcsRUFBRTtJQUM1Qix1QkFBdUIsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsV0FBVyxDQUFDO0FBQzNELEdBQUcsQ0FBQztBQUNKOztBQUVBLHVCQUF1QixDQUFDLG1CQUFtQixHQUFHLFNBQVMsS0FBSyxFQUFFLEdBQUcsRUFBRTtFQUNqRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO0lBQzdDLE9BQU8sMkJBQTJCLEdBQUcsTUFBTSxDQUFDO0dBQzdDO0VBQ0QsdUJBQXVCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7QUFDdEQsQ0FBQztBQUNEOztBQUVBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsdUJB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IjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwid2luZG93LkxDID0ge1xuICBzaGFwZTogcmVxdWlyZShcIi4vc2hhcGUvYmFzZVwiKSxcbiAgcmVuZGVyZXI6IHtcbiAgICBjYW52YXNSZW5kZXJlcjogcmVxdWlyZShcIi4vcmVuZGVyZXIvY2FudmFzUmVuZGVyZXJcIilcbiAgfVxufSIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgY2FudmFzUmVuZGVyZXJOYW1lc3BhY2UgPSB7XG4gIHJlZ2lzdHJ5OiB7fVxufTtcblxuXG4vLyByZWdpc3RlckNhbnZhc1JlbmRlcmVyKCdFbGxpcHNlJywgZnVuY3Rpb24oc2hhcGUsIGN0eCkpXG5sZXQgcmVnaXN0ZXJDYW52YXNSZW5kZXJlciA9IGNhbnZhc1JlbmRlcmVyTmFtZXNwYWNlLnJlZ2lzdGVyQ2FudmFzUmVuZGVyZXIgPVxuICBmdW5jdGlvbih0eXBlSWQsIHJlbmRlclNoYXBlKSB7XG4gICAgY2FudmFzUmVuZGVyZXJOYW1lc3BhY2UucmVnaXN0cnlbdHlwZUlkXSA9IHJlbmRlclNoYXBlO1xuICB9O1xuXG5cbmNhbnZhc1JlbmRlcmVyTmFtZXNwYWNlLnJlbmRlclNoYXBlVG9DYW52YXMgPSBmdW5jdGlvbihzaGFwZSwgY3R4KSB7XG4gIGlmICghY2FudmFzUmVuZGVyZXJOYW1lc3BhY2UucmVnaXN0cnlbdHlwZUlkXSkge1xuICAgIHRocm93IChcIlRoZXJlIGlzIG5vIHJlbmRlcmVyIGZvciBcIiArIHR5cGVJZClcbiAgfVxuICBjYW52YXNSZW5kZXJlck5hbWVzcGFjZS5yZWdpc3RyeVt0eXBlSWRdKHNoYXBlLCBjdHgpXG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBjYW52YXNSZW5kZXJlck5hbWVzcGFjZTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHNoYXBlTmFtZXNwYWNlID0ge1xuICByZWdpc3RyeToge31cbn07XG5cblxubGV0IHM0ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSk7XG59XG5sZXQgZ2V0R1VJRCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gKHM0KCkgKyBzNCgpICsgJy0nICtcbiAgICAgIHM0KCkgKyAnLScgK1xuICAgICAgczQoKSArICctJyArXG4gICAgICBzNCgpICsgJy0nICtcbiAgICAgIHM0KCkgKyBzNCgpICsgczQoKSk7XG59XG5cbmxldCBTaGFwZSA9IHNoYXBlTmFtZXNwYWNlLlNoYXBlID0gY2xhc3MgU2hhcGUge1xuICBjb25zdHJ1Y3Rvcih0eXBlSWQsIGF0dHJpYnV0ZXMsIGlkKSB7XG4gICAgaWYgKCF0eXBlSWQgfHwgIWlkIHx8ICFhdHRyaWJ1dGVzKSB7XG4gICAgICB0aHJvdyBcIlNoYXBlcyBtdXN0IGJlIGluaXRpYWxpemVkIHdpdGggYXR0cmlidXRlcy5cIjtcbiAgICB9XG4gICAgdGhpcy50eXBlSWQgPSB0eXBlSWQ7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXM7XG4gIH1cbn1cblxuXG5sZXQgcmVnaXN0ZXJTaGFwZSA9IHNoYXBlTmFtZXNwYWNlLnJlZ2lzdGVyU2hhcGUgPSBmdW5jdGlvbih0eXBlSWQsIGNscykge1xuICBzaGFwZU5hbWVzcGFjZS5yZWdpc3RyeVt0eXBlSWRdID0gY2xzO1xufTtcblxuXG5sZXQgY3JlYXRlU2hhcGUgPSBzaGFwZU5hbWVzcGFjZS5jcmVhdGVTaGFwZSA9IGZ1bmN0aW9uKHR5cGVJZCwgYXR0cmlidXRlcywgaWQpIHtcbiAgaWYgKCFzaGFwZU5hbWVzcGFjZS5yZWdpc3RyeVt0eXBlSWRdKSB7XG4gICAgdGhyb3cgKFwiVGhlcmUgaXMgbm8gc2hhcGUgdHlwZSBcIiArIHR5cGVJZClcbiAgfVxuICBpZiAoIWlkKSBpZCA9IGdldEdVSUQoKTtcbiAgcmV0dXJuIG5ldyBzaGFwZU5hbWVzcGFjZS5yZWdpc3RyeVt0eXBlSWRdKHR5cGVJZCwgYXR0cmlidXRlcywgaWQpXG59O1xuXG5cbi8qXG57XG4gIGRpbWVuc2lvbnM6IHt4bWluLCB4bWF4LCB5bWluLCB5bWF4fSxcbiAgc3R5bGU6IHtzdHJva2VDb2xvciwgc3Ryb2tlV2lkdGgsIGZpbGxDb2xvcn1cbn1cbiovXG5yZWdpc3RlclNoYXBlKCdSZWN0YW5nbGUnLCBjbGFzcyBSZWN0YW5nbGUgZXh0ZW5kcyBTaGFwZSB7IH0pO1xuXG4vKlxue1xue1xuICBkaW1lbnNpb25zOiB7eG1pbiwgeG1heCwgeW1pbiwgeW1heH0sXG4gIHN0eWxlOiB7c3Ryb2tlQ29sb3IsIHN0cm9rZVdpZHRoLCBmaWxsQ29sb3J9XG59XG4qL1xucmVnaXN0ZXJTaGFwZSgnRWxsaXBzZScsIGNsYXNzIEVsbGlwc2UgZXh0ZW5kcyBTaGFwZSB7fSk7XG5cbi8qXG57XG4gIHByb2dyYW06IFsgIC8vIGxpc3Qgb2YgdmFsdWVzIG9mIG9uZSBvZiB0aGVzZSB0eXBlczpcbiAgICBbeCwgeV1cbiAgICB7KHN0cm9rZUNvbG9yOiAnYmxhY2snKT8sIChzdHJva2VXaWR0aDogNSk/fVxuICBdXG4gIGNhcDE6IHtzdHlsZTogJ3JvdW5kJywgc2hhcGU6IG51bGwgb3Igc2hhcGUsIG9mZnNldDogYW1vdW50fVxuICBjYXAyOiB7c3R5bGU6ICdyb3VuZCcsIHNoYXBlOiBudWxsIG9yIHNoYXBlLCBvZmZzZXQ6IGFtb3VudH1cbiAgZGFzaDogbnVsbFxufVxuKi9cbnJlZ2lzdGVyU2hhcGUoJ1BhdGgnLCBjbGFzcyBQYXRoIGV4dGVuZHMgU2hhcGUge30pO1xuXG4vKlxue1xuICBwcm9ncmFtOiBbICAgICAgICAgIC8vIGxpc3Qgb2YgdmFsdWVzIG9mIG9uZSBvZiB0aGVzZSB0eXBlczpcbiAgICBbeCwgeV1cbiAgICB7KHN0cm9rZUNvbG9yOiAnYmxhY2snKT8sIChzdHJva2VXaWR0aDogNSk/fVxuICBdXG4gIHNtb290aGVkUHJvZ3JhbTogWyAgLy8gbGlrZSBwcm9ncmFtLCBidXQgcG9pbnRzIHNtb290aGVkXG4gIF1cbiAgY2FwMToge3N0eWxlOiAncm91bmQnLCBzaGFwZTogbnVsbCBvciBzaGFwZSwgb2Zmc2V0OiBhbW91bnR9XG4gIGNhcDI6IHtzdHlsZTogJ3JvdW5kJywgc2hhcGU6IG51bGwgb3Igc2hhcGUsIG9mZnNldDogYW1vdW50fVxuICBkYXNoOiBudWxsXG59XG4qL1xucmVnaXN0ZXJTaGFwZSgnU21vb3RoZWRQYXRoJywgY2xhc3MgU21vb3RoZWRQYXRoIGV4dGVuZHMgU2hhcGUge30pO1xuXG4vKlxue1xuICBwcm9ncmFtOiBbICAgICAgICAgIC8vIGxpc3Qgb2YgdmFsdWVzIG9mIG9uZSBvZiB0aGVzZSB0eXBlczpcbiAgICBbY3BCYWNrd2FyZFgsIGNwQmFja3dhcmRZLCB4LCB5LCBjcEZvcndhcmRYLCBjcEZvcndhcmRZXVxuICAgIHsoc3Ryb2tlQ29sb3I6ICdibGFjaycpPywgKHN0cm9rZVdpZHRoOiA1KT99XG4gIF1cbiAgY2FwMToge3N0eWxlOiAncm91bmQnLCBzaGFwZTogbnVsbCBvciBzaGFwZSwgb2Zmc2V0OiBhbW91bnR9XG4gIGNhcDI6IHtzdHlsZTogJ3JvdW5kJywgc2hhcGU6IG51bGwgb3Igc2hhcGUsIG9mZnNldDogYW1vdW50fVxuICBkYXNoOiBudWxsXG59XG4qL1xucmVnaXN0ZXJTaGFwZSgnQmV6aWVyJywgY2xhc3MgQmV6aWVyIGV4dGVuZHMgU2hhcGUge30pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gc2hhcGVOYW1lc3BhY2U7Il19
