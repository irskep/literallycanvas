(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.LC = {
  shape: require("./shape/base")
}

},{"./shape/base":2}],2:[function(require,module,exports){
"use strict";

var shapeNamespace = {
  shapeRegistry: {}
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
  shapeNamespace.shapeRegistry[typeId] = cls;
};


let createShape = shapeNamespace.createShape = function(typeId, attributes, id) {
  if (!shapeNamespace.shapeRegistry[typeId]) {
    throw ("There is no shape type " + typeId)
  }
  if (!id) id = getGUID();
  return new shapeNamespace.shapeRegistry[typeId](typeId, attributes, id)
};


/*
{
  dimensions: {xmin, xmax, ymin, ymax},
  style: {strokeColor, strokeWidth, fillColor}
}
*/
registerShape('Rectangle', class Rectangle extends Shape {
  constructor(typeId, attributes, id) {
    super(typeId, attributes, id);
  }

  blah() {
    console.log('blah!');
  }
});

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
  end1: {x, y}
  end2: {x, y}
  cap1: {style: 'round', shape: null or shape, offset: amount}
  cap2: {style: 'round', shape: null or shape, offset: amount}
  style: {strokeColor, strokeWidth, dash: null}
}
*/
registerShape('Line', class Line extends Shape {});

/*
{
  program: [  // list of values of one of these types:
    [x, y]
    {(strokeColor: 'black')?, (strokeWidth: 5)?}
  ]
  cap1: {style: 'round', shape: null or shape, offset: amount}
  cap2: {style: 'round', shape: null or shape, offset: amount}
  style: {strokeColor, strokeWidth, dash: null}
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
  style: {strokeColor, strokeWidth, dash: null}
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
  style: {strokeColor, strokeWidth, dash: null}
}
*/
registerShape('Bezier', class Bezier extends Shape {});


module.exports = shapeNamespace;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvc3RldmUvZGV2L2xpdGVyYWxseWNhbnZhcy9zcmMvaW5kZXguanN4IiwiL1VzZXJzL3N0ZXZlL2Rldi9saXRlcmFsbHljYW52YXMvc3JjL3NoYXBlL2Jhc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxNQUFNLENBQUMsRUFBRSxHQUFHO0VBQ1YsS0FBSyxFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUM7Ozs7QUNEaEMsWUFBWSxDQUFDOztBQUViLElBQUksY0FBYyxHQUFHO0VBQ25CLGFBQWEsRUFBRSxFQUFFO0FBQ25CLENBQUMsQ0FBQztBQUNGOztBQUVBLElBQUksRUFBRSxHQUFHLFdBQVc7SUFDaEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQzlFO0FBQ0QsSUFBSSxPQUFPLEdBQUcsV0FBVztFQUN2QixRQUFRLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxHQUFHLEdBQUc7TUFDckIsRUFBRSxFQUFFLEdBQUcsR0FBRztNQUNWLEVBQUUsRUFBRSxHQUFHLEdBQUc7TUFDVixFQUFFLEVBQUUsR0FBRyxHQUFHO01BQ1YsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUU7QUFDMUIsQ0FBQzs7QUFFRCxJQUFJLEtBQUssR0FBRyxjQUFjLENBQUMsS0FBSyxHQUFHLE1BQU0sS0FBSyxDQUFDO0VBQzdDLFdBQVcseUJBQXlCO0lBQ2xDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7TUFDakMsTUFBTSw2Q0FBNkMsQ0FBQztLQUNyRDtJQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3JCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2IsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7R0FDOUI7QUFDSCxDQUFDO0FBQ0Q7O0FBRUEsSUFBSSxhQUFhLEdBQUcsY0FBYyxDQUFDLGFBQWEsR0FBRyxTQUFTLE1BQU0sRUFBRSxHQUFHLEVBQUU7RUFDdkUsY0FBYyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDN0MsQ0FBQyxDQUFDO0FBQ0Y7O0FBRUEsSUFBSSxXQUFXLEdBQUcsY0FBYyxDQUFDLFdBQVcsR0FBRyxTQUFTLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFO0VBQzlFLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFO0lBQ3pDLE9BQU8seUJBQXlCLEdBQUcsTUFBTSxDQUFDO0dBQzNDO0VBQ0QsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQUM7RUFDeEIsT0FBTyxJQUFJLGNBQWMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUM7QUFDekUsQ0FBQyxDQUFDO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0VBRUU7QUFDRixhQUFhLENBQUMsV0FBVyxFQUFFLE1BQU0sU0FBUyxTQUFTLEtBQUssQ0FBQztFQUN2RCxXQUFXLHlCQUF5QjtJQUNsQyxLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNsQyxHQUFHOztFQUVELElBQUksR0FBRztJQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7R0FDdEI7QUFDSCxDQUFDLENBQUMsQ0FBQzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztFQUVFO0FBQ0YsYUFBYSxDQUFDLFNBQVMsRUFBRSxNQUFNLE9BQU8sU0FBUyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztFQUVFO0FBQ0YsYUFBYSxDQUFDLE1BQU0sRUFBRSxNQUFNLElBQUksU0FBUyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7RUFFRTtBQUNGLGFBQWEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxJQUFJLFNBQVMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztBQUVuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztFQUVFO0FBQ0YsYUFBYSxDQUFDLGNBQWMsRUFBRSxNQUFNLFlBQVksU0FBUyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7O0FBRW5FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7RUFFRTtBQUNGLGFBQWEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxNQUFNLFNBQVMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZEOztBQUVBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsY0FBYyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ3aW5kb3cuTEMgPSB7XG4gIHNoYXBlOiByZXF1aXJlKFwiLi9zaGFwZS9iYXNlXCIpXG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzaGFwZU5hbWVzcGFjZSA9IHtcbiAgc2hhcGVSZWdpc3RyeToge31cbn07XG5cblxubGV0IHM0ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSk7XG59XG5sZXQgZ2V0R1VJRCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gKHM0KCkgKyBzNCgpICsgJy0nICtcbiAgICAgIHM0KCkgKyAnLScgK1xuICAgICAgczQoKSArICctJyArXG4gICAgICBzNCgpICsgJy0nICtcbiAgICAgIHM0KCkgKyBzNCgpICsgczQoKSk7XG59XG5cbmxldCBTaGFwZSA9IHNoYXBlTmFtZXNwYWNlLlNoYXBlID0gY2xhc3MgU2hhcGUge1xuICBjb25zdHJ1Y3Rvcih0eXBlSWQsIGF0dHJpYnV0ZXMsIGlkKSB7XG4gICAgaWYgKCF0eXBlSWQgfHwgIWlkIHx8ICFhdHRyaWJ1dGVzKSB7XG4gICAgICB0aHJvdyBcIlNoYXBlcyBtdXN0IGJlIGluaXRpYWxpemVkIHdpdGggYXR0cmlidXRlcy5cIjtcbiAgICB9XG4gICAgdGhpcy50eXBlSWQgPSB0eXBlSWQ7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXM7XG4gIH1cbn1cblxuXG5sZXQgcmVnaXN0ZXJTaGFwZSA9IHNoYXBlTmFtZXNwYWNlLnJlZ2lzdGVyU2hhcGUgPSBmdW5jdGlvbih0eXBlSWQsIGNscykge1xuICBzaGFwZU5hbWVzcGFjZS5zaGFwZVJlZ2lzdHJ5W3R5cGVJZF0gPSBjbHM7XG59O1xuXG5cbmxldCBjcmVhdGVTaGFwZSA9IHNoYXBlTmFtZXNwYWNlLmNyZWF0ZVNoYXBlID0gZnVuY3Rpb24odHlwZUlkLCBhdHRyaWJ1dGVzLCBpZCkge1xuICBpZiAoIXNoYXBlTmFtZXNwYWNlLnNoYXBlUmVnaXN0cnlbdHlwZUlkXSkge1xuICAgIHRocm93IChcIlRoZXJlIGlzIG5vIHNoYXBlIHR5cGUgXCIgKyB0eXBlSWQpXG4gIH1cbiAgaWYgKCFpZCkgaWQgPSBnZXRHVUlEKCk7XG4gIHJldHVybiBuZXcgc2hhcGVOYW1lc3BhY2Uuc2hhcGVSZWdpc3RyeVt0eXBlSWRdKHR5cGVJZCwgYXR0cmlidXRlcywgaWQpXG59O1xuXG5cbi8qXG57XG4gIGRpbWVuc2lvbnM6IHt4bWluLCB4bWF4LCB5bWluLCB5bWF4fSxcbiAgc3R5bGU6IHtzdHJva2VDb2xvciwgc3Ryb2tlV2lkdGgsIGZpbGxDb2xvcn1cbn1cbiovXG5yZWdpc3RlclNoYXBlKCdSZWN0YW5nbGUnLCBjbGFzcyBSZWN0YW5nbGUgZXh0ZW5kcyBTaGFwZSB7XG4gIGNvbnN0cnVjdG9yKHR5cGVJZCwgYXR0cmlidXRlcywgaWQpIHtcbiAgICBzdXBlcih0eXBlSWQsIGF0dHJpYnV0ZXMsIGlkKTtcbiAgfVxuXG4gIGJsYWgoKSB7XG4gICAgY29uc29sZS5sb2coJ2JsYWghJyk7XG4gIH1cbn0pO1xuXG4vKlxue1xue1xuICBkaW1lbnNpb25zOiB7eG1pbiwgeG1heCwgeW1pbiwgeW1heH0sXG4gIHN0eWxlOiB7c3Ryb2tlQ29sb3IsIHN0cm9rZVdpZHRoLCBmaWxsQ29sb3J9XG59XG4qL1xucmVnaXN0ZXJTaGFwZSgnRWxsaXBzZScsIGNsYXNzIEVsbGlwc2UgZXh0ZW5kcyBTaGFwZSB7fSk7XG5cbi8qXG57XG4gIGVuZDE6IHt4LCB5fVxuICBlbmQyOiB7eCwgeX1cbiAgY2FwMToge3N0eWxlOiAncm91bmQnLCBzaGFwZTogbnVsbCBvciBzaGFwZSwgb2Zmc2V0OiBhbW91bnR9XG4gIGNhcDI6IHtzdHlsZTogJ3JvdW5kJywgc2hhcGU6IG51bGwgb3Igc2hhcGUsIG9mZnNldDogYW1vdW50fVxuICBzdHlsZToge3N0cm9rZUNvbG9yLCBzdHJva2VXaWR0aCwgZGFzaDogbnVsbH1cbn1cbiovXG5yZWdpc3RlclNoYXBlKCdMaW5lJywgY2xhc3MgTGluZSBleHRlbmRzIFNoYXBlIHt9KTtcblxuLypcbntcbiAgcHJvZ3JhbTogWyAgLy8gbGlzdCBvZiB2YWx1ZXMgb2Ygb25lIG9mIHRoZXNlIHR5cGVzOlxuICAgIFt4LCB5XVxuICAgIHsoc3Ryb2tlQ29sb3I6ICdibGFjaycpPywgKHN0cm9rZVdpZHRoOiA1KT99XG4gIF1cbiAgY2FwMToge3N0eWxlOiAncm91bmQnLCBzaGFwZTogbnVsbCBvciBzaGFwZSwgb2Zmc2V0OiBhbW91bnR9XG4gIGNhcDI6IHtzdHlsZTogJ3JvdW5kJywgc2hhcGU6IG51bGwgb3Igc2hhcGUsIG9mZnNldDogYW1vdW50fVxuICBzdHlsZToge3N0cm9rZUNvbG9yLCBzdHJva2VXaWR0aCwgZGFzaDogbnVsbH1cbn1cbiovXG5yZWdpc3RlclNoYXBlKCdQYXRoJywgY2xhc3MgUGF0aCBleHRlbmRzIFNoYXBlIHt9KTtcblxuLypcbntcbiAgcHJvZ3JhbTogWyAgICAgICAgICAvLyBsaXN0IG9mIHZhbHVlcyBvZiBvbmUgb2YgdGhlc2UgdHlwZXM6XG4gICAgW3gsIHldXG4gICAgeyhzdHJva2VDb2xvcjogJ2JsYWNrJyk/LCAoc3Ryb2tlV2lkdGg6IDUpP31cbiAgXVxuICBzbW9vdGhlZFByb2dyYW06IFsgIC8vIGxpa2UgcHJvZ3JhbSwgYnV0IHBvaW50cyBzbW9vdGhlZFxuICBdXG4gIGNhcDE6IHtzdHlsZTogJ3JvdW5kJywgc2hhcGU6IG51bGwgb3Igc2hhcGUsIG9mZnNldDogYW1vdW50fVxuICBjYXAyOiB7c3R5bGU6ICdyb3VuZCcsIHNoYXBlOiBudWxsIG9yIHNoYXBlLCBvZmZzZXQ6IGFtb3VudH1cbiAgc3R5bGU6IHtzdHJva2VDb2xvciwgc3Ryb2tlV2lkdGgsIGRhc2g6IG51bGx9XG59XG4qL1xucmVnaXN0ZXJTaGFwZSgnU21vb3RoZWRQYXRoJywgY2xhc3MgU21vb3RoZWRQYXRoIGV4dGVuZHMgU2hhcGUge30pO1xuXG4vKlxue1xuICBwcm9ncmFtOiBbICAgICAgICAgIC8vIGxpc3Qgb2YgdmFsdWVzIG9mIG9uZSBvZiB0aGVzZSB0eXBlczpcbiAgICBbY3BCYWNrd2FyZFgsIGNwQmFja3dhcmRZLCB4LCB5LCBjcEZvcndhcmRYLCBjcEZvcndhcmRZXVxuICAgIHsoc3Ryb2tlQ29sb3I6ICdibGFjaycpPywgKHN0cm9rZVdpZHRoOiA1KT99XG4gIF1cbiAgY2FwMToge3N0eWxlOiAncm91bmQnLCBzaGFwZTogbnVsbCBvciBzaGFwZSwgb2Zmc2V0OiBhbW91bnR9XG4gIGNhcDI6IHtzdHlsZTogJ3JvdW5kJywgc2hhcGU6IG51bGwgb3Igc2hhcGUsIG9mZnNldDogYW1vdW50fVxuICBzdHlsZToge3N0cm9rZUNvbG9yLCBzdHJva2VXaWR0aCwgZGFzaDogbnVsbH1cbn1cbiovXG5yZWdpc3RlclNoYXBlKCdCZXppZXInLCBjbGFzcyBCZXppZXIgZXh0ZW5kcyBTaGFwZSB7fSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBzaGFwZU5hbWVzcGFjZTsiXX0=
