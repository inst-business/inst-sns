
const cookieFallBack = (() => {

  const get = JSON.parse(<string>localStorage.getItem('cookieFallBack'))
  const isEmpty = get?.length === 0

  return {
    get,
    isEmpty
  }
})()

export {
  cookieFallBack
}