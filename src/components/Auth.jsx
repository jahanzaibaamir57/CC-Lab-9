import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    let error
    if (isSignUp) {
      const res = await supabase.auth.signUp({ email, password })
      error = res.error
      if (!error) setMessage('Account created! You can now sign in.')
    } else {
      const res = await supabase.auth.signInWithPassword({ email, password })
      error = res.error
    }
    if (error) setMessage(error.message)
    setLoading(false)
  }

  return (
    <div className='auth-container'>
      <h1>BSE-6 Task Manager</h1>
      <h2>{isSignUp ? 'Create Account' : 'Sign In'}</h2>
      {message && <p className='message'>{message}</p>}
      <form onSubmit={handleAuth}>
        <input type='email' placeholder='Email' value={email}
          onChange={e => setEmail(e.target.value)} required />
        <input type='password' placeholder='Password' value={password}
          onChange={e => setPassword(e.target.value)} required />
        <button type='submit' disabled={loading}>
          {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>
      <button className='toggle-btn' onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Sign In' : 'No account? Sign Up'}
      </button>
    </div>
  )
}