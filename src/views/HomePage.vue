<script setup lang="ts">
import { useMapConverter } from '@/utilies/map'
import floor1Image from '@/assets/images/floor1.svg'
import floor2Image from '@/assets/images/floor2.svg'
import hotSpotImage from '@/assets/images/hot_spot.svg'
import positionImage from '@/assets/images/position.svg'
import angleImage from '@/assets/images/angle.svg'

interface Position {
  x: number,
  y: number
}

interface HotSpot {
  position: Position,
  floor: number
}

const hotSpots:HotSpot[] = [
  {
    position: {
      x: 0, y: 4
    },
    floor: 0
  },
  {
    position: {
      x: 1, y: 2
    },
    floor: 0
  },
  {
    position: {
      x: 4, y: 4.6
    },
    floor: 0
  },
  {
    position: {
      x: 8, y: 5
    },
    floor: 0
  },
  {
    position: {
      x: 12, y: 5.1
    },
    floor: 0
  },
  {
    position: {
      x: 16, y: 4.9
    },
    floor: 0
  },
  {
    position: {
      x: 20, y: 5.7
    },
    floor: 0
  },
  {
    position: {
      x: 24, y: 6
    },
    floor: 0
  }
]

const maps = [
  {
    src: floor1Image,
    ratio: 1.5853,
    zoom: 0.7,
    offsetX: 0.2,
    offsetY: 0.05
  },
  {
    src: floor2Image,
    ratio: 1.6222,
    zoom: 1,
    offsetX: 0,
    offsetY: 0
  }
]

const coordinates = [
  {
    zoom: 0.7,
    offsetX: 0.22,
    offsetY: 0.33
  },
  {
    zoom: 0.5,
    offsetX: 0,
    offsetY: 0
  }
]

const mapDOM = ref()

const handleMap = () => {
  const { setFloor, createHotSpots, createCameraPosition, updateCameraPosition } = useMapConverter({
    dom: mapDOM.value,
    maps,
    hotSpots,
    coordinates: coordinates
  })
  setFloor(0)
  createHotSpots({ size: 6, src: hotSpotImage })
  createCameraPosition({
    positionData: {
      size: 6,
      src: positionImage
    },
    angleData: {
      size: 20,
      src: angleImage
    }
  })
  updateCameraPosition({
    x: 4,
    y: 4.6,
    angle: 0
  })
}
onMounted(async () => {
  handleMap()
})
</script>

<template>
  <div class="fixed top-12 left-20 z-50 border-2 border-black w-1/4 h-1/4 rounded-2xl bg-black">
    <div
      ref="mapDOM"
      class="absolute w-full h-full"
    />
  </div>
</template>
