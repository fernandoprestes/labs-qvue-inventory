<script lang="ts" setup>
  import { reactive } from 'vue'
  import useAuthUser from 'src/composables/useAuthUser'
  import { useRouter } from 'vue-router'

  const { login } = useAuthUser()
  const router = useRouter()

  const formData = reactive({
    email: '',
    password: ''
  })

  const onSubmit = async () => {
    try {
      await login(formData)
      router.replace({ name: 'me' })
    } catch (error) {
      console.log(error)
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
          label="Email"
          type="email"
          v-model="formData.email"
        />
        <q-input
          outlined
          label="Senha"
          type="password"
          v-model="formData.password"
        />
      </div>
      <div class="text-center">
        <q-btn
          color="primary"
          label="Login"
          type="submit"
        />
      </div>
    </q-form>
    <div class="text-center q-mt-md">
      <q-btn
        flat
        color="primary"
        label="Registrar"
        type="submit"
        :to="{ name: 'register' }"
      />
    </div>
  </q-page>
</template>
