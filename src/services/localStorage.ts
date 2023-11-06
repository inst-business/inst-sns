
const cookieFallBack = (() => {

  const item = localStorage.getItem('cookieFallBack')

  const get = JSON.parse(<string>item)
  // const isEmpty = get?.length === 0
  const isEmpty = item === '[]' || item === null

  return {
    get,
    isEmpty
  }
})()

export {
  cookieFallBack
}