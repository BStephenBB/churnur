const SERVER_DOMAIN = process.env.SERVER_DOMAIN

export const logout = async () => {
  const result = await window.fetch(`http://${SERVER_DOMAIN}/logout`, {
    method: 'GET',
    credentials: 'include',
  })
  const json = await result.json()
  console.log(json)
  if (result.ok) {
    return json
  } else {
    return Promise.reject(json)
  }
}
