$ = window.$
LiterallyCanvas = require './core/LiterallyCanvas'
initReact = require './reactGUI/init'

shapes = require './core/shapes'
util = require './core/util'


require './optionsStyles/font'
require './optionsStyles/stroke-width'
require './optionsStyles/null'
{defineOptionsStyle} = require './optionsStyles/optionsStyles'


baseTools = require './tools/base'
tools =
  Pencil: require './tools/Pencil'
  Eraser: require './tools/Eraser'
  Line: require './tools/Line'
  Rectangle: require './tools/Rectangle'
  Text: require './tools/Text'
  Pan: require './tools/Pan'
  Eyedropper: require './tools/Eyedropper'

  Tool: baseTools.Tool
  ToolWithStroke: baseTools.ToolWithStroke


init = (el, opts = {}) ->
  opts.primaryColor ?= '#000'
  opts.secondaryColor ?= '#fff'
  opts.backgroundColor ?= 'transparent'
  opts.imageURLPrefix ?= 'lib/img'
  opts.keyboardShortcuts ?= true
  opts.preserveCanvasContents ?= false

  opts.sizeToContainer ?= true
  opts.canvasSize ?= null
  opts.pickerWidth ?= 60
  opts.optionsHeight ?= 60

  opts.backgroundShapes ?= []
  opts.watermarkImage ?= null
  unless 'tools' of opts
    opts.tools = [
      tools.Pencil,
      tools.Eraser,
      tools.Line,
      tools.Rectangle,
      tools.Text,
      tools.Pan,
      tools.Eyedropper,
    ]

  $el = $(el)
  $el.addClass('literally')

  $el.append('<canvas>') unless $el.find('canvas').length
  $canvas = $el.find('canvas')

  if opts.canvasSize?
    opts.sizeToContainer = false
    $el.css('background-color', '#aaa');
    $('<div class="background-div">').css(
      width: opts.canvasSize.x + 'px'
      height: opts.canvasSize.y + 'px'
    ).appendTo($el)
    $canvas.css
      width: opts.canvasSize.x + 'px'
      height: opts.canvasSize.y + 'px'

  lc = new LiterallyCanvas($canvas.get(0), opts)
  initReact(el, lc, opts.tools, opts.imageURLPrefix)

  if 'onInit' of opts
    opts.onInit(lc)

  lc


registerJQueryPlugin = (_$) ->
  _$.fn.literallycanvas = (opts = {}) ->
    @each (ix, el) =>
      el.literallycanvas = init(el, opts)
    this


# non-browserify compatibility
window.LC = {init}
registerJQueryPlugin($)


module.exports = {
  init, registerJQueryPlugin, util, tools, defineOptionsStyle,

  defineShape: shapes.defineShape,
  createShape: shapes.createShape,
  JSONToShape: shapes.JSONToShape,
  shapeToJSON: shapes.shapeToJSON,
}