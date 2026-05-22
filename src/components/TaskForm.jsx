import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function TaskForm({ userId, onTaskAdded }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    const { error } = await supabase
      .from('tasks')
      .insert([{ title, priority, user_id: userId }])
    if (!error) { setTitle(''); onTaskAdded() }
    else alert('Error: ' + error.message)
  }

  return (
    <form className='task-form' onSubmit={handleSubmit}>
      <h3>Add New Task</h3>
      <input type='text' placeholder='Task title' value={title}
        onChange={e => setTitle(e.target.value)} required />
      <select value={priority} onChange={e => setPriority(e.target.value)}>
        <option value='low'>Low</option>
        <option value='medium'>Medium</option>
        <option value='high'>High</option>
      </select>
      <button type='submit'>Add Task</button>
    </form>
  )
}