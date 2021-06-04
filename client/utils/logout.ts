const NEXT_PUBLIC_SERVER_DOMAIN = process.env.NEXT_PUBLIC_SERVER_DOMAIN

export const logout = async () => {
  const result = await window.fetch(
    `https://${NEXT_PUBLIC_SERVER_DOMAIN}/logout`,
    {
      method: 'GET',
      credentials: 'include',
    }
  )
  const json = await result.json()
  console.log(json)
  if (result.ok) {
    return json
  } else {
    return Promise.reject(json)
  }
}
