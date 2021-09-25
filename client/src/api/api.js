import axios from 'axios';

const url = 'https://mern-js-01.herokuapp.com/todos'

const readTask = () => axios.get(url);
const createTask = (newTask) => axios.post(url, newTask);
const deleteTask = (id) => axios.delete(`${url}/${id}`);
const updateTask = (id, upTaks) => axios.patch(`${url}/${id}`, upTaks);

export {
    readTask,
    createTask,
    deleteTask,
    updateTask
}