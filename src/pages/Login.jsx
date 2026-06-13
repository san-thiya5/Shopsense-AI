import { useState } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit() {
    if (!email || !password) {
      setError('Please fill all fields!')
      return
    }
    setLoading(true)
    setError('')
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      onLogin()
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-md border border-slate-700">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-sky-400">🛒 ShopSense AI</h1>
          <p className="text-slate-400 mt-2 text-sm">Smart Business Assistant for Rural India</p>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {isRegister ? 'Create Account' : 'Welcome Back!'}
        </h2>

        {/* Error */}
        {error && (
          <div className="bg-red-500 text-white text-sm px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="text-slate-400 text-sm mb-1 block">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-slate-400 text-sm mb-1 block">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl transition"
        >
          {loading ? 'Please wait...' : isRegister ? 'Register' : 'Login'}
        </button>

        {/* Toggle */}
        <p className="text-center text-slate-400 text-sm mt-4">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}
          <button
            onClick={() => { setIsRegister(!isRegister); setError('') }}
            className="text-sky-400 font-medium ml-1 hover:underline"
          >
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>

      </div>
    </div>
  )
}

export default Login