"use strick";

const toDoList = {
  tasks: [
    {
      id: 1,
      title: "Задача №1",
      priority: 1
    },
    {
      id: 2,
      title: "Задача №2",
      priority: 5
    },
    {
      id: 3,
      title: "Задача №3",
      priority: 3
    },
  ],

  getTaskById(id) {
    return this.tasks.filter((task) => task.id === id)[0];
  },

  getTaskIndexById(id) {
    return this.tasks.indexOf(this.getTaskById(id));
  },

  generateId() {
    const newId = Math.floor(Math.random() * (999 - 0 + 1)) + 1;
    if (this.getTaskById(newId)) return this.generateId();
    return newId;
  },

  addTask(toDoObj) {
    const newToDo = {
      id: this.generateId(),
      ...toDoObj,
    };
    this.tasks.push(newToDo);
  },

  checkTaskExistenceById(id) {
    const taskIndex = this.getTaskIndexById(id);
    if (taskIndex === -1) return console.log(`Нет задачи с id ${id}`);
    return true;
  },

  deleteTaskById(id) {
    if (!this.checkTaskExistenceById(id)) return;
    this.tasks = this.tasks.filter((toDo) => toDo.id !== id);
  },

  updateTaskById(id, updatedTask) {
    if (!this.checkTaskExistenceById(id)) return;
    const taskIndex = this.getTaskIndexById(id);
    this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedTask };
  },

  sortByPriority() {
    const copiedToDos = [...this.tasks];
    return copiedToDos.sort((a, b) => a.priority - b.priority);
  }
};

// console.log(toDoList.getTaskById(1));

// toDoList.addTask({ title: "Постирать белье", priority: 3 });
// toDoList.addTask({ title: "Убрать комнату", priority: 5 });
// toDoList.addTask({ title: "Выкинуть мусор", priority: 1 });

// toDoList.deleteTaskById(3);
// toDoList.deleteTaskById(1);
// toDoList.deleteTaskById(7);

// toDoList.updateTaskById(2, { title: "Смотреть в стену", priority: 2 });
// toDoList.updateTaskById(4, { title: "Задача №4", priority: 5 });

// console.log(toDoList.tasks);
// console.log(toDoList.sortByPriority());


const newTask = {
  tasks: [
    {
      id: 100,
      title: "Задача №100",
      priority: 5,
      description: "Описание Задачи №100 из нового списка",
    },
    {
      id: 200,
      title: "Задача №200",
      priority: 1,
      description: "Описание Задачи №200 из нового списка",
    },
    {
      id: 300,
      title: "Задача №300",
      priority: 4,
      description: "Описание Задачи №300 из нового списка",
    },
  ],
};

newTask.getTaskById = toDoList.getTaskById;
newTask.getTaskIndexById = toDoList.getTaskIndexById;
newTask.generateId = toDoList.generateId;
newTask.checkTaskExistenceById = toDoList.checkTaskExistenceById;

const getTaskByIdFunc = toDoList.getTaskById.bind(newTask);
console.log(getTaskByIdFunc(100));

const addTaskFunc = toDoList.addTask.bind(newTask);
addTaskFunc({
  title: "Постирать белье",
  priority: 3,
  description: "Свежее белье прикольно хрустит",
});
addTaskFunc({
  title: "Убрать комнату",
  priority: 5,
  description: "Будет легче идти на кухню за едой",
});
addTaskFunc({
  title: "Выкинуть мусор",
  priority: 1,
  description: "Нельзя прикреплять банановую кожуру к ведру степлером!!!",
});

const deleteTaskByIdFunc = toDoList.deleteTaskById.bind(newTask);
deleteTaskByIdFunc(300);
deleteTaskByIdFunc(100);
deleteTaskByIdFunc(7000);

const updateTaskByIdFunc = toDoList.updateTaskById.bind(newTask);
updateTaskByIdFunc(200, {
  title: "Смотреть в стену",
  priority: 2,
  description: "Помогает решить сложные задачи",
});
updateTaskByIdFunc(4000, {
  title: "Задача №400",
  priority: 5,
  description: "Описание Задачи №400 из нового списка",
});

console.log(newTask.tasks);

const sortByPriorityFunc = toDoList.sortByPriority.bind(newTask);
console.log(sortByPriorityFunc());
