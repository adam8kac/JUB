import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

export interface User {
  id: string
  email: string
  role: 'candidate' | 'employer'
  name?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const loadFromStorage = useCallback(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    if (storedToken && storedUser) {
      try {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    } else {
      setToken(null)
      setUser(null)
    }
  }, [])

  useEffect(() => {
    loadFromStorage()
    window.addEventListener('auth-change', loadFromStorage)
    return () => window.removeEventListener('auth-change', loadFromStorage)
  }, [loadFromStorage])

  const login = useCallback((userData: User, accessToken: string) => {
    localStorage.setItem('token', accessToken)
    localStorage.setItem('user', JSON.stringify(userData))
    setToken(accessToken)
    setUser(userData)
    window.dispatchEvent(new Event('auth-change'))
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
    window.dispatchEvent(new Event('auth-change'))
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
