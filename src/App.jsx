import React, { useState } from 'react';
import 'src/App.css';

function App() {

  const [todo, setTodo] = useState([]);
  const [idCounter, setIdCounter] = useState(0);
  const [nameData, setNameData] = useState('');
  const [descriptionData, setDescriptionData] = useState('');
  const [statusData, setStatusData] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editStatus, setEditStatus] = useState(''); // New state for edit status

  // card
  function Card({ id, name, description, status }) {
  
    const handleEdit = () => {
      setIsEditing(true);
      setEditId(id);
      editData(id);
    };
  
    const handleUpdate = () => {
      setIsEditing(false);
      updateData(id);
    };
  
    return (
      <div key={id} className='card'>
        <div>
          <label className='nameLabel'>
            Name: {isEditing && editId === id ? <input value={nameData} onChange={(e) => setNameData(e.target.value)} /> : name}
          </label>
          <label className='desLabel'>
            Description: {isEditing && editId === id ? <input value={descriptionData} onChange={(e) => setDescriptionData(e.target.value)} /> : description}
          </label>
  
          <div className='status'>
            <label className='statusLabel'>Status: </label>
            {isEditing && editId === id ? (
              <select name="status" value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                <option value="NotCompleted">Not Completed</option>
                <option value="Completed">Completed</option>
              </select>
            ) : (
              <span>{status}</span>
            )}
          </div>
  
          {isEditing && editId === id ? (
            <button className='updateButton' onClick={handleUpdate}>
              Update
            </button>
          ) : (
            <button className='editButton' onClick={handleEdit}>
              Edit
            </button>
          )}
          <button className='delbutton' onClick={() => deleteData(id)}>
            Delete
          </button>
        </div>
      </div>
    );
  }

  // add function
  function addTodo() {
    if (!nameData || !descriptionData) {
      alert('Name and Description are required!');
      return;
    }

    console.log('add todo');

    const data = {
      id: idCounter,
      name: nameData,
      description: descriptionData,
      status: 'NotCompleted',
    };

    setTodo((prevTodo) => [...prevTodo, data]);
    setIdCounter((prevIdCounter) => prevIdCounter + 1);

    setNameData('');
    setDescriptionData('');

    alert('todo added successfully');
  }

  // edit function
  function editData(id) {
    const selectedTodo = todo.find((item) => item.id === id);

    if (selectedTodo) {
      setNameData(selectedTodo.name);
      setDescriptionData(selectedTodo.description);
      setEditStatus(selectedTodo.status); // Initialize editStatus with the current status
    }
  }

  // update function
  function updateData(id) {
    setTodo((prevTodo) =>
      prevTodo.map((item) =>
        item.id === id ? { ...item, name: nameData, description: descriptionData, status: editStatus } : item
      )
    );

    setNameData('');
    setDescriptionData('');
    setEditStatus(''); // Reset editStatus
    setStatusData('');

    alert('data updated successfully');
  }

  // delete function
  function deleteData(id) {
    setTodo((prevTodo) => prevTodo.filter((item) => item.id !== id));
  }

  // dropdown function
  function setFilteredByStatus(data) {
    console.log(data); 
    setStatusData(data); // Set the filter status
  }

   // Filter the todos based on status directly inside setTodo
const filteredTodo = todo.filter((item) => {
  if (statusData === 'Completed' && item.status.toLowerCase() === 'completed') {
    return true;
  }else if (statusData === 'NotCompleted' && item.status.toLowerCase() === 'notcompleted') {
    return true;
  }else if (statusData === 'All') {
    return true;
  }
  return false;
});


  return (
    // whole screen part
    <div className='container'>
      <h1>My To-Do</h1>
      <input
        placeholder='todoName'
        id='todo-name'
        value={nameData}
        onChange={(e) => setNameData(e.target.value)}
      ></input>
      <input
        placeholder='todoDescription'
        id='todo-description'
        value={descriptionData}
        onChange={(e) => setDescriptionData(e.target.value)}
      ></input>
      <button className='addButton' onClick={addTodo}>Add Todo</button>

      <div className='list-container'>
        <h3>My todos</h3>
        <label className='statusfliter'>Status Filter:</label>
        <select name="status" value={statusData} onChange={(e) => setFilteredByStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="NotCompleted">Not Completed</option>
        </select>
      </div>

      <div className='card-container'>
        <div className='row row-cols-3'>
        {filteredTodo &&
  filteredTodo.map((item) => (
    <Card key={item.id} id={item.id} name={item.name} description={item.description} status={item.status} />
))}
        </div>
      </div>
    </div>
  );
}

export default App;
