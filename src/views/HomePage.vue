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
      x: 0, y: 0
    },
    floor: 0
  },
  {
    position: {
      x: 21, y: 14
    },
    floor: 0
  },
  {
    position: {
      x: 77, y: 36
    },
    floor: 0
  },
  {
    position: {
      x: 99, y: 99
    },
    floor: 0
  }
]

const maps = [
  {
    src: floor1Image,
    ratio: 1.5853,
    zoom: 0.56,
    offsetX: 0.32,
    offsetY: 0.29
  },
  {
    src: floor2Image,
    ratio: 1.6222,
    zoom: 1,
    offsetX: 0,
    offsetY: 0.1
  }
]

const coordinates = [
  {
    zoom: 1,
    offsetX: 0,
    offsetY: 0.14
  },
  {
    zoom: 0.9,
    offsetX: 0.03,
    offsetY: 0.16
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
