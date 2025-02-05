export const formattedBalance = (amount) => {
  return parseInt(amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || 'R$ 0,00'
}

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}