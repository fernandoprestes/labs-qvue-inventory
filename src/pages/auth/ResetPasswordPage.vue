<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import useAuthUser from 'src/composables/useAuthUser'
  import { useRouter } from 'vue-router'
  import useNotify from 'src/composables/useNotify'

  const { resetPassoword } = useAuthUser()
  const router = useRouter()
  const { notifySuccess, notifyError } = useNotify()

  const formData = reactive({
    password: ''
  })

  const isLoading = ref(false)

  const onSubmit = async () => {
    try {
      isLoading.value = true
      await resetPassoword(formData.password)
      notifySuccess('Nova senha cadastrada!')
      router.replace({ name: 'login' })
    } catch (error) {
      notifyError(`Não foi possível cadastrar uma senha: ${error}`)
    } finally {
      isLoading.value = true
    }
  }
</script>

<template>
  <q-page padding>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <h2 class="text-center text-h5">Cadastre uma nova senha</h2>
      <div class="row justify-center">
        <div class="col-md-4 col-sm-6 col-xs-10">
          <q-input
            outlined
            v-model="formData.password"
            type="password"
            label="Senha"
            lazy-rules
            :rules="[val => (val && val.length > 5) || 'Senha é obrigatória']"
          />
        </div>
      </div>
      <div class="text-center q-gutter-md">
        <q-btn
          label="Enviar"
          type="submit"
          color="primary"
          :loading="isLoading"
        />
      </div>
    </q-form>
  </q-page>
</template>
