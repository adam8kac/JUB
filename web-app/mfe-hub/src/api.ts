export const API_BASE = 'http://localhost:3000'

function getHeaders(auth = false) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (auth) {
    const token = localStorage.getItem('token')
    if (token) headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

export async function apiGet(path: string, auth = false) {
  const res = await fetch(`${API_BASE}${path}`, { headers: getHeaders(auth) })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function apiPost(path: string, body: unknown, auth = false) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: getHeaders(auth),
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function apiPatch(path: string, body: unknown, auth = false) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'PATCH',
    headers: getHeaders(auth),
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function apiDelete(path: string, auth = false) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'DELETE',
    headers: getHeaders(auth),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
