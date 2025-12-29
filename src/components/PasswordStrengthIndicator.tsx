import { checkPasswordStrength } from '../utils/security'

interface PasswordStrengthIndicatorProps {
  password: string
}

export default function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  if (!password) return null

  const { score, feedback } = checkPasswordStrength(password)
  
  const getStrengthColor = (score: number) => {
    if (score <= 2) return 'bg-red-500'
    if (score <= 4) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getStrengthText = (score: number) => {
    if (score <= 2) return 'Weak'
    if (score <= 4) return 'Medium'
    return 'Strong'
  }

  return (
    <div className="mt-2">
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(score)}`}
            style={{ width: `${(score / 6) * 100}%` }}
          />
        </div>
        <span className={`text-sm font-medium ${
          score <= 2 ? 'text-red-600' : score <= 4 ? 'text-yellow-600' : 'text-green-600'
        }`}>
          {getStrengthText(score)}
        </span>
      </div>
      
      {feedback.length > 0 && (
        <ul className="mt-2 text-sm text-gray-600">
          {feedback.map((item, index) => (
            <li key={index} className="flex items-center">
              <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}