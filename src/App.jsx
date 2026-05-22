import { useState, useEffect } from 'react'
import { supabase } from './lib/supabaseClient'
import Auth from './components/Auth'
import TaskList from './components/TaskList'
import './App.css'

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_e, session) => setSession(session)
    )
    return () => subscription.unsubscribe()
  }, [])

  if (loading) return <div className='loading'>Loading...</div>
  return session ? (
    <div>
      <div className='app-topbar'>
        <div className='brand'>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="6" fill="#0F7B6C"/>
            <path d="M6 12.5l3 3 7-9" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className='brand-text'>
            <h1>Wahab Tasks</h1>
            <small>Simple, focused to-dos with Supabase</small>
          </div>
        </div>
      </div>
      {<TaskList session={session} />}
    </div>
  ) : <Auth />
}