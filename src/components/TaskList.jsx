import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import TaskItem from './TaskItem'
import TaskForm from './TaskForm'

export default function TaskList({ session }) {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')

  const fetchTasks = async () => {
    const { data } = await supabase
      .from('tasks').select('*').order('created_at', { ascending: false })
    setTasks(data || [])
  }

  useEffect(() => {
    fetchTasks()
    const channel = supabase.channel('tasks-channel')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'tasks',
          filter: `user_id=eq.${session.user.id}` },
        () => fetchTasks()
      ).subscribe()
    return () => supabase.removeChannel(channel)
  }, [])

  const filtered = tasks.filter(t =>
    filter === 'all' ? true : filter === 'active' ? !t.is_complete : t.is_complete
  )

  return (
    <div className='app-container'>
      <header className='app-header'>
        <h1>My Tasks</h1>
        <div>
          <span>{session.user.email}</span>
          <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
        </div>
      </header>
      <TaskForm userId={session.user.id} onTaskAdded={fetchTasks} />
      <div className='filter-bar'>
        {['all','active','completed'].map(f => (
          <button key={f} className={filter===f?'active':''} onClick={()=>setFilter(f)}>
            {f[0].toUpperCase()+f.slice(1)}
          </button>
        ))}
        <span>{filtered.length} task(s)</span>
      </div>
      {filtered.length === 0
        ? <p className='empty'>No tasks here. Add one above!</p>
        : filtered.map(t => <TaskItem key={t.id} task={t} onUpdate={fetchTasks} />)
      }
    </div>
  )
}