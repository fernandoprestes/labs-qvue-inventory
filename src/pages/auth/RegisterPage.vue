<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import useAuthUser from 'src/composables/useAuthUser'
  import { useRouter } from 'vue-router'
  import useNotify from 'src/composables/useNotify'

  const { register } = useAuthUser()
  const router = useRouter()
  const { notifySuccess, notifyError } = useNotify()

  const formData = reactive({
    name: '',
    email: '',
    password: ''
  })

  const isLoading = ref(false)

  const onSubmit = async () => {
    try {
      isLoading.value = true
      await register(formData)
      notifySuccess('Cadastro realizado, confirme seu email!')
      router.push({
        name: 'email-confirmation',
        query: { email: formData.email }
      })
    } catch (error) {
      notifyError(`Não foi possível registrar ${error}`)
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
      <h2 class="text-center text-h5">Register</h2>
      <div class="row justify-center">
        <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
          <q-input
            outlined
            v-model="formData.name"
            type="text"
            label="Nome"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Nome obrigatório']"
          />
          <q-input
            outlined
            v-model="formData.email"
            type="email"
            label="Email"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Email obrigatório']"
          />
          <q-input
            outlined
            v-model="formData.password"
            type="password"
            label="Senha"
            lazy-rules
            :rules="[val => (val && val.length > 5) || 'Senha obrigatório']"
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
          label="Cadastrar"
          type="submit"
          color="primary"
          :loading="isLoading"
        />
      </div>
    </q-form>
  </q-page>
</template>
