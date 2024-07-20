/* eslint-disable react/prop-types */
import { useState } from "react";

const Todo = ({ tasks, setTasks }) => {
  const [newTask, setNewTask] = useState("");
  const addTask = () => {
    if (newTask.trim()) {
      const newTaskItem = { id: Date.now(), text: newTask, completed: false };

      // Update tasks state
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, newTaskItem];

        // Save updated tasks to localStorage
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        return updatedTasks;
      });

      // Clear the input field
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (taskId) => {
    // Update the task completion in the state
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );

      // Save the updated tasks list to localStorage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return updatedTasks;
    });
  };
  const removeTask = (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);

      // Save the updated tasks list to localStorage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return updatedTasks;
    });
  };

  return (
    <div className='m-5 p-5 bg-slate-600 rounded-lg shadow-md'>
      <h2 className='text-lg font-semibold mb-4 text-white'>Todo List</h2>
      <div className='mb-4'>
        <input
          type='text'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder='Add a new task...'
          className='p-2 border rounded-lg'
        />
        <button
          onClick={addTask}
          className='ml-2 bg-blue-500 text-white p-2 rounded-lg'>
          Add Task
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className='flex justify-between items-center bg-blue-900 p-3'>
            <div>
              <input
                type='checkbox'
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
                className='mr-2'
              />
              <span
                className={
                  task.completed
                    ? "line-through text-gray-400 font-semibold text-xl"
                    : "text-white font-semibold text-xl"
                }>
                {task.text}
              </span>
            </div>
            <button
              onClick={() => removeTask(task.id)}
              className='m-2 bg-red-500 text-white p-1.5 rounded-lg'>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
