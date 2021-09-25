import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/js/src/collapse.js'
import { readTask, createTask, deleteTask, updateTask } from './api/api.js'

function App() {

  const [list, setList] = useState([])
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');
  const [edit, setEdit] = useState(false);
  const task = { title, description };

  const getData = async () => {
    const { data } = await readTask();
    setList(data);
  }

  useEffect(() => {
    getData();
  }, [])

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await createTask(task);
    getData();
    setTitle('');
    setDescription('');
  }

  const onDeleteHandler = async () => {
    await deleteTask(id);
    getData();
    setId('');
  }

  const onUpdateHandler = async (e) => {
    e.preventDefault();
    await updateTask(id,task);
    getData();
    setEdit(false);
    setTitle('');
    setDescription('');
  }



  return (
    <div className="container">
      <form
        onSubmit={
          edit
          ? e => onUpdateHandler(e)
          : e => onSubmitHandler(e)
        }
        className='mt-5'>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="taskInput" className="form-label">Task</label>
              <input
                onChange={e => setTitle(e.target.value)}
                type="text" value={title} className="form-control" id="taskInput" aria-describedby="emailHelp" placeholder='Name of the task' />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="desInput" className="form-label">Description</label>
              <input
                onChange={e => setDescription(e.target.value)}
                type="text" value={description} className="form-control" id="desInput" aria-describedby="emailHelp" placeholder='Description of the task' />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          {
            edit
            ? 'Save'
            : 'Submit'
          }
        </button>
      </form>
      
      <div className='container mt-5 mb-5'>
        <div className="accordion" id="accordionExample">
          {
            list.map(item => {
              return <div className="accordion-item"  key={item._id}>
              <h2 className="accordion-header" id="headingOne">
                <button idv={item._id} 
                onClick={e => setId(e.target.getAttribute('idv'))}
                className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#cop${item._id}`} aria-expanded="true" aria-controls="collapseOne">
                 {item.title}
                </button>
              </h2>
              <div id={`cop${item._id}`} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  {item.description}
                  <div className='d-flex justify-content-end'>
                    <button title={item.title} description={item.description}
                    onClick={e => {
                      setEdit(true);
                      setTitle(e.target.getAttribute('title'));
                      setDescription(e.target.getAttribute('description'));
                    }}
                    type="button" className="btn btn-success">Update</button>

                    <button 
                    onClick={e => onDeleteHandler()}
                    type="button" className="btn btn-danger ms-3">Delete</button>
                  </div>
                </div>
              </div>
            </div>
            })
          }
        </div>
      </div>
    </div>
    
  );
}

export default App;
