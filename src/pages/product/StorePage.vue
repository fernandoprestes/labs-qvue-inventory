<script lang="ts" setup>
  import useApi from 'src/composables/useApi'
  import useNotify from 'src/composables/useNotify'
  import { Product } from 'src/@types/Product'
  import { computed, onMounted, reactive, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { formatterCurrency } from 'src/utils/formatter'
  import DialogProductDetails from 'components/DialogProductDetails.vue'
  import { initialPagination } from './columnsTable'

  const api = useApi()
  const { notifyError } = useNotify()

  const route = useRoute()

  const products = ref<Product[]>([])
  const isLoading = ref(false)
  const filter = ref('')
  const categoryId = ref('')

  const paramsId = route.params.id.toString()

  const optionsCategories = ref()

  const pagesNumber = computed(() =>
    Math.ceil(products.value.length / initialPagination.value.rowPerPage)
  )

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
      products.value = categoryId.value
        ? await api.getPublic('product', userId, 'category', categoryId.value)
        : await api.getPublic('product', userId)
    } catch (error) {
      notifyError(`Não foi possível buscar os produtos!: ${error}`)
    } finally {
      isLoading.value = false
    }
  }

  const handleScrollToTop = async () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getCategories = async (userId: string) => {
    optionsCategories.value = await api.getPublic('category', userId)
  }

  onMounted(async () => {
    if (route.params.id) {
      await getCategories(route.params.id.toString())
      await handleListProducts(route.params.id.toString())
    }
  })
</script>

<template>
  <q-page padding>
    <div class="row">
      <q-select
        class="col-4"
        outlined
        dense
        clearable
        v-model="categoryId"
        :options="optionsCategories"
        option-value="id"
        option-label="name"
        map-options
        emit-value
        label="Categoria"
        @update:model-value="handleListProducts(paramsId)"
      />
      <q-table
        grid
        :rows="products"
        row-key="id"
        class="col-12"
        :filter="filter"
        v-model:pagination="initialPagination"
        hide-pagination
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
      <div class="row justify-center col-12 q-mt-md">
        <q-pagination
          v-model="initialPagination.page"
          :max="pagesNumber"
          @update:model-value="handleScrollToTop"
          direction-links
        />
      </div>
    </div>
  </q-page>
  <DialogProductDetails
    v-model="dialog.open"
    :product="dialog.product"
  />
</template>
