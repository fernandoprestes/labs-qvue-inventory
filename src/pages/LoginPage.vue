<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import useAuthUser from 'src/composables/useAuthUser'
  import { useRouter } from 'vue-router'
  import useNotify from 'src/composables/useNotify'

  const { login } = useAuthUser()
  const { notifyError } = useNotify()
  const router = useRouter()

  const formData = reactive({
    email: '',
    password: ''
  })

  const isLoading = ref(false)

  const onSubmit = async () => {
    try {
      isLoading.value = true
      await login(formData)
      router.replace({ name: 'me' })
    } catch (error) {
      notifyError(`Não foi possível logar: ${error}`)
    } finally {
      isLoading.value = false
    }
  }
</script>

<template>
  <q-page padding>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md justify-center"
    >
      <h2 class="text-h5 text-center">Login</h2>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
        <q-input
          outlined
          lazy-rules
          label="Email"
          type="email"
          autocomplete="off"
          v-model="formData.email"
          :rules="[val => (val && val.length > 0) || 'Email obrigatório']"
        />
        <q-input
          outlined
          label="Senha"
          type="password"
          v-model="formData.password"
        />
      </div>
      <div class="text-center button-wrapper">
        <q-btn
          color="primary"
          label="Login"
          type="submit"
          :loading="isLoading"
        />
        <q-btn
          flat
          color="primary"
          label="Registrar"
          type="submit"
          :to="{ name: 'register' }"
        />
        <q-btn
          flat
          color="primary"
          label="Esqueceu a senha?"
          :to="{ name: 'forgot-password' }"
        />
      </div>
    </q-form>
  </q-page>
</template>
<style lang="scss" scoped>
  .button-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    max-width: 250px;
    justify-content: center;
    margin: 24px auto 0;
  }
</style>
