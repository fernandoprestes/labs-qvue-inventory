<script lang="ts" setup>
  import { Category } from 'src/@types/Category'
  import useApi from 'src/composables/useApi'
  import useNotify from 'src/composables/useNotify'
  import { computed, onMounted, reactive, ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'

  const router = useRouter()
  const route = useRoute()
  const { notifySuccess, notifyError } = useNotify()
  const api = useApi()

  const form = reactive({
    data: {
      name: '',
      description: '',
      amount: '',
      price: '',
      category: '',
      imgUrl: ''
    },
    optionsCategories: [] as Category[],
    isLoading: false
  })
  const img = ref()
  const isUpdate = computed(() => route.params.id)

  const onSubmit = async () => {
    try {
      form.isLoading = true
      if (img.value.length > 0) {
        const imgUrl = await api.uploadImg(img.value[0], 'products')
        form.data.imgUrl = imgUrl
      }
      if (isUpdate.value) {
        await api.update('product', form.data)
        notifySuccess('Produto atualizado com sucesso!')
      } else {
        await api.post('product', form.data)
        notifySuccess('Produto cadastrado com sucesso!')
      }
      router.push({ name: 'product' })
    } catch (error) {
      notifyError(`Não foi possível cadastrar: ${error}`)
    } finally {
      form.isLoading = false
    }
  }

  const getCategories = async () => {
    form.optionsCategories = await api.get('category')
  }

  onMounted(async () => {
    await getCategories()
    if (isUpdate.value) {
      const id = route.params.id
      form.data = await api.getById('product', id.toString())
      if (!form.data) {
        notifyError('Produto não encontrado')
        router.push({ name: 'product' })
      }
    }
  })
</script>

<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm q-pt-md">
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
          <h2 class="text-h5 text-center">Novo Produto</h2>
          <div class="column q-gutter-y-md">
            <q-input
              outlined
              type="file"
              label="Imagem"
              stack-label
              v-model="img"
              accept="image/*"
            />
            <q-input
              outlined
              v-model="form.data.name"
              type="text"
              label="Nome"
              color="primary"
              :rules="[val => (val && val.length > 0) || 'Nome é obrigatório']"
            />
            <q-editor
              v-model="form.data.description"
              min-height="5rem"
            />
            <q-input
              outlined
              v-model="form.data.amount"
              type="number"
              label="Quantidade em estoque"
              :rules="[val => !!val || 'Quantidade é obrigatório']"
            />
            <q-input
              outlined
              v-model="form.data.price"
              type="text"
              label="Preço"
              onkeydown="return event.keyCode !== 69"
              prefix="R$"
              :rules="[val => !!val || 'Quantidade é obrigatório']"
            />
            <q-select
              v-model="form.data.category"
              :options="form.optionsCategories"
              option-value="id"
              option-label="name"
              label="Categoria"
              outlined
              map-options
              emit-value
              :rules="[val => !!val || 'Categoria é obrigatório']"
            />
          </div>
          <div class="button-wrapper">
            <q-btn
              :label="isUpdate ? 'Atualizar' : 'Salvar'"
              type="submit"
              color="primary"
              :loading="form.isLoading"
            />
            <q-btn
              flat
              label="Cancelar"
              color="primary"
              :to="{ name: 'product' }"
            />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>
