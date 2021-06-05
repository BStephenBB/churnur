const NEXT_PUBLIC_SERVER_DOMAIN = process.env.NEXT_PUBLIC_SERVER_DOMAIN

const PREFIX = `http${
  process.env.NODE_ENV === 'development' ? '' : 's'
}://${NEXT_PUBLIC_SERVER_DOMAIN}`

const GET = async (path: string) => {
  const response = await window.fetch(PREFIX + path, {
    method: 'GET',
    credentials: 'include',
  })

  const json = await response.json()
  if (response.ok) {
    return json
  } else {
    return Promise.reject(json)
  }
}

const POST = async (path: string, body: Record<string, string | number>) => {
  const response = await window.fetch(PREFIX + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  })

  const json = await response.json()
  if (response.ok) {
    return json
  } else {
    return Promise.reject(json)
  }
}

const PATCH = async (path: string, body: Record<string, string | number>) => {
  const response = await window.fetch(PREFIX + path, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  })

  const json = await response.json()
  if (response.ok) {
    return json
  } else {
    return Promise.reject(json)
  }
}

export const api = { GET, PATCH, POST }
