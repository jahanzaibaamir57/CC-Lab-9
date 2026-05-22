import { supabase } from '../lib/supabaseClient'

export default function TaskItem({ task, onUpdate }) {
  const toggle = async () => {
    await supabase.from('tasks')
      .update({ is_complete: !task.is_complete }).eq('id', task.id)
    onUpdate()
  }
  const remove = async () => {
    if (!window.confirm('Delete this task?')) return
    await supabase.from('tasks').delete().eq('id', task.id)
    onUpdate()
  }
  const colours = { high: '#c0392b', medium: '#e67e22', low: '#27ae60' }
  return (
    <div className={`task-item ${task.is_complete ? 'completed' : ''}`}>
      <div className='task-main'>
        <input type='checkbox' checked={task.is_complete} onChange={toggle} />
        <span className='task-title'>{task.title}</span>
      </div>
      <div className='task-meta'>
        <span className='badge' style={{ background: colours[task.priority] }}>
          {task.priority}
        </span>
        <button className='del-btn' onClick={remove}>Delete</button>
      </div>
    </div>
  )
}