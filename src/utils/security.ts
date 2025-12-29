import bcrypt from 'bcryptjs'

// Password strength checker
export const checkPasswordStrength = (password: string): {
  score: number
  feedback: string[]
} => {
  const feedback: string[] = []
  let score = 0

  if (password.length >= 8) score += 1
  else feedback.push('Use at least 8 characters')

  if (/[a-z]/.test(password)) score += 1
  else feedback.push('Add lowercase letters')

  if (/[A-Z]/.test(password)) score += 1
  else feedback.push('Add uppercase letters')

  if (/\d/.test(password)) score += 1
  else feedback.push('Add numbers')

  if (/[@$!%*?&]/.test(password)) score += 1
  else feedback.push('Add special characters (@$!%*?&)')

  if (password.length >= 12) score += 1

  return { score, feedback }
}

// Rate limiting for login attempts
class RateLimiter {
  private attempts: Map<string, { count: number; lastAttempt: number }> = new Map()
  private readonly maxAttempts = 5
  private readonly windowMs = 15 * 60 * 1000 // 15 minutes

  isBlocked(identifier: string): boolean {
    const record = this.attempts.get(identifier)
    if (!record) return false

    const now = Date.now()
    if (now - record.lastAttempt > this.windowMs) {
      this.attempts.delete(identifier)
      return false
    }

    return record.count >= this.maxAttempts
  }

  recordAttempt(identifier: string): void {
    const now = Date.now()
    const record = this.attempts.get(identifier)

    if (!record || now - record.lastAttempt > this.windowMs) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now })
    } else {
      record.count += 1
      record.lastAttempt = now
    }
  }

  getRemainingTime(identifier: string): number {
    const record = this.attempts.get(identifier)
    if (!record) return 0

    const elapsed = Date.now() - record.lastAttempt
    return Math.max(0, this.windowMs - elapsed)
  }
}

export const rateLimiter = new RateLimiter()

// Secure token storage
export const tokenStorage = {
  setTokens: (token: string, refreshToken: string, rememberMe = false) => {
    const storage = rememberMe ? localStorage : sessionStorage
    storage.setItem('authToken', token)
    storage.setItem('refreshToken', refreshToken)
  },

  getToken: (): string | null => {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken')
  },

  clearTokens: () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('refreshToken')
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('refreshToken')
  }
}

// Input sanitization
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '')
}

// CSRF token generation (for demo purposes)
export const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}