<script lang="ts" setup>
  import useApi from 'src/composables/useApi'
  import useNotify from 'src/composables/useNotify'
  import { Product } from 'src/@types/Product'
  import { onMounted, reactive, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { formatterCurrency } from 'src/utils/formatter'
  import DialogProductDetails from 'components/DialogProductDetails.vue'

  const api = useApi()
  const { notifyError } = useNotify()

  const route = useRoute()

  const products = ref<Product[]>([])
  const isLoading = ref(false)
  const filter = ref('')

  const dialog = reactive({
    open: false,
    product: {} as Product
  })

  const handleDetailsProduct = async (product: Product) => {
    dialog.product = product
    dialog.open = true
  }

  const handleListProducts = async (userId: string) => {
    try {
      isLoading.value = true
      products.value = await api.getPublic('product', userId)
    } catch (error) {
      notifyError(`Não foi possível buscar as categorias!: ${error}`)
    } finally {
      isLoading.value = false
    }
  }

  onMounted(async () => {
    if (route.params.id) {
      await handleListProducts(route.params.id.toString())
    }
  })
</script>

<template>
  <q-page padding>
    <div class="row">
      <q-table
        grid
        :rows="products"
        row-key="id"
        class="col-12"
        :filter="filter"
      >
        <template v-slot:top>
          <h2 class="text-h5">Produtos</h2>
          <q-space />
          <q-input
            outlined
            dense
            debounce="300"
            v-model="filter"
            placeholder="Buscar um produto"
          >
            <template v-slot:append>
              <q-icon name="mdi-magnify" />
            </template>
          </q-input>
        </template>
        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <q-card
              class="cursor-pointer"
              v-ripple:primary
              @click="handleDetailsProduct(props.row)"
            >
              <q-card-section class="text-center">
                <q-img
                  :src="props.row.imgUrl"
                  :ratio="4 / 3"
                  spinner-color="primary"
                  spinner-size="82px"
                />
                <h2 class="text-h6">{{ props.row.name }}</h2>
                <strong class="text-subtitle2">{{
                  formatterCurrency(props.row.price)
                }}</strong>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
  <DialogProductDetails
    v-model="dialog.open"
    :product="dialog.product"
  />
</template>
