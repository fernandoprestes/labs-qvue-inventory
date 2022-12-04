import { ColumnsTable } from 'src/@types/ColumnsTable'

import { formatterCurrency } from 'src/utils/formatter'

export const columnsProduct = [
  {
    name: 'id',
    label: '#',
    align: 'left',
    field: 'id'
  },
  {
    name: 'imgUrl',
    label: 'Foto',
    align: 'center',
    field: 'imgUrl'
  },
  {
    name: 'name',
    label: 'Nome',
    align: 'left',
    field: 'name',
    sortable: true
  },
  {
    name: 'amount',
    label: 'Quantidade',
    align: 'left',
    field: 'amount',
    sortable: true
  },
  {
    name: 'price',
    label: 'Preço',
    align: 'left',
    field: 'price',
    sortable: true,
    format: (val) => formatterCurrency(val)
  },
  {
    name: 'actions',
    align: 'right',
    label: 'Ações',
    field: 'actions'
  }
] as ColumnsTable[]
