class Shape
  className
  id
  getDoesSupportCanvas()
  getDoesSupportSVG()
  getIsPurelyAdditive() // defaults to (=> true); if false, rendering uses
                        // more memory and the shape can't be rendered to SVG.
  getBounds()
  draw(ctx, x, y)


class ViewModel
  cameraCenter
  scale


class Layer
  position
  scale
  rotation
  shapeStore
  project(vector2 in local space) -> position of vector2 in parent's
    coordinate space
  unproject(vector2 in parent space) -> position of vector2 in local
    coordinate space


class Document
  strokeColor
  fillColor
  backgroundColor
  layers: [
    TransformLayer([
      RasterDrawingLayer({shapes: ShapeStore})
    ]),
    TransformLayer([
      SVGLayer({shapes: ShapeStore})
    ]),
  ]
  actionHistory: [
    addLayer(new TransformLayer(id='t1'))
    addLayer(new RasterDrawingLayer(id='r1'), parent='t1')
    addLayer(new TransformLayer(id='t2'))
    addLayer(new SVGLayer(id='s1'), parent='t2')
    group([
      addShape(
        new RectShape({id: 'rect', blah}), layerId='r1',
        parentWhenCreated=null)
    ])
    updateShape(
      'rect', new RectShape({id: 'rect', different blah}))
    removeShape('rect')
  ]
  redoQueue: [
  ]


class ShapeStore
  add(shape)
  replace(shape)  // has ID that matches an existing shape
  remove(shapeId)


class Tool(mouseEvents, documentModel, activeLayer)
  didBecomeActive: (document, activeLayer, viewModel, ) =>
    self.unsubscribeAll = createUnsubscriber()
    hasChanged = false
    shapeInProgress = null
    points = []

    unsubscribeAll.add mouseEvents.onDown =>
      points.append(mouse point)
      shapeInProgress = new LinePathShape({
        points, blah, onlyDrawLastNPoints: 0})
      shapesInProgressStore.add(shapeInProgress)

    unsubscribeAll.add mouseEvents.onMove =>
      hasChanged = true
      points.append(mouse point)

    unsubscribeAll.add mouseEvents.onUp =>
      shapesInProgressStore.remove(shapeInProgress.id)

      permanentShape = new LinePathShape({points, blah})
      documentModel.applyActions([
        addShape(permanentShape, layerId=activeLayer.id,
        parentWhenCreated=activeLayer.latestShape)
      ])
      shapeInProgress = null
      points = []

    unsubscribeAll.add preRenderEvents.onValue =>
      if shapeInProgress
        numPointsToDraw = points.length - shapeInProgress.points.length + 3
        shapeInProgress = new LinePathShape({
          points, blah,, onlyDrawLastNPoints: numPointsToDraw})
        shapesInProgressStore.replace(shapeInProgress)


Serializers
  registerShapeSerializer(format, className, getSerializedShape)
  registerLayerSerializer(format, className, getSerializedLayer)
  Formats
    POJO
    SVGString
