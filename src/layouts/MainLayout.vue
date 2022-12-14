<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useQuasar } from 'quasar'
  import { useRouter } from 'vue-router'
  import useAuthUser from 'src/composables/useAuthUser'
  import EssentialLink, {
    EssentialLinkProps
  } from 'components/EssentialLink.vue'
  import useApi from 'src/composables/useApi'

  const { logout } = useAuthUser()
  const router = useRouter()
  const $q = useQuasar()

  const { getBrand } = useApi()

  const storeName = ref()

  const essentialLinks: EssentialLinkProps[] = [
    {
      title: 'Home',
      icon: 'mdi-home',
      routeName: 'me'
    },
    {
      title: 'Categorias',
      icon: 'mdi-shape-outline',
      routeName: 'category'
    },
    {
      title: 'Produtos',
      icon: 'mdi-package-variant-closed',
      routeName: 'product'
    },
    {
      title: 'Configuração',
      icon: 'mdi-cog',
      routeName: 'config-form'
    }
  ]

  const leftDrawerOpen = ref(false)

  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }

  const handleLogout = async () => {
    $q.dialog({
      title: 'Deseja sair',
      message: 'Realmente deseja sair?',
      cancel: true,
      persistent: true
    }).onOk(async () => {
      await logout()
      router.replace({ name: 'login' })
    })
  }

  onMounted(async () => {
    storeName.value = await getBrand()
  })
</script>

<template>
  <q-layout view="hHh Lpr lFf">
    <q-header bordered>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> {{ storeName?.name }} </q-toolbar-title>

        <div>
          <q-btn-dropdown
            flat
            icon="person"
          >
            <q-list>
              <q-item
                clickable
                v-close-popup
              >
                <q-item-section>
                  <q-item-label @click="handleLogout">Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
