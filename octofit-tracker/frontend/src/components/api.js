import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
export const hasApiConfiguration = Boolean(codespaceName)
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : '/api'

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.results)) return payload.results
  return []
}

export function useCollection(resource) {
  const [state, setState] = useState({ data: [], loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const response = await fetch(`${apiBaseUrl}/${resource}/`, { signal: controller.signal })
        if (!response.ok) throw new Error(`Request failed (${response.status})`)
        const payload = await response.json()
        setState({ data: normalizeCollection(payload), loading: false, error: '' })
      } catch (error) {
        if (error.name !== 'AbortError') {
          setState({ data: [], loading: false, error: error.message || 'Unable to load data' })
        }
      }
    }

    load()
    return () => controller.abort()
  }, [resource])

  return state
}

export function formatDate(value) {
  if (!value) return 'No date'
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(value))
}
