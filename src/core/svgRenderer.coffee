lineEndCapShapes = require './lineEndCapShapes.coffee'
renderers = {}


# shapeToSVG(shape) -> string
defineSVGRenderer = (shapeName, shapeToSVGFunc) ->
	renderers[shapeName] = shapeToSVGFunc


renderShapeToSVG = (shape, opts={}) ->
  opts.shouldIgnoreUnsupportedShapes ?= false

  if renderers[shape.className]
    return renderers[shape.className](shape)
  else if opts.shouldIgnoreUnsupportedShapes
    console.warn "Can't render shape of type #{shape.className} to SVG"
    return ""
  else
    throw "Can't render shape of type #{shape.className} to SVG"


defineSVGRenderer 'Rectangle', (shape) ->
  "
    <rect x='#{shape.x}' y='#{shape.y}'
      width='#{shape.width}' height='#{shape.height}'
      stroke='#{shape.strokeColor}' fill='#{shape.fillColor}'
      stroke-width='#{shape.strokeWidth}' />
  "


defineSVGRenderer 'Ellipse', (shape) ->
  halfWidth = Math.floor(shape.width / 2)
  halfHeight = Math.floor(shape.height / 2)
  centerX = shape.x + halfWidth
  centerY = shape.y + halfHeight
  "
    <ellipse cx='#{centerX}' cy='#{centerY}' rx='#{halfWidth}'
      ry='#{halfHeight}'
      stroke='#{shape.strokeColor}' fill='#{shape.fillColor}'
      stroke-width='#{shape.strokeWidth}' />
  "


defineSVGRenderer 'Image', (shape) ->
  # This will only work when embedded in a web page.
  "
    <image x='#{shape.x}' y='#{shape.y}'
      width='#{shape.image.naturalWidth}' height='#{shape.image.naturalHeight}'
      xlink:href='#{shape.image.src}' />
  "


defineSVGRenderer 'Line', (shape) ->
  dashString =
    if shape.dash then "stroke-dasharray='#{shape.dash.join(', ')}'" else ''
  capString = ''
  arrowWidth = Math.max(shape.strokeWidth * 2.2, 5)
  if shape.endCapShapes[0]
    capString += lineEndCapShapes[shape.endCapShapes[0]].svg(
      shape.x1, shape.y1, Math.atan2(shape.y1 - shape.y2, shape.x1 - shape.x2),
      arrowWidth, shape.color)
  if shape.endCapShapes[1]
    capString += lineEndCapShapes[shape.endCapShapes[1]].svg(
      shape.x2, shape.y2, Math.atan2(shape.y2 - shape.y1, shape.x2 - shape.x1),
      arrowWidth, shape.color)
  "
    <g>
      <line x1='#{shape.x1}' y1='#{shape.y1}' x2='#{shape.x2}' y2='#{shape.y2}'
        #{dashString}
        stroke-linecap='#{shape.capStyle}'
        stroke='#{shape.color}'stroke-width='#{shape.strokeWidth}' />
      #{capString}
    <g>
  "


defineSVGRenderer 'LinePath', (shape) ->
  "
    <polyline
      fill='none'
      points='#{shape.smoothedPoints.map((p) -> "#{p.x},#{p.y}").join(' ')}'
      stroke='#{shape.points[0].color}'
      stroke-width='#{shape.points[0].size}' />
  "


# silently skip erasers
defineSVGRenderer 'ErasedLinePath', (shape) -> ""


defineSVGRenderer 'Text', (shape) ->
  # fallback: don't worry about auto-wrapping
  widthString =
    if shape.forcedWidth then "width='#{shape.forcedWidth}px'" else ""
  heightString =
    if shape.forcedHeight then "height='#{shape.forcedHeight}px'" else ""
  textSplitOnLines = shape.text.split(/\r\n|\r|\n/g)

  if shape.renderer
    textSplitOnLines = shape.renderer.lines

  "
  <text x='#{shape.x}' y='#{shape.y}'
        #{widthString} #{heightString}
        fill='#{shape.color}'
        style='font: #{shape.font};'>
    #{textSplitOnLines.map((line, i) =>
      dy = if i == 0 then 0 else '1.2em'
      return "
        <tspan x='#{shape.x}' dy='#{dy}' alignment-baseline='text-before-edge'>
          #{line}
        </tspan>"
    ).join('')}
  </text>
  "


module.exports = {defineSVGRenderer, renderShapeToSVG}