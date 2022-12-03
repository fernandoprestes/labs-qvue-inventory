<script lang="ts" setup>
  import useApi from 'src/composables/useApi'
  import useNotify from 'src/composables/useNotify'
  import { computed, onMounted, reactive } from 'vue'
  import { useRouter, useRoute } from 'vue-router'

  const router = useRouter()
  const route = useRoute()
  const { notifySuccess, notifyError } = useNotify()
  const api = useApi()

  const form = reactive({
    data: {
      name: ''
    },
    isLoading: false
  })

  const isUpdate = computed(() => route.params.id)

  const onSubmit = async () => {
    try {
      form.isLoading = true
      if (isUpdate.value) {
        await api.update('category', form.data)
        notifySuccess('Categoria atualizada com sucesso!')
      } else {
        await api.post('category', form.data)
        notifySuccess('Categoria cadastrada com sucesso!')
      }
      router.push({ name: 'category' })
    } catch (error) {
      notifyError(`Não foi possível cadastrar: ${error}`)
    } finally {
      form.isLoading = false
    }
  }

  onMounted(async () => {
    if (isUpdate.value) {
      const id = route.params.id
      form.data = await api.getById('category', id.toString())
      if (!form.data) {
        notifyError('Produto não encontrado')
        router.push({ name: 'category' })
      }
    }
  })
</script>

<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
          <h2 class="text-h5 text-center">Nova categoria</h2>
          <div>
            <q-input
              outlined
              v-model="form.data.name"
              type="text"
              label="Nome"
              color="primary"
              :rules="[val => (val && val.length > 0) || 'Nome é obrigatório']"
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
              :to="{ name: 'category' }"
            />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>
<style lang="scss" scoped>
  .button-wrapper {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
  }
</style>
