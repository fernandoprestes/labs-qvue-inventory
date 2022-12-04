<script lang="ts" setup>
  import { Category } from 'src/@types/Category'
  import useApi from 'src/composables/useApi'
  import useNotify from 'src/composables/useNotify'
  import { onMounted, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import useBrand from 'src/composables/useBrand'
  import useAuthUser from 'src/composables/useAuthUser'

  const router = useRouter()
  const { notifySuccess, notifyError } = useNotify()
  const api = useApi()
  const { data } = useAuthUser()
  const user = data.user
  const { setBrand } = useBrand()

  const form = reactive({
    data: {
      name: '',
      phone: '',
      primary: '',
      secondary: ''
    },
    optionsCategories: [] as Category[],
    isLoading: false,
    isUpdate: false
  })

  const onSubmit = async () => {
    try {
      form.isLoading = true
      if (form.isUpdate) {
        await api.update('config', form.data)
        notifySuccess('Brand atualizada com sucesso!')
      } else {
        await api.post('config', form.data)
        notifySuccess('Brand cadastrado com sucesso!')
      }
      setBrand(form.data.primary, form.data.secondary)
      router.push({ name: 'me' })
    } catch (error) {
      notifyError(`Não foi possível cadastrar: ${error}`)
    } finally {
      form.isLoading = false
    }
  }

  onMounted(async () => {
    const config = await api.getPublic('config', user?.id || '')
    if (config) {
      form.isUpdate = true
      form.data = config[0]
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
          <h2 class="text-h5 text-center">Configurações</h2>
          <div class="column q-gutter-y-md">
            <q-input
              outlined
              v-model="form.data.name"
              type="text"
              label="Nome da loja"
              color="primary"
              :rules="[val => (val && val.length > 0) || 'Nome é obrigatório']"
            />
            <q-input
              outlined
              v-model="form.data.phone"
              type="text"
              mask="(##) # ####-####"
              unmasked-value
              label="Telefone"
              :rules="[val => !!val || 'Telefone é obrigatório']"
            />

            <div class="row justify-around">
              <div class="col-md-6">
                <p>Cor Primaria</p>
                <q-color v-model="form.data.primary" />
              </div>
              <div class="col-md-6">
                <p>Cor Secundaria</p>
                <q-color v-model="form.data.secondary" />
              </div>
            </div>
          </div>
          <div class="button-wrapper">
            <q-btn
              :label="form.isUpdate ? 'Atualizar' : 'Salvar'"
              type="submit"
              color="primary"
              :loading="form.isLoading"
            />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>
