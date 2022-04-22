import React, { useState } from 'react';
import { Task } from './Task';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../api/TasksCollection';
import { TaskForm } from './TaskForm';

const togleChecked = ({ _id, isChecked }) => {
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked
    }
  })
}

const deleteTask = ({ _id }) => {
  TasksCollection.remove(_id);
}


export const App = () => {
  
  const [hideCompleted, setHideCompleted] = useState(false);

  const hideCompletedFilter = { isChecked: { $ne: true} };

  const tasks = useTracker(() => TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {sort: {createdAt: -1 } }).fetch());

  const pendingTasksCount = useTracker(() => 
    TasksCollection.find(hideCompletedFilter).count()
  );

  const pendingTaskTitle = `${pendingTasksCount}` ? `(${pendingTasksCount})` : '()'

  return (
    <div className='app'>
      <header>
        <div className='app-bar'>
          <div className="app-header">
            <h1>📝️ To Do List</h1>
            {pendingTaskTitle}
          </div>
        </div>
      </header>

      <div className="main">
        
        <TaskForm />
        
        <div className='filter'>
          <button onClick={() => setHideCompleted(!hideCompleted)}>
            {hideCompleted ? 'Show all' : 'Hide Completed'}
          </button>
        </div>

        <ul className='tasks'>
          {tasks.map(task => <Task key={ task._id } task={ task } onCheckboxClick={togleChecked} onDeleteClick={deleteTask}/>)}
        </ul>

      </div>
    </div>
  )
};