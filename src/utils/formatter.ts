export const formatterCurrency = (currency: number) => {
  const formatted = currency.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  })
  return formatted
}
