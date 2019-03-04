export default function formatedDate (value) {
  if (value instanceof Date) {
    return value.toLocaleDateString()
  }
  return value.toDate().toLocaleDateString()
}
