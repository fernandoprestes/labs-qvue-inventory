<script lang="ts" setup>
  import { Product } from 'src/@types/Product'
  import { formatterCurrency } from 'src/utils/formatter'

  interface DialogProps {
    product: Product
  }
  defineProps<DialogProps>()
</script>

<template>
  <q-dialog persistent>
    <q-card>
      <q-card-section class="row items-center">
        <h2 class="text-h6">Detalhe</h2>
      </q-card-section>
      <q-card-section>
        <q-img
          :src="product.imgUrl"
          :ratio="4 / 3"
          spinner-color="primary"
          spinner-size="82px"
          style="min-width: 300px"
        />
      </q-card-section>
      <q-card-section>
        <h3 class="text-h6">{{ product.name }}</h3>
        <strong>{{ formatterCurrency(product.price) }}</strong>
        <div
          class="text-body2"
          v-html="product.description"
        ></div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="Confirmar"
          color="primary"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
