import { AuthResponse, LoginCredentials, SignupCredentials, User } from '../types/auth'
import { rateLimiter, tokenStorage } from '../utils/security'

// Mock API service - In production, replace with actual API calls
class AuthService {
  private baseURL = '/api/auth' // Replace with your actual API endpoint
  
  // Mock user database (in production, this would be handled by your backend)
  private mockUsers: Array<User & { password: string }> = []

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { email, password, rememberMe } = credentials

    // Check rate limiting
    if (rateLimiter.isBlocked(email)) {
      const remainingTime = Math.ceil(rateLimiter.getRemainingTime(email) / 1000 / 60)
      throw new Error(`Too many login attempts. Please try again in ${remainingTime} minutes.`)
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock authentication (replace with actual API call)
    const user = this.mockUsers.find(u => u.email === email)
    
    if (!user || user.password !== password) {
      rateLimiter.recordAttempt(email)
      throw new Error('Invalid email or password')
    }

    // Generate mock tokens (in production, these come from your backend)
    const token = `mock-jwt-token-${Date.now()}`
    const refreshToken = `mock-refresh-token-${Date.now()}`

    // Store tokens
    tokenStorage.setTokens(token, refreshToken, rememberMe)

    const { password: _, ...userWithoutPassword } = user
    return {
      user: userWithoutPassword,
      token,
      refreshToken
    }
  }

  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    const { firstName, lastName, email, password } = credentials

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Check if user already exists
    if (this.mockUsers.some(u => u.email === email)) {
      throw new Error('An account with this email already exists')
    }

    // Create new user (in production, password would be hashed on backend)
    const newUser: User & { password: string } = {
      id: `user-${Date.now()}`,
      email,
      firstName,
      lastName,
      password, // In production, this would be hashed
      isEmailVerified: false,
      createdAt: new Date().toISOString()
    }

    this.mockUsers.push(newUser)

    // Generate tokens
    const token = `mock-jwt-token-${Date.now()}`
    const refreshToken = `mock-refresh-token-${Date.now()}`

    tokenStorage.setTokens(token, refreshToken)

    const { password: _, ...userWithoutPassword } = newUser
    return {
      user: userWithoutPassword,
      token,
      refreshToken
    }
  }

  async logout(): Promise<void> {
    // In production, you might want to invalidate the token on the server
    tokenStorage.clearTokens()
  }

  async refreshToken(): Promise<string> {
    const refreshToken = tokenStorage.getRefreshToken()
    
    if (!refreshToken) {
      throw new Error('No refresh token available')
    }

    // Simulate API call to refresh token
    await new Promise(resolve => setTimeout(resolve, 500))

    const newToken = `mock-jwt-token-refreshed-${Date.now()}`
    
    // Update stored token
    const currentRefreshToken = tokenStorage.getRefreshToken()
    if (currentRefreshToken) {
      tokenStorage.setTokens(newToken, currentRefreshToken)
    }

    return newToken
  }

  async getCurrentUser(): Promise<User | null> {
    const token = tokenStorage.getToken()
    
    if (!token) {
      return null
    }

    // In production, decode JWT or make API call to get user info
    // For demo, return mock user
    return {
      id: 'current-user',
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe',
      isEmailVerified: true,
      createdAt: new Date().toISOString()
    }
  }

  async sendPasswordReset(email: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    // In production, this would send an actual email
    console.log(`Password reset email sent to ${email}`)
  }

  async verifyEmail(token: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    // In production, this would verify the email token
    console.log(`Email verified with token: ${token}`)
  }
}

export const authService = new AuthService()