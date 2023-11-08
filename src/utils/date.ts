
const format = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }

  const date = new Date(dateString)
  const formattedDate = date.toLocaleDateString('en-US', options)

  const time = date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  })

  return `${formattedDate} at ${time}`
}

const _Date = (() => ({
  format,
}))()

export default _Date