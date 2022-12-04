<script setup lang="ts">
  import useApi from 'src/composables/useApi'
  import { onMounted, ref } from 'vue'

  const { getBrand } = useApi()

  const storeName = ref('')

  onMounted(async () => {
    const response = await getBrand()
    if (response) {
      storeName.value = response.name
    }
  })
</script>
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> {{ storeName }} </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
