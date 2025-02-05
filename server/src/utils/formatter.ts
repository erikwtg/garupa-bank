export const formatDateToDb = (date: string | Date): string => {
  const d = new Date(date)
  return d.toISOString().slice(0, 19).replace('T', ' ')
}