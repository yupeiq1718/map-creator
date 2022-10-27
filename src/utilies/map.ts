interface Map {
  src:string,
  ratio:number,
  zoom:number,
  offsetX:number,
  offsetY:number
}

interface Coordinate {
  zoom:number,
  offsetX:number,
  offsetY:number
}

interface Position {
  x: number,
  y: number,
}

interface HotSpot {
  position: Position,
  floor: number
}

interface CameraInformation {
  x: number,
  y: number,
  angle: number
}

interface Props {
  dom: HTMLElement,
  maps: Map[],
  hotSpots: HotSpot[],
  coordinates: Coordinate[]
}

const useMapConverter = ({ dom, maps, hotSpots, coordinates }:Props) => {
  const mapImage = document.createElement('img')
  dom.appendChild(mapImage)

  const canvas = document.createElement('div')
  dom.appendChild(canvas)

  const cameraCanvas = document.createElement('div')

  const hotSpotCanvas = document.createElement('div')

  const positionImage = document.createElement('img')
  const angleImage = document.createElement('img')

  let coordinateBaseX:number
  let coordinateBaseY:number
  let coordinateRatio:number
  let coordinateRangeX:number
  let coordinateRangeY:number

  const calculateCoordinate = (positions:Position[]) => {
    const positionX = positions.map((hotSpot:Position) => hotSpot.x)
    const positionY = positions.map((hotSpot:Position) => hotSpot.y)

    const maxCoordinateX = Math.max.apply(null, positionX)
    const minCoordinateX = Math.min.apply(null, positionX)
    const maxCoordinateY = Math.max.apply(null, positionY)
    const minCoordinateY = Math.min.apply(null, positionY)
    coordinateBaseX = minCoordinateX
    coordinateBaseY = minCoordinateY
    coordinateRangeX = maxCoordinateX - minCoordinateX
    coordinateRangeY = maxCoordinateY - minCoordinateY
    coordinateRatio = coordinateRangeX / coordinateRangeY
  }

  const setMap = (map: Map) => {
    const { src, offsetX, offsetY, ratio, zoom } = map
    mapImage.src = new URL(src, import.meta.url).href
    mapImage.setAttribute('style', `position:absolute;left:${100 * offsetX}%;top:${100 * offsetY}%;width:${100 * zoom}%;aspect-ratio:${ratio}`)
  }

  const setCanvas = (coordinate:Coordinate) => {
    const { offsetX, offsetY, zoom } = coordinate
    canvas.setAttribute('style', `position:absolute;left:${100 * offsetX}%;top:${100 * offsetY}%;width:${100 * zoom}%;aspect-ratio:${coordinateRatio}`)
  }

  const getNormalizedPosition = ({ x, y }:{
    x: number,
    y: number
  }) => ({
    x: 100 * (x - coordinateBaseX) / coordinateRangeX,
    y: 100 * (y - coordinateBaseY) / coordinateRangeY
  })

  const drawHotSpot = ({ x, y, size }:{
    x: number, y: number, size: number
  }) => {
    const hotSpotImage = document.createElement('img')
    hotSpotImage.src = hotSpotData.src
    hotSpotImage.setAttribute('style', `position:absolute;left:${x}%;top:${y}% ;width:${size}px;height:${size}px;transform:translate(-50%,-50%);z-index:10;`)
    hotSpotCanvas.appendChild(hotSpotImage)
  }

  let normalizedPositions:Position[]

  let isHotSpotActive = false

  interface HotSpotData {
    size: number,
    src: string
  }

  const hotSpotData = {
    size: 6,
    src: ''
  }

  const createHotSpots = ({ size, src }: HotSpotData) => {
    hotSpotCanvas.setAttribute('style', 'position:absolute;top:0;left:0;width:100%;height:100%;')
    hotSpotCanvas.setAttribute('id', 'hotSpotCanvas')
    canvas.appendChild(hotSpotCanvas)
    hotSpotData.size = size
    hotSpotData.src = src
    normalizedPositions.forEach(normalizedPosition => {
      drawHotSpot({ size: hotSpotData.size, ...normalizedPosition })
    })
    isHotSpotActive = true
  }

  const updateHotSpots = () => {
    const hotSpotCanvasDOM = document.querySelector('#hotSpotCanvas')
    const children = hotSpotCanvasDOM?.childNodes || []
    for (let i = children.length - 1; i >= 0; i--) {
      hotSpotCanvasDOM?.removeChild(children[i])
    }
    normalizedPositions.forEach(normalizedPosition => {
      drawHotSpot({ size: hotSpotData.size, ...normalizedPosition })
    })
  }

  const deleteHotSpots = () => {
    const hotSpotCanvasDOM = document.querySelector('#hotSpotCanvas')
    const children = hotSpotCanvasDOM?.childNodes || []
    for (let i = children.length - 1; i >= 0; i--) {
      hotSpotCanvasDOM?.removeChild(children[i])
    }
    isHotSpotActive = false
  }

  interface PositionImageData {
    size: number,
    src: string
  }
  let positionImageData: PositionImageData

  interface AngleImageData {
    size: number,
    src: string
  }
  let angleImageData: AngleImageData

  const createCameraPosition = ({ positionData, angleData }:{
    positionData: PositionImageData,
    angleData: AngleImageData
  }) => {
    cameraCanvas.setAttribute('style', 'position:absolute;top:0;left:0;width:100%;height:100%;')
    cameraCanvas.setAttribute('id', 'cameraCanvas')
    canvas.appendChild(cameraCanvas)

    positionImageData = positionData
    positionImage.src = new URL('../assets/images/position.svg', import.meta.url).href
    cameraCanvas.appendChild(positionImage)

    angleImageData = angleData
    angleImage.src = new URL('../assets/images/angle.svg', import.meta.url).href
    cameraCanvas.appendChild(angleImage)
  }

  const updateCameraPosition = (cameraInformation: CameraInformation) => {
    const { x, y } = getNormalizedPosition(cameraInformation)
    positionImage.setAttribute('style', `position:absolute;left:${x}%;top:${y}% ;width:${positionImageData.size}px;height:${positionImageData.size}px;transform:translate(-50%,-50%);z-index:20;`)
    angleImage.setAttribute('style', `position:absolute;left:calc(${x}% + 4px);top:calc(${y}%);width:${angleImageData.size}px;height:${angleImageData.size}px;transform:translateY(-50%) rotate(${360 - cameraInformation.angle * 180 / Math.PI - 90}deg); transform-origin:-4px 50%;z-index:20;`)
  }

  const deleteCameraPosition = () => {
    const cameraCanvasDOM = document.querySelector('#cameraCanvas')
    const children = cameraCanvasDOM?.childNodes || []
    for (let i = children.length - 1; i >= 0; i--) {
      cameraCanvasDOM?.removeChild(children[i])
    }
  }

  const setFloor = (floor: number) => {
    setMap(maps[floor])
    const positions = hotSpots.filter(hotSpot => hotSpot.floor === floor).map(({ position }) => ({
      x: position.x,
      y: position.y
    }))
    calculateCoordinate(positions)
    setCanvas(coordinates[floor])
    normalizedPositions = positions.map(position => getNormalizedPosition(position))
    isHotSpotActive && updateHotSpots()
  }

  return {
    createHotSpots,
    updateHotSpots,
    deleteHotSpots,
    createCameraPosition,
    updateCameraPosition,
    deleteCameraPosition,
    setFloor
  }
}

export {
  useMapConverter
}
