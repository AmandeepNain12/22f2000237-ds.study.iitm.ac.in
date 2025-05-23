import { useState } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim() === '') return;
    setTasks([...tasks, { text: input, completed: false }]);
    setInput('');
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const removeTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div style={styles.container}>
      <h1>My To-Do List</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a new task..."
        style={styles.input}
      />
      <button onClick={addTask} style={styles.button}>Add Task</button>
      <ul style={styles.list}>
        {tasks.map((task, index) => (
          <li
            key={index}
            onClick={() => toggleTask(index)}
            style={{
              ...styles.task,
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? 'gray' : 'black',
            }}
          >
            {task.text}
            <button onClick={(e) => { e.stopPropagation(); removeTask(index); }} style={styles.removeBtn}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    width: '300px',
    margin: '50px auto',
    padding: '20px',
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    background: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '15px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  task: {
    background: '#f1f1f1',
    padding: '10px',
    marginBottom: '5px',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: 'red',
    cursor: 'pointer',
    marginLeft: '10px',
  },
};
