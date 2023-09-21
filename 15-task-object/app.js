"use strick";

const toDoList = {
  tasks: [
    {
      id: 1,
      title: "Помыть посуду",
      priority: 1,
    },
  ],

  addTask: function (toDoObj) {
    const newToDo = {
      id: this.tasks.length + 1,
      ...toDoObj,
    };
    this.tasks.push(newToDo);
  },

  deleteTaskById: function (id) {
    if (id > this.tasks.length) return;

    this.tasks = this.tasks
      .filter((toDo) => toDo.id !== id)
      .map((toDo) => {
        if (toDo.id < id) return toDo;

        if (toDo.id > id) {
          const newObj = {
            ...toDo,
            id: toDo.id - 1,
          };
          return newObj;
        }
      });
  },

  modifyById: function (id, changeKey, newValue) {
    if (id > this.tasks.length) return;

    this.tasks = this.tasks
      .map((toDo) => {
        if (toDo.id !== id) return toDo;

        for (let key in toDo) {
          if (key === changeKey) {
            toDo[key] = newValue;
          }
        }

        return toDo;
      });
  },

  sortByPriority: function () {
    const copiedToDos = [...this.tasks];
    return copiedToDos.sort((a, b) => a.priority - b.priority);
  },
};

toDoList.addTask({ title: "Постирать белье", priority: 3 });
toDoList.addTask({ title: "Убрать комнату", priority: 5 });
toDoList.addTask({ title: "Выкинуть мусор", priority: 1 });

toDoList.deleteTaskById(3);
toDoList.deleteTaskById(1);
toDoList.deleteTaskById(7);

toDoList.addTask({ title: "Почистить ковер", priority: 4 });
toDoList.addTask({ title: "Сходить в магазин", priority: 2 });

toDoList.modifyById(1, "title", "Вкусно покушать");
toDoList.modifyById(4, "priority", 3);
toDoList.modifyById(8, "title", 1);
toDoList.modifyById(1, "AAAAAAAAAAAAAAAAAA", 654767234);

console.log(toDoList.tasks);
console.log(toDoList.sortByPriority());
