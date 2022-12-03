<script lang="ts" setup>
  import useAuthUser from 'src/composables/useAuthUser'
  const { data } = useAuthUser()
</script>

<template>
  <q-page padding>
    <div v-if="data.user">
      <p>Hello! {{ data.user.user_metadata.name }}</p>
    </div>
  </q-page>
</template>
