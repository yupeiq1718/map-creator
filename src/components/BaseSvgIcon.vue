<script setup lang="ts">

interface Props {
  name: string
}

const props = defineProps<Props>()

const iconName = computed(() => `#icon-${props.name}`)

</script>
<template>
  <svg class="inline-block">
    <use :xlink:href="iconName" />
  </svg>
</template>
