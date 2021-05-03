export const logout = async () => {
  const result = await window.fetch(`http://localhost:3000/logout`, {
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
