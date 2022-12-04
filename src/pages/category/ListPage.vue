<script lang="ts" setup>
  import useApi from 'src/composables/useApi'
  import useNotify from 'src/composables/useNotify'
  import { onMounted, ref } from 'vue'
  import { Category } from 'src/@types/Category'
  import { useQuasar } from 'quasar'
  import { columnsCategory } from './columnsTable'
  import useAuthUser from 'src/composables/useAuthUser'

  const { data } = useAuthUser()
  const user = data.user

  const api = useApi()
  const $q = useQuasar()
  const { notifySuccess, notifyError } = useNotify()

  const categories = ref<Category[]>([])
  const isLoading = ref(false)

  const handleListCategories = async () => {
    try {
      isLoading.value = true
      categories.value = await api.getPublic('category', user?.id || '')
    } catch (error) {
      notifyError(`Não foi possível buscar as categorias!: ${error}`)
    } finally {
      isLoading.value = false
    }
  }

  const handleRemoveCategory = async (category: Category) => {
    try {
      $q.dialog({
        title: 'Deletar uma Categoria',
        message: `Realmente deseja remover ${category.name.toLocaleUpperCase()} ?`,
        cancel: true,
        persistent: true
      }).onOk(async () => {
        await api.remover('category', category.id)
        notifySuccess('Categoria removida com sucesso!')
        categories.value = []
        await handleListCategories()
      })
    } catch (error) {
      notifyError(`Não foi possível remover a categoria!: ${error}`)
    }
  }

  onMounted(async () => {
    await handleListCategories()
  })
</script>

<template>
  <q-page padding>
    <div class="row">
      <q-table
        :rows="categories"
        :columns="columnsCategory"
        :loading="isLoading"
        row-key="id"
        class="col-12"
      >
        <template v-slot:top>
          <h2 class="text-h5">Categorias</h2>
          <q-space />
          <q-btn
            v-if="$q.platform.is.desktop"
            icon="mdi-plus"
            color="primary"
            label="Nova categoria"
            :to="{ name: 'category-form' }"
          />
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
              :to="{ name: 'category-form', params: { id: props.row.id } }"
            >
              <q-tooltip> Editar </q-tooltip>
            </q-btn>
            <q-btn
              flat
              dense
              color="negative"
              icon="mdi-delete-outline"
              size="sm"
              @click="handleRemoveCategory(props.row)"
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
        :to="{ name: 'category-form' }"
      />
    </q-page-sticky>
  </q-page>
</template>
