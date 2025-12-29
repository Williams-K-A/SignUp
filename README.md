# Secure Authentication App

A production-ready React authentication system with industrial-level security features.

## Features

### 🔐 Security Features
- **Strong Password Requirements**: Enforced complexity with real-time strength indicator
- **Rate Limiting**: Protection against brute force attacks (5 attempts per 15 minutes)
- **Input Validation**: Comprehensive form validation using Zod schemas
- **Secure Token Storage**: JWT tokens with refresh token rotation
- **Password Hashing**: Bcrypt hashing for password security
- **CSRF Protection**: Token-based CSRF protection
- **Input Sanitization**: XSS protection through input sanitization

### 🎨 User Experience
- **Responsive Design**: Mobile-first responsive design with Tailwind CSS
- **Real-time Validation**: Instant feedback on form inputs
- **Password Strength Indicator**: Visual password strength meter
- **Loading States**: Proper loading indicators and disabled states
- **Error Handling**: Comprehensive error messages and toast notifications
- **Remember Me**: Persistent login sessions

### 🏗️ Architecture
- **TypeScript**: Full type safety throughout the application
- **React Hook Form**: Performant form handling with validation
- **Context API**: Centralized authentication state management
- **Protected Routes**: Route-level authentication guards
- **Modular Components**: Reusable and maintainable component structure

## Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── LoadingSpinner.tsx
│   ├── PasswordStrengthIndicator.tsx
│   └── ProtectedRoute.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx
├── pages/              # Page components
│   ├── Dashboard.tsx
│   ├── LoginPage.tsx
│   └── SignupPage.tsx
├── services/           # API services
│   └── authService.ts
├── types/              # TypeScript type definitions
│   └── auth.ts
├── utils/              # Utility functions
│   ├── security.ts
│   └── validation.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Security Implementation

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter  
- At least one number
- At least one special character (@$!%*?&)

### Rate Limiting
- Maximum 5 login attempts per email
- 15-minute lockout period after exceeding limit
- Automatic cleanup of expired attempts

### Token Management
- JWT access tokens for authentication
- Refresh tokens for token renewal
- Secure storage (localStorage for "Remember Me", sessionStorage otherwise)
- Automatic token cleanup on logout

### Input Validation
- Client-side validation with Zod schemas
- Real-time form validation feedback
- Input sanitization to prevent XSS attacks
- Email format validation
- Name field character restrictions

## Usage Examples

### Basic Login
```typescript
const { login } = useAuth()

const handleLogin = async (credentials: LoginCredentials) => {
  try {
    await login(credentials)
    // User is now authenticated
  } catch (error) {
    // Handle login error
  }
}
```

### Protected Routes
```typescript
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

### Password Strength Checking
```typescript
import { checkPasswordStrength } from './utils/security'

const { score, feedback } = checkPasswordStrength(password)
// score: 0-6, feedback: array of improvement suggestions
```

## Customization

### Styling
The app uses Tailwind CSS for styling. Customize the theme in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
      }
    }
  }
}
```

### Validation Rules
Modify validation schemas in `src/utils/validation.ts`:

```typescript
export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password too short'),
  // Add custom validation rules
})
```

### Security Settings
Adjust security parameters in `src/utils/security.ts`:

```typescript
class RateLimiter {
  private readonly maxAttempts = 5      // Customize max attempts
  private readonly windowMs = 15 * 60 * 1000  // Customize lockout time
}
```

## Production Deployment

### Environment Variables
Create a `.env` file for production:

```env
VITE_API_URL=https://your-api-endpoint.com
VITE_APP_NAME=Your App Name
```

### Backend Integration
Replace the mock `authService` with real API calls:

```typescript
// In src/services/authService.ts
async login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  })
  
  if (!response.ok) {
    throw new Error('Login failed')
  }
  
  return response.json()
}
```

### Security Checklist
- [ ] Enable HTTPS in production
- [ ] Implement proper CORS policies
- [ ] Set up rate limiting on the server
- [ ] Use secure HTTP headers
- [ ] Implement proper session management
- [ ] Set up monitoring and logging
- [ ] Regular security audits

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details