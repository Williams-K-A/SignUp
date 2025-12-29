import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { AuthState, User, LoginCredentials, SignupCredentials } from '../types/auth'
import { authService } from '../services/authService'
import toast from 'react-hot-toast'

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  signup: (credentials: SignupCredentials) => Promise<void>
  logout: () => Promise<void>
  refreshToken: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'LOGOUT' }

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_USER':
      return { 
        ...state, 
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false
      }
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload }
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false, isLoading: false }
    default:
      return state
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authService.getCurrentUser()
        dispatch({ type: 'SET_USER', payload: user })
      } catch (error) {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }

    checkAuth()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await authService.login(credentials)
      dispatch({ type: 'SET_USER', payload: response.user })
      toast.success('Login successful!')
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false })
      const message = error instanceof Error ? error.message : 'Login failed'
      toast.error(message)
      throw error
    }
  }

  const signup = async (credentials: SignupCredentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await authService.signup(credentials)
      dispatch({ type: 'SET_USER', payload: response.user })
      toast.success('Account created successfully!')
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false })
      const message = error instanceof Error ? error.message : 'Signup failed'
      toast.error(message)
      throw error
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      dispatch({ type: 'LOGOUT' })
      toast.success('Logged out successfully')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Logout failed'
      toast.error(message)
    }
  }

  const refreshToken = async () => {
    try {
      await authService.refreshToken()
    } catch (error) {
      // If refresh fails, logout user
      dispatch({ type: 'LOGOUT' })
      throw error
    }
  }

  const value: AuthContextType = {
    ...state,
    login,
    signup,
    logout,
    refreshToken
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}