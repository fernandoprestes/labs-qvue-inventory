import { ColumnsTable } from 'src/@types/ColumnsTable'

export const columnsCategory = [
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
] as ColumnsTable[]
