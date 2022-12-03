<script lang="ts" setup>
  interface Columns {
    name: string
    label: string
    field: string
    align?: 'left' | 'right' | 'center' | undefined
  }
  const columns = [
    {
      name: 'id',
      label: '#',
      align: 'left',
      field: 'id'
    },
    {
      name: 'name',
      label: 'Nome',
      align: 'left',
      field: 'name'
    },
    {
      name: 'actions',
      align: 'right',
      label: 'Ações',
      field: 'actions'
    }
  ] as Columns[]

  const rows = [
    {
      id: 1,
      name: 'Camisa'
    },
    {
      id: 2,
      name: 'Tênis'
    }
  ]
</script>

<template>
  <q-page padding>
    <div class="row">
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="id"
        class="col-12"
      >
        <template v-slot:top>
          <h2 class="text-h5">Categorias</h2>
          <q-space />
          <q-btn
            icon="mdi-plus"
            color="primary"
            label="Nova categoria"
          />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td
            :props="props"
            class="q-gutter-x-sm"
          >
            <q-btn
              flat
              dense
              color="info"
              icon="mdi-pencil-outline"
              size="sm"
            >
              <q-tooltip> Editar </q-tooltip>
            </q-btn>
            <q-btn
              flat
              dense
              color="negative"
              icon="mdi-delete-outline"
              size="sm"
            >
              <q-tooltip> Deletar </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>
