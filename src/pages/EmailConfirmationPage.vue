<script lang="ts" setup></script>

<template>
  <q-page padding>
    <p class="text-h5 text-center">Obrigado por registrar!</p>
    <p>
      Confirme seu email para finalizar seu cadastro:
      <strong>{{ $route.query.email }}</strong>
    </p>
  </q-page>
</template>
