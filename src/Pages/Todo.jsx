import React, { useContext, useEffect, useState } from 'react';
import { FaCheck, FaTrash, FaEdit, FaPlus, FaTasks } from 'react-icons/fa';
import { MdRadioButtonUnchecked, MdCheckCircle } from 'react-icons/md';
import Navbar from '../Components/Navbar';
import { UserContext } from '../context/userContext';


const Todo = () => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTask, setEditTask] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const { Theme } = useContext(UserContext);

  useEffect(() => {
    document.title = 'Todo-App';
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    setTasks([...tasks, { task, description, completed: false }]);
    setTask("");
    setDescription("");
  };

  const handleDelete = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditTask(tasks[index].task);
    setEditDescription(tasks[index].description);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedTasks = [...tasks];
    updatedTasks[editingIndex] = {
      ...updatedTasks[editingIndex],
      task: editTask,
      description: editDescription,
    };
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditTask("");
    setEditDescription("");
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const renderTasks = tasks.length ? (
    tasks.map((item, index) =>
      editingIndex === index ? (
        <li key={index} className={`p-4 rounded-lg shadow-md mb-4 ${Theme ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}>
          <form onSubmit={handleUpdate} className='space-y-3'>
            <input
              type='text'
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
              className={`w-full p-3 border rounded-lg ${Theme ? 'bg-gray-800 text-white border-gray-600' : 'bg-white border-gray-300'}`}
              placeholder='Edit Task...'
              required
            />
            <input
              type='text'
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className={`w-full p-3 border rounded-lg ${Theme ? 'bg-gray-800 text-white border-gray-600' : 'bg-white border-gray-300'}`}
              placeholder='Edit Description...'
            />
            <div className='flex gap-3'>
              <button type='submit' className='bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2'>
                <FaCheck /> Save
              </button>
              <button type='button' onClick={() => setEditingIndex(null)} className='bg-gray-600 text-white px-4 py-2 rounded-lg'>
                Cancel
              </button>
            </div>
          </form>
        </li>
      ) : (
        <li
          key={index}
          className={`p-4 rounded-lg shadow-md mb-4 flex flex-col md:flex-row justify-between items-start md:items-center ${
            Theme ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
          } ${item.completed ? 'opacity-70' : ''}`}
        >
          <div className='flex items-start gap-4 w-full md:w-2/3'>
            <button onClick={() => toggleComplete(index)} className='text-2xl'>
              {item.completed ? <MdCheckCircle className='text-green-500' /> : <MdRadioButtonUnchecked className='text-gray-400' />}
            </button>
            <div className={`${item.completed ? 'line-through text-gray-400' : ''}`}>
              <h3 className='text-xl font-bold'>{item.task}</h3>
              {item.description && (
                <p className={`${Theme ? 'text-gray-300' : 'text-gray-600'}`}>Description: {item.description}</p>
              )}
            </div>
          </div>
          <div className='flex gap-3 mt-4 md:mt-0'>
            <button onClick={() => handleEdit(index)} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2'>
              <FaEdit /> Edit
            </button>
            <button onClick={() => handleDelete(index)} className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2'>
              <FaTrash /> Delete
            </button>
          </div>
        </li>
      )
    )
  ) : (
    <div className='text-center py-8 text-gray-400'>
      <FaTasks className='mx-auto text-5xl mb-4' />
      <h2 className='text-xl font-bold'>No Tasks Available</h2>
      <p className='text-sm'>Add your first task above</p>
    </div>
  );

  return (
    <div className={`min-h-screen ${Theme ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <Navbar title="My Todo App" showLogo />
      <main className='container mx-auto px-4 py-8 max-w-4xl'>
        <form onSubmit={handleSubmit} className={`p-6 rounded-lg shadow-md mb-8 space-y-4 ${Theme ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
          <div>
            <label htmlFor="task" className={`block font-medium mb-1 ${Theme ? 'text-gray-200' : 'text-gray-700'}`}>Task</label>
            <input
              type='text'
              id="task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className={`w-full p-3 border-2 rounded-lg ${Theme ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'}`}
              placeholder='Enter your task...'
              required
            />
          </div>
          <div>
            <label htmlFor="description" className={`block font-medium mb-1 ${Theme ? 'text-gray-200' : 'text-gray-700'}`}>Description (optional)</label>
            <input
              type='text'
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full p-3 border-2 rounded-lg ${Theme ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'}`}
              placeholder='Task description...'
            />
          </div>
          <button type='submit' className='bg-gray-700 hover:bg-gray-700 text-white w-full sm:w-auto px-6 py-3 rounded-lg flex items-center justify-center gap-2'>
            <FaPlus /> Add Task
          </button>
        </form>

        <section className={`p-6 rounded-lg shadow-md ${Theme ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
          <h2 className='text-2xl font-bold mb-6 flex items-center gap-2'>
            <FaTasks /> Your Tasks
          </h2>
          <ul>{renderTasks}</ul>
        </section>
      </main>
    </div>
  );
};

export default Todo;
