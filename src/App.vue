<script setup lang="ts">
  import { onMounted } from 'vue'
  import useApi from 'src/composables/useApi'

  const { getBrand } = useApi()

  onMounted(async () => {
    await getBrand()
  })
</script>
<template>
  <router-view />
</template>
