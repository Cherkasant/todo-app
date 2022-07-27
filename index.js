//Variables
//import { saveLocalStorage, tasks } from './localStorage.js';
import { domElements } from './app/variables.js';
import { getDate } from './app/dateFunction.js';

const {
  inputToDoName,
  addToDoButton,
  deleteAllToDoButton,
  list,
  toDoItem,
  template,
} = domElements;

let todoElements;
let tasks;

!localStorage.task //проверяем есть ли объекты в локальном хранилище по ключу task
  ? (tasks = [])
  : (tasks = JSON.parse(localStorage.getItem('task')));
//Заполняем хранилище

function saveLocalStorage() {
  localStorage.setItem('task', JSON.stringify(tasks));
}

//функция коснтруктор для создания объекта таска
function TODO(text) {
  this.id = tasks.length + 1;
  this.text = text;
  this.isChecked = false;
  this.date = getDate();
}

//добавлние события на кнопку Add
addToDoButton.addEventListener('click', () => {
  if (inputToDoName.value.trim()) {
    tasks.push(new TODO(inputToDoName.value.trim()));
  }
  saveLocalStorage();
  fillList();
  inputToDoName.value = '';
});

//Наполнение шаблонами
function fillList() {
  list.innerHTML = '';
  if (tasks.length > 0) {
    filterTasks();
    tasks.forEach((element) => {
      const toDoElement = createTemplate(
        element.id,
        element.text,
        element.isChecked,
        element.date
      );
      list.appendChild(toDoElement);
    });
    todoElements = document.querySelectorAll('.todo-item');
  }
}
fillList();

//Создание шаблона HTMl
function createTemplate(id, text, isChecked, date) {
  const toDoElement = document.importNode(template.content, true);
  const checkbox = toDoElement.getElementById('todo_checkbox');

  checkbox.checked = isChecked;
  const toDoDescription = toDoElement.getElementById('todo_desc');
  toDoDescription.textContent = `Task: ${text}`;
  const toDoDate = toDoElement.getElementById('todo_date');
  toDoDate.textContent = `Date:${date}`;
  const resetBtn = toDoElement.getElementById('btn_reset_todo');

  checkbox.addEventListener('change', (event) => {
    tasks = tasks.map((item) => {
      if (item.id === id) {
        item.isChecked = event.target.checked;
      }
      return item;
    });
    saveLocalStorage();
    fillList();
  });

  resetBtn.addEventListener('click', () => {
    tasks = tasks.filter((el) => el.text != text);
    fillList();
    saveLocalStorage();
  });
  return toDoElement;
}

//Удаление всех тасков
deleteAllToDoButton.addEventListener('click', () => {
  tasks.splice(0, tasks.length);
  saveLocalStorage();
  fillList();
});

//сортировка массива для переноса выполненных тасков вниз
export function filterTasks() {
  const activeTasks =
    tasks.length && tasks.filter((el) => el.isChecked === false);
  const completedTasks =
    tasks.length && tasks.filter((el) => el.isChecked === true);
  tasks = [...activeTasks, ...completedTasks];
}

const search = document.querySelector('.search input');

function searchFunc() {
  const f1 = tasks.filter((el) => el.textContent.toLowerCase().includes(term));
  return (tasks = [...f1]);
}

search.querySelector('keyup', () => {
  const term = search.value.trim();
  searchFunc(term);
});
