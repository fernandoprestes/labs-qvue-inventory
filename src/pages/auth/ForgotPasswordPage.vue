<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import useAuthUser from 'src/composables/useAuthUser'
  import useNotify from 'src/composables/useNotify'

  const { sendPasswordRestEmail } = useAuthUser()
  const { notifySuccess, notifyError } = useNotify()

  const formData = reactive({
    email: ''
  })

  const isLoading = ref(false)

  const onSubmit = async () => {
    try {
      isLoading.value = true
      await sendPasswordRestEmail(formData.email)
      notifySuccess(`Email de recuperação enviado para ${formData.email}`)
    } catch (error) {
      notifyError(`Não foi possível recuperar a senha: ${error}`)
    } finally {
      isLoading.value = false
    }
  }
</script>

<template>
  <q-page padding>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <h2 class="text-center text-h5">Esqueci a senha?</h2>
      <div class="row justify-center">
        <div class="col-md-4 col-sm-6 col-xs-10">
          <q-input
            outlined
            v-model="formData.email"
            type="email"
            label="Email"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Email obrigatório']"
          />
        </div>
      </div>
      <div class="text-center q-gutter-md">
        <q-btn
          flat
          label="Cancelar"
          type="reset"
          class="q-ml-sm"
          :to="{ name: 'login' }"
        />
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
