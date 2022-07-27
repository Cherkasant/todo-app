//Variables
const inputToDoName = document.querySelector('#input_create_todo');
const addToDoButton = document.querySelector('#btn_add_todo');
const deleteAllToDoButton = document.querySelector('#btn_deleteall_todo');
const list = document.querySelector('.todo_list');

const toDoItem = document.getElementById('item');

const template = document.getElementById('todo_template');

export const domElements = {
  inputToDoName,
  addToDoButton,
  deleteAllToDoButton,
  list,
  toDoItem,
  template,
};
