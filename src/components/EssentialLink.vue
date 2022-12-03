<script setup lang="ts">
  export interface EssentialLinkProps {
    title: string
    caption?: string
    routeName?: string
    icon?: string
  }
  withDefaults(defineProps<EssentialLinkProps>(), {
    caption: '',
    routeName: '',
    icon: ''
  })
</script>

<template>
  <q-item
    clickable
    :to="{ name: routeName }"
    exact
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
