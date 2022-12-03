<script setup lang="ts">
  import { reactive } from 'vue'
  import useAuthUser from 'src/composables/useAuthUser'
  import { useRouter } from 'vue-router'

  const { register } = useAuthUser()
  const router = useRouter()

  const formData = reactive({
    name: '',
    email: '',
    password: ''
  })

  const onSubmit = async () => {
    try {
      await register(formData)
      router.push({
        name: 'email-confirmation',
        query: { email: formData.email }
      })
    } catch (error) {
      console.log(error)
    }
  }
</script>
<template>
  <q-page padding>
    <h2 class="text-center text-h5">Register</h2>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <q-input
        v-model="formData.name"
        type="text"
        label="Nome"
      />
      <q-input
        v-model="formData.email"
        type="email"
        label="Email"
      />
      <q-input
        v-model="formData.password"
        type="password"
        label="Senha"
      />
      <div class="text-center">
        <q-btn
          label="Submit"
          type="submit"
          color="primary"
        />
        <q-btn
          label="Cancelar"
          type="reset"
          color="primary"
          class="q-ml-sm"
          flat
        />
      </div>
    </q-form>
  </q-page>
</template>
