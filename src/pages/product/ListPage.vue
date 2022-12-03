<script lang="ts" setup>
  import useApi from 'src/composables/useApi'
  import useNotify from 'src/composables/useNotify'
  import { Product } from 'src/@types/Product'
  import { useQuasar } from 'quasar'
  import { onMounted, ref } from 'vue'
  import { columnsProduct } from './columnsTable'

  const api = useApi()
  const $q = useQuasar()
  const { notifySuccess, notifyError } = useNotify()

  const products = ref<Product[]>([])
  const isLoading = ref(false)

  const handleListProducts = async () => {
    try {
      isLoading.value = true
      products.value = await api.get('product')
    } catch (error) {
      notifyError(`Não foi possível buscar as categorias!: ${error}`)
    } finally {
      isLoading.value = false
    }
  }

  const handleRemoveProduct = (product: Product) => {
    try {
      $q.dialog({
        title: 'Deletar um produto',
        message: `Realmente deseja remover ${product.name.toLocaleUpperCase()} ?`,
        cancel: true,
        persistent: true
      }).onOk(async () => {
        await api.remover('product', product.id)
        notifySuccess('Produto removido com sucesso!')
        products.value = []
        await handleListProducts()
      })
    } catch (error) {
      notifyError(`Não foi possível remover a categoria!: ${error}`)
    }
  }

  onMounted(async () => {
    await handleListProducts()
  })
</script>

<template>
  <q-page padding>
    <div class="row">
      <q-table
        title="Table Title"
        :rows="products"
        :columns="columnsProduct"
        row-key="id"
        class="col-12"
      >
        <template v-slot:top>
          <h2 class="text-h5">Produtos</h2>
          <q-space />
          <q-btn
            v-if="$q.platform.is.desktop"
            icon="mdi-plus"
            color="primary"
            label="Novo produto"
            :to="{ name: 'product-form' }"
          />
        </template>
        <template v-slot:body-cell-imgUrl="props">
          <q-td
            :props="props"
            class="q-gutter-x-sm"
          >
            <q-img
              v-if="props.row.imgUrl"
              :src="props.row.imgUrl"
              :ratio="16 / 9"
            />
            <q-avatar
              v-else
              size="24px"
              font-size="24px"
              text-color="grey"
              icon="mdi-image-off"
              flat
            />
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td
            :props="props"
            class="q-gutter-x-sm"
          >
            <q-btn
              flat
              dense
              color="info"
              icon="mdi-pencil-outline"
              size="sm"
              :to="{ name: 'product-form', params: { id: props.row.id } }"
            >
              <q-tooltip> Editar </q-tooltip>
            </q-btn>
            <q-btn
              flat
              dense
              color="negative"
              icon="mdi-delete-outline"
              size="sm"
              @click="handleRemoveProduct(props.row)"
            >
              <q-tooltip> Deletar </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-page-sticky
      v-if="$q.platform.is.mobile"
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        fab
        icon="mdi-plus"
        color="primary"
        :to="{ name: 'product-form' }"
      />
    </q-page-sticky>
  </q-page>
</template>
